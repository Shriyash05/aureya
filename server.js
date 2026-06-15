import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import pg from 'pg';
import { put } from '@vercel/blob';

dotenv.config({ quiet: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production' || isVercel;
const JWT_SECRET = process.env.JWT_SECRET || (isProduction ? '' : 'aureyasecretkey2026');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (isProduction ? '' : 'aureya2026');
const DB_PATH = path.join(__dirname, 'database.json');
const LOCAL_UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const { Pool } = pg;
const pgPool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: /localhost|127\.0\.0\.1/.test(DATABASE_URL) || process.env.POSTGRES_SSL === 'false'
        ? false
        : { rejectUnauthorized: false },
    })
  : null;
let postgresReady = false;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

function normalizeDB(data) {
  return {
    products: Array.isArray(data?.products) ? data.products : [],
    inquiries: Array.isArray(data?.inquiries) ? data.inquiries : [],
  };
}

function getLocalDB() {
  try {
    if (!fs.existsSync(DB_PATH)) return { products: [], inquiries: [] };
    return normalizeDB(JSON.parse(fs.readFileSync(DB_PATH, 'utf8')));
  } catch (error) {
    console.error('Error reading local database file:', error);
    return { products: [], inquiries: [] };
  }
}

function saveLocalDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(normalizeDB(data), null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing local database file:', error);
    return false;
  }
}

async function getDB() {
  if (!pgPool) return getLocalDB();

  try {
    await ensurePostgres();

    const [productsResult, inquiriesResult] = await Promise.all([
      pgPool.query('select data from products order by sort_order asc, updated_at desc'),
      pgPool.query('select data from inquiries order by sort_order asc, created_at desc'),
    ]);

    const db = normalizeDB({
      products: productsResult.rows.map((row) => row.data),
      inquiries: inquiriesResult.rows.map((row) => row.data),
    });

    if (db.products.length || db.inquiries.length) return db;

    const seed = getLocalDB();
    await savePostgresDB(seed);
    return seed;
  } catch (error) {
    console.error('Error reading Postgres database:', error);
    return getLocalDB();
  }
}

async function saveDB(data) {
  const normalized = normalizeDB(data);
  if (!pgPool) return saveLocalDB(normalized);

  try {
    await savePostgresDB(normalized);
    return true;
  } catch (error) {
    console.error('Error writing Postgres database:', error);
    return false;
  }
}

async function ensurePostgres() {
  if (postgresReady || !pgPool) return;

  await pgPool.query(`
    create table if not exists products (
      id text primary key,
      data jsonb not null,
      sort_order integer not null default 0,
      updated_at timestamptz not null default now()
    )
  `);

  await pgPool.query(`
    create table if not exists inquiries (
      id text primary key,
      data jsonb not null,
      sort_order integer not null default 0,
      created_at timestamptz not null default now()
    )
  `);

  postgresReady = true;
}

async function savePostgresDB(data) {
  await ensurePostgres();

  const client = await pgPool.connect();
  try {
    await client.query('begin');
    await client.query('delete from products');
    await client.query('delete from inquiries');

    for (const [index, product] of data.products.entries()) {
      await client.query(
        `insert into products (id, data, sort_order, updated_at)
         values ($1, $2::jsonb, $3, now())`,
        [product.id, JSON.stringify(product), index],
      );
    }

    for (const [index, inquiry] of data.inquiries.entries()) {
      await client.query(
        `insert into inquiries (id, data, sort_order, created_at)
         values ($1, $2::jsonb, $3, coalesce(($2::jsonb ->> 'timestamp')::timestamptz, now()))`,
        [inquiry.id, JSON.stringify(inquiry), index],
      );
    }

    await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.release();
  }
}

function requireServerSecret(res) {
  if (JWT_SECRET) return true;
  res.status(500).json({ error: 'JWT_SECRET must be configured before using admin features.' });
  return false;
}

