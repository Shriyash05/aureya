import { useCallback, useEffect, useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import ScentQuiz from './components/ScentQuiz';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { MessageSquare, Check } from 'lucide-react';

/* ─── Marquee Band ────────────────────────────────────── */
function MarqueeBand() {
  const items = [
    'Extrait de Parfum', 'Solid Perfumes', 'Crafted in Mumbai',
    'Skin-Loving Oils', 'No Spills · No Waste', 'Long-Lasting Fragrance',
    'Wear Your Essence', 'Subtle Luxury', 'Pure · Powerful',
  ];
  return (
    <div className="marquee-band">
      <div className="marquee-band__inner">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-band__item">
            {item}
            <span className="marquee-band__dot"> ✦ </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature Split Section ───────────────────────────── */
function FeatureSection({ onNavigate }) {
  return (
    <section className="feature-section" style={featureStyles.section}>
      {/* Left: image */}
      <div style={featureStyles.imagePanel}>
        <img src="https://4yky8m622npc1u4j.public.blob.vercel-storage.com/solid.png" alt="Aureya Solid Perfumes" style={featureStyles.image} />
        <div style={featureStyles.imageCaption}>
          <span>Solid Perfume Collection</span>
        </div>
      </div>
      {/* Right: text */}
      <div style={featureStyles.textPanel}>
        <p style={featureStyles.eyebrow}>Concept & Innovation</p>
        <h2 style={featureStyles.heading}>What is<br />Solid Perfume?</h2>
        <div style={featureStyles.divider} />
        <p style={featureStyles.body}>
          A fragrance that delivers all the luxury of traditional perfume — without the liquid. 
          Blended with natural butters and oils, our solid perfumes are gentle on the skin, 
          long-lasting, and incredibly travel-friendly.
        </p>
        <p style={{ ...featureStyles.body, marginTop: '1.6rem' }}>
          They activate with your body's warmth, releasing a subtle, personal aroma throughout 
          the day. Dab it on your wrists, neck, or behind your ears — a sensory experience 
          that's both timeless and mess-free.
        </p>
        <div style={featureStyles.highlights}>
          {[['No Spills', 'Completely spill-proof, perfect for travel'], ['Long Lasting', 'Stays with you throughout the day'], ['Skin-Loving', 'Infused with nourishing natural oils']].map(([title, desc]) => (
            <div key={title} style={featureStyles.highlight}>
              <span style={featureStyles.highlightTitle}>{title}</span>
              <span style={featureStyles.highlightDesc}>{desc}</span>
            </div>
          ))}
        </div>
        <button className="btn-outline" style={{ marginTop: '3.6rem' }} onClick={() => onNavigate('shop')}>
          Shop Solid Perfumes
        </button>
      </div>
    </section>
  );
}

const featureStyles = {
  section: {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
minHeight: '85vh',
  backgroundColor: '#080808',
},
  imagePanel: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0e0e0e',
  },
  image: {
    width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '4rem',
    objectPosition: 'center',
    display: 'block',
  },
  imageCaption: {
    position: 'absolute',
    bottom: '2.4rem',
    left: '2.4rem',
    backgroundColor: 'rgba(5,5,5,0.75)',
    border: '1px solid var(--border)',
    padding: '1rem 2rem',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
  },
  textPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '7rem 6rem',
    backgroundColor: '#0a0a0a',
  },
  eyebrow: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.05rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '1.8rem',
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(3.5rem, 5vw, 5.5rem)',
    fontWeight: '300',
    color: 'var(--white)',
    letterSpacing: '0.03em',
    lineHeight: 1.1,
    marginBottom: '2.8rem',
  },
  divider: {
    width: '5rem',
    height: '1px',
    backgroundColor: 'var(--gold)',
    marginBottom: '2.8rem',
  },
  body: {
    fontSize: '1.35rem',
    color: 'var(--muted)',
    lineHeight: '1.85',
    maxWidth: '50rem',
    margin: 0,
  },
  highlights: {
    marginTop: '3.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.6rem',
  },
  highlight: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.8rem',
    paddingBottom: '1.6rem',
    borderBottom: '1px solid rgba(197,168,124,0.1)',
  },
  highlightTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.6rem',
    fontWeight: '600',
    color: 'var(--white)',
    minWidth: '11rem',
    letterSpacing: '0.04em',
  },
  highlightDesc: {
    fontSize: '1.25rem',
    color: 'var(--muted)',
    lineHeight: '1.6',
  },
};

