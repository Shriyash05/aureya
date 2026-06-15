# Aureya

React + Vite storefront with an Express API for products, inquiries, admin login, and product image uploads.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`.

3. Start the API:

```bash
npm start
```

4. In another terminal, start Vite:

```bash
npm run dev
```

Without Postgres/Blob env vars, local development uses `database.json` and stores uploaded images in `public/uploads`.

## Production Build

```bash
npm run lint
npm run build
```

## Vercel Deployment

Set these environment variables in Vercel before deploying:

- `JWT_SECRET`: long random secret used to sign admin sessions.
- `ADMIN_PASSWORD`: password for username `admin`.
- `DATABASE_URL`: Postgres connection string from Vercel Postgres, Neon, Supabase, or another hosted Postgres provider.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob token for product image uploads.

The deployed app uses:

- Postgres for products and inquiries.
- Vercel Blob for admin-uploaded product images.
- `api/[...path].js` for serverless API routes.
- `vercel.json` to serve the Vite app for all non-API routes.
