 

export default function Hero({ onNavigate }) {
  return (
    <div style={styles.hero}>
      {/* Full-bleed background image using the solid perfumes image */}
      <div style={styles.bgOverlay} />
      <img
        src="https://4yky8m622npc1u4j.public.blob.vercel-storage.com/hero1.png"
        alt="Aureya Fragrance"
        style={styles.bgImage}
      />

      {/* Centered content */}
      <div style={styles.content}>
        <p style={styles.eyebrow} className="animate-fade-in">AUREYA · MUMBAI</p>
        <h1 style={styles.headline} className="animate-fade-up">
          AUREYA
        </h1>
        <p style={styles.sub} className="animate-fade-up">
          Wear Your Essence.
        </p>
        <p style={styles.desc}>
          A celebration of scent and sophistication — crafted for those who seek<br />
          subtle luxury in a modern, exotic form.
        </p>
        <div style={styles.ctas}>
          <button className="btn-primary" onClick={() => onNavigate('shop')}>
            Explore Collection
          </button>
          <button className="btn-outline" onClick={() => onNavigate('about')} style={{ marginLeft: '1.6rem' }}>
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={styles.scrollIndicator}>
        <div style={styles.scrollLine} />
        <span style={styles.scrollText}>SCROLL</span>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    position: 'relative',
    height: '100vh',
    minHeight: '70rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#090909',
  },
  bgImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    opacity: 0.45,
    filter: 'saturate(0.6)',
  },
  bgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.55) 60%, rgba(5,5,5,1) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '0 2rem',
    maxWidth: '90rem',
  },
  eyebrow: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.05rem',
    fontWeight: '500',
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '2rem',
    display: 'block',
  },
  headline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(7rem, 16vw, 16rem)',
    fontWeight: '300',
    letterSpacing: '0.18em',
    color: 'var(--white)',
    lineHeight: 0.9,
    marginBottom: '2.4rem',
  },
  sub: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
    fontStyle: 'italic',
    fontWeight: '300',
    color: 'var(--gold)',
    letterSpacing: '0.12em',
    marginBottom: '2.4rem',
  },
  desc: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.3rem',
    fontWeight: '300',
    color: 'rgba(247,245,240,0.65)',
    lineHeight: '1.9',
    letterSpacing: '0.04em',
    marginBottom: '4rem',
  },
  ctas: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1.6rem',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '4rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    zIndex: 2,
    animation: 'pulse-slow 2.5s infinite',
  },
  scrollLine: {
    width: '1px',
    height: '5rem',
    background: 'linear-gradient(to bottom, var(--gold), transparent)',
  },
  scrollText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.85rem',
    letterSpacing: '0.3em',
    color: 'var(--gold)',
    textTransform: 'uppercase',
  },
};