/* ─── About / Story section ───────────────────────────── */
function AboutSection() {
  return (
    <section style={aboutStyles.section}>
      <div style={aboutStyles.bgText}>AUREYA</div>
      <div className="container" style={aboutStyles.inner}>
        <p style={aboutStyles.eyebrow}>AK Aureya · Mumbai</p>
        <h2 style={aboutStyles.heading}>
          A Celebration of<br />
          <em>Scent & Sophistication</em>
        </h2>
        <div style={aboutStyles.divider} />
        <p style={aboutStyles.para}>
          AUREYA IS A CELEBRATION OF SCENT AND SOPHISTICATION. OUR SOLID PERFUMES ARE CRAFTED FOR THOSE WHO SEEK SUBTLE LUXURY IN A MODERN EXOTIC FORM. INFUSED WITH SKIN-LOVING OILS AND RICH AROMATIC BLENDS.
        </p>
        <p style={{ ...aboutStyles.para, marginTop: '2rem' }}>
          Each perfume is a compact, long-lasting experience you can carry with you anywhere. No spills, no waste — just pure, powerful fragrance.
        </p>
        <p style={aboutStyles.signature}>Let your scent be your signature.</p>
      </div>
    </section>
  );
}

const aboutStyles = {
  section: {
    position: 'relative',
    backgroundColor: '#050505',
    padding: '10rem 0',
    textAlign: 'center',
    overflow: 'hidden',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
  },
  bgText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(10rem, 22vw, 26rem)',
    fontWeight: '700',
    letterSpacing: '0.2em',
    color: 'rgba(197,168,124,0.03)',
    userSelect: 'none',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
  inner: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '80rem',
    margin: '0 auto',
  },
  eyebrow: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.05rem',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '2.4rem',
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(3.5rem, 6vw, 6rem)',
    fontWeight: '300',
    color: 'var(--white)',
    lineHeight: 1.2,
    marginBottom: '3rem',
  },
  divider: {
    width: '4rem',
    height: '1px',
    backgroundColor: 'var(--gold)',
    margin: '0 auto 3.6rem',
  },
  para: {
    fontSize: '1.45rem',
    color: 'var(--muted)',
    lineHeight: '2',
    maxWidth: '65rem',
    margin: '0 auto',
    letterSpacing: '0.03em',
  },
  signature: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2.4rem',
    fontStyle: 'italic',
    color: 'var(--gold)',
    marginTop: '4rem',
    letterSpacing: '0.08em',
  },
};

/* ─── Testimonials ────────────────────────────────────── */
function TestimonialsSection() {
  const reviews = [
    { quote: 'The Forbidden Orchid stays with me all day. I get compliments everywhere I go. Aureya has truly redefined what a solid perfume can be.', name: 'Priya S.', city: 'Mumbai' },
    { quote: 'Finally a perfume I can carry in my pocket! Heaven Garden is my everyday scent — floral, fresh, and incredibly long-lasting.', name: 'Rahul M.', city: 'Pune' },
    { quote: "Mi Amor is pure magic. I was skeptical about solid perfumes but Aureya completely changed my mind. It's warm, sensual, and unique.", name: 'Sneha K.', city: 'Delhi' },
  ];
  return (
    <section style={testStyles.section}>
      <div className="container">
        <p style={testStyles.eyebrow}>What Our Customers Say</p>
        <h2 style={testStyles.heading}>Loved by Fragrance Enthusiasts</h2>
        <div className="testimonial-grid" style={testStyles.grid}>
          {reviews.map((r, i) => (
            <div key={i} style={testStyles.card}>
              <div style={testStyles.stars}>{'★★★★★'}</div>
              <p style={testStyles.quote}>"{r.quote}"</p>
              <div style={testStyles.author}>
                <span style={testStyles.authorName}>{r.name}</span>
                <span style={testStyles.authorCity}>{r.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testStyles = {
  section: {
    backgroundColor: '#0a0a0a',
    padding: '9rem 0',
    borderTop: '1px solid var(--border)',
  },
  eyebrow: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.05rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    textAlign: 'center',
    marginBottom: '1.6rem',
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2.8rem, 4vw, 4.5rem)',
    fontWeight: '300',
    color: 'var(--white)',
    textAlign: 'center',
    marginBottom: '6rem',
    letterSpacing: '0.03em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: '3rem',
  },
  card: {
    backgroundColor: '#0e0e0e',
    border: '1px solid var(--border)',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    transition: 'border-color 0.3s ease',
  },
  stars: {
    color: 'var(--gold)',
    fontSize: '1.4rem',
    letterSpacing: '0.2em',
  },
  quote: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem',
    fontStyle: 'italic',
    color: 'var(--white)',
    lineHeight: '1.6',
    flex: 1,
    margin: 0,
  },
  author: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border)',
  },
  authorName: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.1rem',
    fontWeight: '600',
    letterSpacing: '0.12em',
    color: 'var(--white)',
    textTransform: 'uppercase',
  },
  authorCity: {
    fontSize: '1.1rem',
    color: 'var(--muted)',
  },
};

