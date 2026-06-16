import { useCallback, useEffect, useRef, useState } from 'react';

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.speedX = (Math.random() - 0.5) * 6;
    this.speedY = -Math.random() * 5 - 2;
    this.color = `rgba(197, 168, 128, ${Math.random() * 0.7 + 0.3})`;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.005;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.decay;
    if (this.size > 0.2) this.size -= 0.02;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#c5a880';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function Loader({ onComplete }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showText, setShowText] = useState(true);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);

  const handleOpen = useCallback(() => {
    if (isOpened) return;
    setIsOpened(true);
    setShowText(false);
    
    // Trigger particle explosion
    const canvas = canvasRef.current;
    if (canvas) {
      const originX = canvas.width / 2;
      const originY = canvas.height * 0.42; // Bottle neck position

      // Create burst
      for (let i = 0; i < 150; i++) {
  particles.current.push(new Particle(originX, originY));
}
    }

    // Complete loading after animation
    setTimeout(() => {
      onComplete();
    }, 2500);
  }, [isOpened, onComplete]);

  // Auto-trigger on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      handleOpen();
    }, 1500);
    return () => clearTimeout(timer);
  }, [handleOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add ambient floating particles
      if (!isOpened && Math.random() < 0.05) {
        particles.current.push(new Particle(canvas.width / 2 + (Math.random() - 0.5) * 60, canvas.height * 0.42));
      }

      particles.current = particles.current.filter((particle) => {
  particle.update();
  particle.draw(ctx);
  return particle.alpha > 0;
});

      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [isOpened]);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />
      
      <div style={styles.bottleContainer}>
        {/* Perfume Bottle SVG Structure */}
        <div style={styles.bottleWrapper}>
          {/* Cap */}
          <div style={{
            ...styles.cap,
            transform: isOpened 
              ? 'translateY(-140px) rotate(15deg) scale(0.95)' 
              : 'translateY(0) rotate(0deg)',
            opacity: isOpened ? 0 : 1,
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease'
          }}>
            <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="50" rx="4" fill="#0d0d0d" stroke="#c5a880" strokeWidth="1.5"/>
              <line x1="10" y1="12" x2="50" y2="12" stroke="#c5a880" strokeOpacity="0.4"/>
              <line x1="10" y1="25" x2="50" y2="25" stroke="#c5a880" strokeOpacity="0.4"/>
              <line x1="10" y1="38" x2="50" y2="38" stroke="#c5a880" strokeOpacity="0.4"/>
            </svg>
          </div>

          {/* Sprayer / Gold Neck */}
          <div style={styles.neck}>
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" width="30" height="20" fill="#c5a880" />
              <circle cx="20" cy="8" r="3" fill="#000" />
            </svg>
          </div>

          {/* Bottle Body */}
          <div style={styles.body}>
            <svg width="180" height="240" viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Thick glass border */}
              <rect x="5" y="5" width="170" height="230" rx="20" stroke="#c5a880" strokeWidth="6" fill="rgba(20, 20, 20, 0.7)" />
              {/* Inner glass highlight */}
              <rect x="15" y="15" width="150" height="210" rx="12" stroke="#c5a880" strokeWidth="1.5" strokeOpacity="0.2" />
              
              {/* Liquid inside - animates slightly on load */}
              <path 
                d={isOpened 
                  ? "M 15 220 L 15 130 Q 90 140 165 130 L 165 220 Z"
                  : "M 15 220 L 15 90 Q 90 85 165 90 L 165 220 Z"} 
                fill="url(#liquidGrad)" 
                style={{ transition: 'd 2s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
              />

              {/* Label */}
              <rect x="35" y="55" width="110" height="110" rx="4" fill="#faf6f0" stroke="#c5a880" strokeWidth="1" />
              <text x="90" y="95" fontFamily="Cinzel" fontSize="16" fontWeight="bold" fill="#000" textAnchor="middle" letterSpacing="3">AUREYA</text>
              <text x="90" y="115" fontFamily="Montserrat" fontSize="7" fill="#666" textAnchor="middle" letterSpacing="4">BY AAYUSH</text>
              <line x1="55" y1="128" x2="125" y2="128" stroke="#c5a880" strokeWidth="0.75" />
              <text x="90" y="142" fontFamily="Montserrat" fontSize="6" fill="#333" textAnchor="middle" letterSpacing="1">EXTRAIT DE PARFUM</text>
              
              {/* Gradients */}
              <defs>
                <linearGradient id="liquidGrad" x1="90" y1="80" x2="90" y2="220" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c5a880" stopOpacity="0.3" />
<stop offset="60%" stopColor="#c5a880" stopOpacity="0.6" />
<stop offset="100%" stopColor="#967850" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Dynamic Text */}
        {showText ? (
          <div style={styles.ctaWrapper}>
            <p style={styles.brandSubtitle}>CELEBRATION OF SCENT</p>
            <h1 style={styles.brandTitle}>AUREYA</h1>
            <p style={styles.hintText}>Uncapping the experience...</p>
          </div>
        ) : (
          <div style={styles.releasingWrapper}>
            <p style={styles.releaseText}>Releasing the scent...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#050505',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  bottleContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2,
  },
  bottleWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2.5rem',
  },
  cap: {
    zIndex: 4,
    cursor: 'pointer',
  },
  neck: {
    marginTop: '-4px',
    zIndex: 3,
  },
  body: {
    marginTop: '-2px',
    zIndex: 2,
    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.7))',
  },
  ctaWrapper: {
    textAlign: 'center',
    animation: 'fadeIn 1.5s ease',
  },
  brandSubtitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.8rem',
    letterSpacing: '0.4em',
    color: '#c5a880',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  },
  brandTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: '2.8rem',
    fontWeight: '400',
    letterSpacing: '0.15em',
    color: '#f5f5f7',
    marginBottom: '1.8rem',
  },
  hintText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.65rem',
    letterSpacing: '0.35em',
    color: 'rgba(197, 168, 128, 0.5)',
    textTransform: 'uppercase',
    animation: 'pulse-slow 2s infinite',
  },
  releasingWrapper: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  releaseText: {
    fontFamily: "'Cinzel', serif",
    fontSize: '1rem',
    letterSpacing: '0.3em',
    color: '#c5a880',
    textTransform: 'uppercase',
    animation: 'pulse-slow 2s infinite',
  }
};
