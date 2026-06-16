import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function Footer({ onNavigate, onSubscribe, onOpenLogin, isAdmin }) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onSubscribe(email);
    setSuccess(true);
    setEmail('');
    setTimeout(() => setSuccess(false), 3500);
  };

  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>

      {/* ── Newsletter strip ── */}
      <div style={styles.newsletterStrip}>
        <div className="container newsletter-row" style={styles.newsletterInner}>
          <div style={styles.nlLeft}>
            <p style={styles.nlEyebrow}>Fragrance Journal</p>
            <h3 style={styles.nlHeading}>Stay in the world of Aureya</h3>
          </div>
          <form onSubmit={handleSubmit} style={styles.nlForm}>
            <div className="footer-input-row" style={styles.nlInputRow}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.nlInput}
              />
              <button type="submit" style={styles.nlBtn}>
                {success ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div style={styles.body}>
        <div className="container footer-grid" style={styles.grid}>

          {/* Brand col */}
          <div style={styles.brandCol}>
            <h2 style={styles.brandName}>AUREYA</h2>
            <p style={styles.brandByline}>by Aayush</p>
            <p style={styles.brandTagline}>"Wear Your Essence."</p>
            <p style={styles.brandDesc}>
              Mumbai's celebration of scent and sophistication. Crafting subtle luxury through compact solid balms and concentrated sprays.
            </p>
            <div style={styles.socialRow}>
              <a href="https://wa.me/919619203048" target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="WhatsApp">
                <MessageSquare size={17} />
              </a>
              <a href="https://www.instagram.com/aureyabyaayush/" target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="Instagram">
                <Camera size={17} />
              </a>
              <a href="mailto:Aureyabyaayush@gmail.com" style={styles.socialLink} title="Email">
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Nav col */}
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Navigate</h4>
            {[['home','Home'],['shop','Collections'],['about','Our Story'],['quiz','Scent Quiz'],['contact','Contact']].map(([tab, label]) => (
              <button key={tab} style={styles.linkBtn} onClick={() => onNavigate(tab)}>{label}</button>
            ))}
          </div>

          {/* Collections col */}
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Collections</h4>
            <button style={styles.linkBtn} onClick={() => onNavigate('shop')}>Extrait de Parfum</button>
            <button style={styles.linkBtn} onClick={() => onNavigate('shop')}>Solid Fragrances</button>
            <button style={styles.linkBtn} onClick={() => onNavigate('quiz')}>Scent Finder Quiz</button>
            {isAdmin ? (
              <button style={{ ...styles.linkBtn, color: '#e05c4a' }} onClick={() => onNavigate('admin')}>Admin Dashboard</button>
            ) : (
              <button style={styles.linkBtn} onClick={onOpenLogin}>Admin Login</button>
            )}
          </div>

          {/* Contact col */}
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Get in Touch</h4>
            <div style={styles.contactItem}>
              <Phone size={13} color="var(--gold)" />
              <a href="tel:+919619203048" style={styles.contactLink}>+91 96192 03048</a>
            </div>
            <div style={styles.contactItem}>
              <MessageSquare size={13} color="var(--gold)" />
              <a href="https://wa.me/919619203048?text=Hi%20AUREYA,%20I'd%20like%20to%20enquire%20about%20your%20fragrances." target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                Chat on WhatsApp
              </a>
            </div>
            <div style={styles.contactItem}>
              <MapPin size={13} color="var(--gold)" />
              <span style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>Mumbai, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={styles.bottomBar}>
        <div className="container footer-bottom-inner" style={styles.bottomInner}>
          <p style={styles.copyright}>© {year} Aureya by Aayush. All rights reserved.</p>
          <p style={styles.bottomTag}>Let your scent be your signature.</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--off-black)',
    borderTop: '1px solid var(--border)',
  },
  newsletterStrip: {
    backgroundColor: '#0e0e0e',
    borderBottom: '1px solid var(--border)',
    padding: '5rem 0',
  },
  newsletterInner: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '3rem',
},
  nlLeft: { flex: 1,
  minWidth: 0, },
  nlEyebrow: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '0.8rem',
  },
  brandByline: {
  color: 'var(--gold)',
  letterSpacing: '0.2em',
  marginBottom: '1rem',
  textTransform: 'uppercase',
},
  nlHeading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
    fontWeight: '400',
    color: 'var(--white)',
    letterSpacing: '0.02em',
    margin: 0,
  },
  nlForm: { flex: 1,
  minWidth: 0,
  maxWidth: '48rem', },
  nlInputRow: {
  display: 'flex',
  gap: '1rem',
},
  nlInput: {
    flex: 1,
    height: '5rem',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRight: 'none',
    color: 'var(--white)',
    padding: '0 1.8rem',
    fontSize: '1.3rem',
    outline: 'none',
  },
  nlBtn: {
    height: '5rem',
    padding: '0 3rem',
    backgroundColor: 'var(--gold)',
    color: 'var(--black)',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.1rem',
    fontWeight: '700',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background 0.3s ease',
  },
  body: { padding: '6rem 0' },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '5rem',
  },
  brandCol: {
  width: '100%',
  maxWidth: '100%',
},
  brandName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '3.2rem',
    fontWeight: '400',
    letterSpacing: '0.3em',
    color: 'var(--white)',
    marginBottom: '0.8rem',
  },
  brandTagline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.5rem',
    fontStyle: 'italic',
    color: 'var(--gold)',
    marginBottom: '1.6rem',
    letterSpacing: '0.08em',
  },
  brandDesc: {
  fontSize: '1.25rem',
  color: 'var(--muted)',
  lineHeight: '1.8',
  maxWidth: '100%',
  marginBottom: '2.4rem',
},
  socialRow: { display: 'flex', gap: '1.4rem' },
  socialLink: {
    width: '3.8rem',
    height: '3.8rem',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--muted)',
    transition: 'border-color 0.2s ease, color 0.2s ease',
    textDecoration: 'none',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4rem',
  },
  colTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--white)',
    marginBottom: '0.8rem',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--muted)',
    fontSize: '1.25rem',
    cursor: 'pointer',
    textAlign: 'left',
    padding: 0,
    transition: 'color 0.2s ease',
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: '0.04em',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  contactLink: {
    color: 'var(--muted)',
    fontSize: '1.25rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontFamily: "'Montserrat', sans-serif",
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.04)',
    padding: '2.4rem 0',
    backgroundColor: '#080808',
  },
 bottomInner: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
},
  copyright: {
    fontSize: '1.1rem',
    color: 'var(--muted)',
    margin: 0,
  },
  bottomTag: {
    fontSize: '1.1rem',
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    color: 'var(--gold)',
    margin: 0,
    letterSpacing: '0.08em',
  },
};