/* ─── WhatsApp CTA Band ───────────────────────────────── */
function WhatsAppBand() {
  return (
    <div style={waBandStyles.band}>
      <div className="container" style={waBandStyles.inner}>
        <div style={waBandStyles.text}>
          <h3 style={waBandStyles.heading}>Order Directly via WhatsApp</h3>
          <p style={waBandStyles.sub}>Mumbai concierge available for custom orders, pricing & local delivery</p>
        </div>
        <a
          href="https://wa.me/919619203048?text=Hi%20AUREYA,%20I'd%20like%20to%20enquire%20about%20pricing%20and%20orders."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <MessageSquare size={15} style={{ marginRight: '0.8rem', verticalAlign: 'middle' }} />
          Let's Have a Chat
        </a>
      </div>
    </div>
  );
}

const waBandStyles = {
  band: {
    backgroundColor: 'var(--off-black)',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
    padding: '5rem 0',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4rem',
    flexWrap: 'wrap',
  },
  text: { flex: 1 },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2.2rem, 3.5vw, 3.4rem)',
    fontWeight: '400',
    color: 'var(--white)',
    letterSpacing: '0.02em',
    marginBottom: '0.8rem',
  },
  sub: {
    fontSize: '1.3rem',
    color: 'var(--muted)',
    margin: 0,
    letterSpacing: '0.03em',
  },
};

/* ─── Collection Section (preserved) ─────────────────── */
function CollectionSection({ products, onSelect, onNavigate }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? products : products.filter(p => p.type === filter);

  return (
    <section style={collStyles.section}>
      <div className="container">
        {/* Header */}
        <div style={collStyles.header}>
          <p style={collStyles.eyebrow}>Handcrafted Fragrances</p>
          <h2 style={collStyles.heading}>Our Collection</h2>
          <div style={collStyles.divider} />
          <p style={collStyles.sub}>
            Each fragrance tells a story — from bold sprays to compact solid balms, every scent is designed to become your signature.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={collStyles.filterRow}>
          {[['all', 'All'], ['spray', 'Extrait de Parfum'], ['solid', 'Solid Perfumes']].map(([val, label]) => (
            <button
              key={val}
              style={{
                ...collStyles.filterBtn,
                color: filter === val ? 'var(--white)' : 'var(--muted)',
                borderBottom: filter === val ? '1px solid var(--gold)' : '1px solid transparent',
              }}
              onClick={() => setFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={collStyles.empty}>
            <p>No products available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="collection-grid" style={collStyles.grid}>
            {filtered.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} onSelect={onSelect} />
            ))}
          </div>
        )}

        <div style={collStyles.cta}>
          <button className="btn-outline" onClick={() => onNavigate('shop')}>
            View All Fragrances
          </button>
        </div>
      </div>
    </section>
  );
}

