import { Fragment, useEffect, useState } from 'react';
import { User, Menu, X } from 'lucide-react';

export default function Navbar({ onNavigate, activeTab, onOpenLogin, isAdmin, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab) => {
    onNavigate(tab);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', tab: 'home' },
    { label: 'Collections', tab: 'shop' },
    { label: 'Our Story', tab: 'about' },
    { label: 'Scent Quiz', tab: 'quiz' },
    { label: 'Contact', tab: 'contact' },
  ];

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="announcement-bar">
        <div className="announcement-bar__inner">
          {[...Array(2)].map((_, gi) =>
            ['Free shipping on orders above ₹999', 'Solid perfumes — No Spills, No Waste', 'Handcrafted in Mumbai with skin-loving oils', 'Let your scent be your signature'].map((text, i) => (
              <Fragment key={`${gi}-${i}`}>
                <span className="announcement-bar__item">{text}</span>
                <span className="announcement-bar__sep">✦</span>
              </Fragment>
            ))
          )}
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav style={{
        ...styles.navbar,
        backgroundColor: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(197,168,124,0.12)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        padding: scrolled ? '1.4rem 0' : '2.2rem 0',
      }}>
        <div className="container" style={styles.navContainer}>

          {/* Mobile burger */}
          {/* Mobile burger */}
<button
  className="mobile-burger"
  style={styles.burgerBtn}
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label="Toggle menu"
>
  {mobileOpen ? (
    <X size={22} color="white" />
  ) : (
    <Menu size={22} color="white" />
  )}
</button>

          {/* Left links */}
          <div style={styles.leftLinks} className="desktop-nav hide-mobile">
            {navItems.slice(0, 2).map(({ label, tab }) => (
              <button
                key={tab}
                style={{ ...styles.navLink, color: activeTab === tab ? 'var(--gold)' : 'var(--white)' }}
                onClick={() => handleNavClick(tab)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Brand */}
          <div className="navbar-brand" style={styles.brand} onClick={() => handleNavClick('home')}>
  <div>AUREYA</div>
  <div style={styles.brandSub}>by Aayush</div>
</div>

          {/* Right links */}
          <div style={styles.rightLinks} className="desktop-nav hide-mobile">
            {navItems.slice(2).map(({ label, tab }) => (
              <button
                key={tab}
                style={{ ...styles.navLink, color: activeTab === tab ? 'var(--gold)' : 'var(--white)' }}
                onClick={() => handleNavClick(tab)}
              >
                {label}
              </button>
            ))}
            {isAdmin && (
              <button
                style={{ ...styles.navLink, color: activeTab === 'admin' ? 'var(--gold)' : 'var(--white)' }}
                onClick={() => handleNavClick('admin')}
              >
                Dashboard
              </button>
            )}
            {isAdmin ? (
              <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
            ) : (
              <button style={styles.iconBtn} onClick={onOpenLogin} title="Admin Login">
                <User size={17} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="mobile-menu" style={styles.mobileMenu}>
            {navItems.map(({ label, tab }) => (
              <button
                key={tab}
                style={{ ...styles.mobileLink, color: activeTab === tab ? 'var(--gold)' : 'var(--white)' }}
                onClick={() => handleNavClick(tab)}
              >
                {label}
              </button>
            ))}
            {isAdmin && (
              <button style={{ ...styles.mobileLink, color: 'var(--gold)' }} onClick={() => handleNavClick('admin')}>
                Dashboard
              </button>
            )}
            {isAdmin ? (
              <button style={{ ...styles.mobileLink, color: '#e05c4a' }} onClick={() => { onLogout(); setMobileOpen(false); }}>
                Logout
              </button>
            ) : (
              <button style={{ ...styles.mobileLink, color: 'var(--gold)' }} onClick={() => { onOpenLogin(); setMobileOpen(false); }}>
                Admin Login
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

const styles = {
  navbar: {
    position: 'fixed',
    top: '3.8rem',
    left: 0,
    width: '100%',
    zIndex: 999,
    transition: 'all 0.4s ease',
  },
  navContainer: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  minHeight: '60px',
},
  leftLinks: {
    display: 'flex',
    gap: '3.5rem',
    alignItems: 'center',
    flex: 1,
  },
  rightLinks: {
    display: 'flex',
    gap: '3.5rem',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  brand: {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '2rem',
  letterSpacing: '0.15em',
  fontWeight: '600',
  color: 'var(--white)',
  cursor: 'pointer',
  userSelect: 'none',
  whiteSpace: 'nowrap',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
},
  brandSub: {
  fontSize: '0.55rem',
  color: 'var(--gold)',
  letterSpacing: '0.35em',
  marginTop: '-8px',
  textAlign: 'center',
  width: '100%',
},
  navLink: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.05rem',
    fontWeight: '400',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    background: 'none',
    border: 'none',
    padding: '0.4rem 0',
    transition: 'color 0.2s ease',
    position: 'relative',
    cursor: 'pointer',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--white)',
    cursor: 'pointer',
    padding: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s ease',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid rgba(224,92,74,0.4)',
    color: '#e05c4a',
    fontSize: '1rem',
    padding: '0.5rem 1.2rem',
    cursor: 'pointer',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
  },
burgerBtn: {
  display: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.6rem',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1001,
},
  mobileMenu: {
    position: 'fixed',
  top: '120px',
  left: 0,
  right: 0,
    backgroundColor: 'rgba(5,5,5,0.98)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 3rem',
    gap: '2rem',
    animation: 'fadeIn 0.25s ease',
  },
  mobileLink: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.3rem',
    fontWeight: '400',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '0.8rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    cursor: 'pointer',
  },
};