function authenticateToken(req, res, next) {
  if (!requireServerSecret(res)) return;

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

function parseImagePayload({ dataUrl, fileName, contentType }) {
  const match = /^data:(image\/(?:png|jpe?g|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || '');
  if (!match) return null;

  const safeBase = path.basename(fileName || `product-${Date.now()}`).replace(/[^a-z0-9._-]/gi, '-');
  const extFromType = match[1].split('/')[1].replace('jpeg', 'jpg');
  const hasExt = /\.[a-z0-9]+$/i.test(safeBase);
  const safeName = hasExt ? safeBase : `${safeBase}.${extFromType}`;

  return {
    buffer: Buffer.from(match[2], 'base64'),
    contentType: contentType || match[1],
    safeName,
  };
}

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    database: pgPool ? 'postgres' : 'local-json',
    uploads: process.env.BLOB_READ_WRITE_TOKEN ? 'vercel-blob' : 'local-files',
  });
});

app.post('/api/admin/login', (req, res) => {
  if (!requireServerSecret(res)) return;
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD must be configured before using admin login.' });
  }

  const { username, password } = req.body;

  if (username === 'admin' && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ success: true, token });
  }

  return res.status(400).json({ error: 'Invalid credentials' });
});

app.get('/api/products', async (req, res) => {
  const db = await getDB();
  res.json(db.products);
});

app.post('/api/admin/products', authenticateToken, async (req, res) => {
  const db = await getDB();
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Product name and price are required' });
  }

  newProduct.id = newProduct.id || Date.now().toString();
  db.products.unshift(newProduct);

  if (!(await saveDB(db))) {
    return res.status(500).json({ error: 'Unable to save product' });
  }

  res.status(201).json({ success: true, product: newProduct });
});

app.put('/api/admin/products/:id', authenticateToken, async (req, res) => {
  const db = await getDB();
  const { id } = req.params;
  const updatedData = req.body;

  const idx = db.products.findIndex((product) => product.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  db.products[idx] = { ...db.products[idx], ...updatedData, id };

  if (!(await saveDB(db))) {
    return res.status(500).json({ error: 'Unable to save product' });
  }

  res.json({ success: true, product: db.products[idx] });
});

app.delete('/api/admin/products/:id', authenticateToken, async (req, res) => {
  const db = await getDB();
  const { id } = req.params;
  const initialLen = db.products.length;

  db.products = db.products.filter((product) => product.id !== id);

  if (db.products.length === initialLen) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!(await saveDB(db))) {
    return res.status(500).json({ error: 'Unable to delete product' });
  }

  res.json({ success: true, message: 'Product deleted' });
});

app.post('/api/admin/uploads', authenticateToken, async (req, res) => {
  const parsed = parseImagePayload(req.body);
  if (!parsed) {
    return res.status(400).json({ error: 'Upload must be a PNG, JPEG, or WEBP data URL.' });
  }

  const objectName = `products/${Date.now()}-${parsed.safeName}`;

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(objectName, parsed.buffer, {
        access: 'public',
        contentType: parsed.contentType,
      });
      return res.status(201).json({ success: true, url: blob.url });
    }

    fs.mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
    const localName = `${Date.now()}-${parsed.safeName}`;
    fs.writeFileSync(path.join(LOCAL_UPLOAD_DIR, localName), parsed.buffer);
    return res.status(201).json({ success: true, url: `/uploads/${localName}` });
  } catch (error) {
    console.error('Error uploading product image:', error);
    return res.status(500).json({ error: 'Unable to upload image' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  const db = await getDB();
  const inquiry = req.body;

  if (!inquiry.email) {
    return res.status(400).json({ error: 'Email or phone coordinate required' });
  }

  inquiry.id = Date.now().toString();
  inquiry.timestamp = new Date().toISOString();

  db.inquiries.unshift(inquiry);

  if (!(await saveDB(db))) {
    return res.status(500).json({ error: 'Unable to save inquiry' });
  }

  res.status(201).json({ success: true, inquiry });
});

app.get('/api/admin/inquiries', authenticateToken, async (req, res) => {
  const db = await getDB();
  res.json(db.inquiries);
});

app.delete('/api/admin/inquiries', authenticateToken, async (req, res) => {
  const db = await getDB();
  db.inquiries = [];

  if (!(await saveDB(db))) {
    return res.status(500).json({ error: 'Unable to clear inquiries' });
  }

  res.json({ success: true, message: 'All inquiries cleared' });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