const collStyles = {
  section: {
  backgroundColor: '#050505',
  padding: '10rem 0',
  borderTop: '1px solid var(--border)',
},
  header: { textAlign: 'center', marginBottom: '6rem' },
  eyebrow: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.05rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '1.6rem',
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(3.5rem, 6vw, 6rem)',
    fontWeight: '300',
    color: 'var(--white)',
    letterSpacing: '0.06em',
    marginBottom: '2.4rem',
  },
  divider: {
    width: '4rem',
    height: '1px',
    backgroundColor: 'var(--gold)',
    margin: '0 auto 2.8rem',
  },
  sub: {
    fontSize: '1.35rem',
    color: 'var(--muted)',
    maxWidth: '60rem',
    margin: '0 auto',
    lineHeight: '1.8',
  },
  filterRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4rem',
    marginBottom: '5rem',
  },
  filterBtn: {
    background: 'none',
    border: 'none',
    borderBottom: '1px solid transparent',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.1rem',
    fontWeight: '400',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    padding: '0.6rem 0',
    paddingBottom: '1rem',
    transition: 'all 0.25s ease',
  },
  grid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gap: '2.4rem',
},
  empty: {
    textAlign: 'center',
    padding: '8rem 0',
    color: 'var(--muted)',
    fontSize: '1.4rem',
  },
  cta: {
    textAlign: 'center',
    marginTop: '6rem',
  },
};

/* ─── Full Shop Page ──────────────────────────────────── */
function ShopPage({ products, onSelect }) {
  const [category, setCategory] = useState('all');
  const [tag, setTag] = useState('all');
  const filtered = products.filter(p => {
    const catOk = category === 'all' || p.type === category;
    const tagOk = tag === 'all' || p.tag === tag;
    return catOk && tagOk;
  });

  return (
    <section style={{ paddingTop: '14rem', paddingBottom: '8rem', backgroundColor: '#050505', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p style={collStyles.eyebrow}>Aureya Fragrances</p>
          <h2 style={collStyles.heading}>Fragrance Catalog</h2>
          <div style={collStyles.divider} />
          <p style={collStyles.sub}>Browse our full collection of premium sprays and spill-free travel balms.</p>
        </div>

        {/* Filters */}
        <div style={shopStyles.filterBar}>
          <div style={shopStyles.filterGroup}>
            <label>Format</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="all">All Formats</option>
              <option value="spray">Extrait de Parfum (Spray)</option>
              <option value="solid">Solid Perfume (Balm)</option>
            </select>
          </div>
          <div style={shopStyles.filterGroup}>
            <label>Scent Profile</label>
            <select value={tag} onChange={e => setTag(e.target.value)}>
              <option value="all">All Profiles</option>
              <option value="Fresh">Fresh</option>
              <option value="Floral">Floral</option>
              <option value="Woody">Woody</option>
              <option value="Sweet">Sweet</option>
            </select>
          </div>
          <button style={shopStyles.resetBtn} onClick={() => { setCategory('all'); setTag('all'); }}>
            Clear Filters
          </button>
        </div>

        {filtered.length === 0 ? (
          <div style={collStyles.empty}><p>No products match your filters.</p></div>
        ) : (
         <div
  className="shop-grid"
  style={{
    ...collStyles.grid,
    gridTemplateColumns: 'repeat(auto-fill,minmax(28rem,1fr))',
  }}
>
            {filtered.map(p => <ProductCard key={p.id} product={p} onSelect={onSelect} />)}
          </div>
        )}
      </div>
    </section>
  );
}

const shopStyles = {
  filterBar: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '3rem',
    marginBottom: '5rem',
    padding: '2.8rem 3.2rem',
    backgroundColor: '#0e0e0e',
    border: '1px solid var(--border)',
    flexWrap: 'wrap',
  },
  filterGroup: { display: 'flex', flexDirection: 'column', gap: '0.8rem', minWidth: '0'},
  resetBtn: {
    background: 'none',
    border: '1px solid var(--border)',
    color: 'var(--muted)',
    padding: '1.2rem 2.4rem',
    fontSize: '1.05rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
    transition: 'all 0.2s ease',
    alignSelf: 'flex-end',
    height: '5rem',
  },
};

/* ─── About Page ──────────────────────────────────────── */
function AboutPage() {
  return (
    <div style={{ paddingTop: '14rem', backgroundColor: '#050505', minHeight: '100vh' }}>
      {/* Big quote hero */}
      <div style={aboutPageStyles.quoteSection}>
        <div className="container" style={{ maxWidth: '90rem', margin: '0 auto' }}>
          <p style={aboutPageStyles.eyebrow}>Our Story</p>
          <blockquote style={aboutPageStyles.bigQuote}>
            "Aureya is a celebration of scent and sophistication."
          </blockquote>
        </div>
      </div>
      {/* Feature image + text */}
      <div className="about-split" style={aboutPageStyles.splitSection}>
        <div style={aboutPageStyles.imgCol}>
          <img src="/images/solid perfumes.png" alt="Aureya Products" style={aboutPageStyles.img} />
        </div>
        <div style={aboutPageStyles.textCol}>
          <h2 style={aboutPageStyles.heading}>Founded in Mumbai</h2>
          <div style={{ width: '4rem', height: '1px', backgroundColor: 'var(--gold)', marginBottom: '3rem' }} />
          <p style={aboutPageStyles.para}>
            AUREYA IS A CELEBRATION OF SCENT AND SOPHISTICATION. OUR SOLID PERFUMES ARE CRAFTED FOR THOSE WHO SEEK SUBTLE LUXURY IN A MODERN EXOTIC FORM. INFUSED WITH SKIN-LOVING OILS AND RICH AROMATIC BLENDS. EACH PERFUME IS A COMPACT, LONG-LASTING EXPERIENCE YOU CAN CARRY WITH YOU ANYWHERE. NO SPILLS, NO WASTE — JUST PURE, POWERFUL FRAGRANCE.
          </p>
          <p style={{ ...aboutPageStyles.para, marginTop: '2rem' }}>
            Founded in Mumbai, Aureya is dedicated to changing how people wear and experience scent. Traditional liquid fragrances can feel heavy, bulky, and prone to spilling. Our team sought a modern solution to classic luxury — creating compact solid fragrance balms alongside highly concentrated sprays.
          </p>
          <p style={aboutPageStyles.signature}>LET YOUR SCENT BE YOUR SIGNATURE.</p>
        </div>
      </div>
      {/* Guide image */}
      <div style={aboutPageStyles.guideSection}>
        <div className="container">
          <img src="/images/solid perfume guide.png" alt="Aureya Application Guide" style={aboutPageStyles.guideImg} />
        </div>
      </div>
    </div>
  );
}

const aboutPageStyles = {
  quoteSection: {
    padding: '8rem 0',
    textAlign: 'center',
    borderBottom: '1px solid var(--border)',
  },
  eyebrow: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.05rem',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '2.4rem',
  },
  bigQuote: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(3rem, 5.5vw, 6rem)',
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'var(--white)',
    lineHeight: 1.2,
    letterSpacing: '0.02em',
    margin: 0,
  },
  splitSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '70vh',
  },
  imgCol: {
    backgroundColor: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5rem',
    borderRight: '1px solid var(--border)',
  },
  img: { width: '100%', maxHeight: '55rem', objectFit: 'contain' },
  textCol: {
    padding: '7rem 6rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(3rem, 4.5vw, 5rem)',
    fontWeight: '300',
    color: 'var(--white)',
    marginBottom: '2rem',
    letterSpacing: '0.03em',
  },
  para: {
    fontSize: '1.35rem',
    color: 'var(--muted)',
    lineHeight: '1.95',
    maxWidth: '55rem',
    margin: 0,
    letterSpacing: '0.02em',
  },
  signature: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem',
    fontStyle: 'italic',
    color: 'var(--gold)',
    marginTop: '3.5rem',
    letterSpacing: '0.1em',
  },
  guideSection: {
    padding: '6rem 0',
    backgroundColor: '#0a0a0a',
    borderTop: '1px solid var(--border)',
    textAlign: 'center',
  },
  guideImg: {
    maxWidth: '80rem',
    width: '100%',
    objectFit: 'contain',
    margin: '0 auto',
    display: 'block',
  },
};

/* ─── Contact Page ────────────────────────────────────── */
function ContactPage({ onSubmit, submitted, name, setName, email, setEmail, message, setMessage }) {
  return (
    <section style={{ paddingTop: '14rem', paddingBottom: '8rem', backgroundColor: '#050505', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '110rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '7rem' }}>
          <p style={collStyles.eyebrow}>Get in Touch</p>
          <h2 style={collStyles.heading}>Contact & Orders</h2>
          <div style={collStyles.divider} />
          <p style={collStyles.sub}>Have a question or want to place an order? Reach out directly — we're always happy to help.</p>
        </div>

        <div className="contact-grid" style={contactPageStyles.grid}>
          {/* Info */}
          <div style={contactPageStyles.infoCol}>
            <h3 style={contactPageStyles.infoHeading}>Aureya Concierge</h3>
            <p style={contactPageStyles.infoDesc}>Based in Mumbai — available on call & WhatsApp for orders, custom sizes, and local delivery.</p>
            <div style={contactPageStyles.infoItems}>
              {[
                ['Phone & Orders', '+91 96192 03048', 'tel:+919619203048'],
                ['WhatsApp', 'Chat with us directly', 'https://wa.me/919619203048?text=Hi%20AUREYA'],
                ['Location', 'Mumbai, Maharashtra, India', null],
              ].map(([label, val, href]) => (
                <div key={label} style={contactPageStyles.infoItem}>
                  <span style={contactPageStyles.infoLabel}>{label}</span>
                  {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={contactPageStyles.infoVal}>{val}</a>
                        : <span style={contactPageStyles.infoVal}>{val}</span>}
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/919619203048?text=Hi%20AUREYA,%20I'd%20like%20to%20discuss%20pricing%20and%20orders."
              target="_blank" rel="noopener noreferrer"
              className="btn-gold"
              style={{ marginTop: '3.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}
            >
              <MessageSquare size={16} /> Order on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div style={contactPageStyles.formCol}>
            {submitted ? (
              <div style={contactPageStyles.success}>
                <Check size={48} color="var(--gold)" style={{ marginBottom: '2rem' }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--white)', marginBottom: '1rem' }}>Inquiry Sent!</h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.35rem' }}>Thank you for contacting Aureya. We'll be in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={contactPageStyles.form}>
                <h3 style={contactPageStyles.formHeading}>Send an Inquiry</h3>
                <div style={contactPageStyles.field}>
                  <label>Your Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Aayush Mehta" required />
                </div>
                <div style={contactPageStyles.field}>
                  <label>Email or WhatsApp Number</label>
                  <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com or +91..." required />
                </div>
                <div style={contactPageStyles.field}>
                  <label>Message / Order Details</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder="Tell us which fragrances you're interested in..." required style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const contactPageStyles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5rem',
    alignItems: 'start',
  },
  infoCol: {
    backgroundColor: '#0e0e0e',
    border: '1px solid var(--border)',
    padding: '5rem'
  },
  infoHeading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '3rem',
    fontWeight: '400',
    color: 'var(--white)',
    marginBottom: '1.2rem',
    letterSpacing: '0.04em',
  },
  infoDesc: {
    fontSize: '1.3rem',
    color: 'var(--muted)',
    lineHeight: '1.7',
    marginBottom: '3.5rem',
    margin: '0 0 3.5rem 0',
  },
  infoItems: { display: 'flex', flexDirection: 'column', gap: '2.4rem' },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingBottom: '2.4rem',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  infoLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.95rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
  },
  infoVal: {
    fontSize: '1.4rem',
    color: 'var(--white)',
    textDecoration: 'none',
    letterSpacing: '0.02em',
  },
  formCol: {
    backgroundColor: '#0e0e0e',
    border: '1px solid var(--border)',
    padding: '5rem',
  },
  formHeading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '3rem',
    fontWeight: '400',
    color: 'var(--white)',
    marginBottom: '3.5rem',
    letterSpacing: '0.04em',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '2.4rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  success: {
    textAlign: 'center',
    padding: '5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

/* ─── Main App ────────────────────────────────────────── */
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('aureya_admin_token') || '');
  const [isAdmin, setIsAdmin] = useState(() => Boolean(localStorage.getItem('aureya_admin_token')));

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleLogout = useCallback(() => {
    setToken('');
    setIsAdmin(false);
    localStorage.removeItem('aureya_admin_token');
    setActiveTab('home');
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) setProducts(await res.json());
    } catch (err) { console.error(err); }
  }, []);

  const fetchInquiries = useCallback(async (authToken) => {
    try {
      const res = await fetch('/api/admin/inquiries', { headers: { Authorization: `Bearer ${authToken}` } });
      if (res.ok) setInquiries(await res.json());
      else if ([401, 403].includes(res.status)) handleLogout();
    } catch (err) { console.error(err); }
  }, [handleLogout]);

  useEffect(() => {
    let isActive = true;

    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (isActive) setProducts(data);
      })
      .catch(console.error);

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!token) return undefined;
    let isActive = true;

    fetch('/api/admin/inquiries', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if ([401, 403].includes(res.status)) {
          handleLogout();
          return [];
        }
        return res.ok ? res.json() : [];
      })
      .then((data) => {
        if (isActive) setInquiries(data);
      })
      .catch(console.error);

    return () => {
      isActive = false;
    };
  }, [handleLogout, token]);

  const handleLoginSuccess = (userToken) => {
    setToken(userToken); setIsAdmin(true);
    localStorage.setItem('aureya_admin_token', userToken);
    setActiveTab('admin');
    fetchInquiries(userToken);
  };

  const handleAddProduct = async (p) => {
    const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(p) });
    if (res.ok) fetchProducts();
  };

  const handleUpdateProduct = async (p) => {
    const res = await fetch(`/api/admin/products/${p.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(p) });
    if (res.ok) fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchProducts();
  };

  const handleUploadProductImage = async (file) => {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const res = await fetch('/api/admin/uploads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        dataUrl,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Image upload failed');
    }

    return data.url;
  };

  const handleClearInquiries = async () => {
    const res = await fetch('/api/admin/inquiries', { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setInquiries([]);
  };

  const handleNewsletterSubmit = async (email) => {
    try {
      await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'Newsletter', email }) });
    } catch (err) { console.error(err); }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Contact Enquiry', name: contactName, email: contactEmail, message: contactMessage }),
      });
      if (res.ok) {
        setContactSubmitted(true);
        setContactName(''); setContactEmail(''); setContactMessage('');
        setTimeout(() => setContactSubmitted(false), 5000);
      }
    } catch (err) { console.error(err); }
  };

  if (!isLoaded) return <Loader onComplete={() => setIsLoaded(true)} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--black)' }}>
      <Navbar activeTab={activeTab} onNavigate={setActiveTab} onOpenLogin={() => setLoginOpen(true)} isAdmin={isAdmin} onLogout={handleLogout} />

      <main style={{ flexGrow: 1 }}>

        {/* ── HOME ─────────────────────────────────────── */}
        {activeTab === 'home' && (
          <>
            <Hero onNavigate={setActiveTab} />
            <MarqueeBand />
            <CollectionSection products={products} onSelect={setActiveProduct} onNavigate={setActiveTab} />
            <FeatureSection onNavigate={setActiveTab} />
            <AboutSection />
            <TestimonialsSection />
            <WhatsAppBand />
          </>
        )}

        {/* ── SHOP ─────────────────────────────────────── */}
        {activeTab === 'shop' && (
          <ShopPage products={products} onSelect={setActiveProduct} />
        )}

        {/* ── QUIZ ─────────────────────────────────────── */}
        {activeTab === 'quiz' && (
          <ScentQuiz products={products} onSelectProduct={setActiveProduct} />
        )}

        {/* ── ABOUT ────────────────────────────────────── */}
        {activeTab === 'about' && <AboutPage />}

        {/* ── CONTACT ──────────────────────────────────── */}
        {activeTab === 'contact' && (
          <ContactPage
            onSubmit={handleContactSubmit}
            submitted={contactSubmitted}
            name={contactName} setName={setContactName}
            email={contactEmail} setEmail={setContactEmail}
            message={contactMessage} setMessage={setContactMessage}
          />
        )}

        {/* ── ADMIN ────────────────────────────────────── */}
        {activeTab === 'admin' && isAdmin && (
          <AdminDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUploadImage={handleUploadProductImage}
            inquiries={inquiries}
            onClearInquiries={handleClearInquiries}
          />
        )}
      </main>

      <Footer onNavigate={setActiveTab} onSubscribe={handleNewsletterSubmit} onOpenLogin={() => setLoginOpen(true)} isAdmin={isAdmin} />

      <ProductDetailModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      <AdminLogin isOpen={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
