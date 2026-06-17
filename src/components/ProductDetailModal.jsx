import { X, MessageSquare, Info } from 'lucide-react';

export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  const {
  name,
  type,
  price,
  volume,
  image,
  description,
  notes,
  tag,
  concentration,
  available = true,
} = product;

  // WhatsApp Enquiry Link
  const whatsappNumber = "919619203048";
  const formattedPrice = Number(price || 0).toLocaleString('en-IN');

const whatsappMessage = encodeURIComponent(
  `Hi AUREYA, I'd like to enquire about "${name}" (${volume}, priced at ₹${formattedPrice}). Please share ordering and payment details. Thank you!`
);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()} className="glass animate-fade-in">
        {/* Close Button */}
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        <div style={styles.content}>
          {/* Left Column: Image */}
          <div style={styles.imageCol}>
            <img 
              src={image} 
              alt={name} 
              style={styles.image}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80';
              }}
            />
            {type === 'solid' && (
              <div style={styles.infoBox}>
                <Info size={16} color="#fcd116" style={{marginRight: '8px', flexShrink: 0}} />
                <p style={styles.infoBoxText}>
                  <strong>Solid Perfume:</strong> Rub gently with a finger and apply on warm pulse points (wrists, neck, behind ears). Activate with body heat.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div style={styles.detailsCol}>
            <div style={styles.headerRow}>
              <span style={{
                ...styles.typeBadge,
                backgroundColor: type === 'solid' ? 'rgba(252, 209, 22, 0.15)' : 'rgba(88, 133, 165, 0.15)',
                color: type === 'solid' ? '#fcd116' : '#5885a5',
                borderColor: type === 'solid' ? 'rgba(252, 209, 22, 0.3)' : 'rgba(88, 133, 165, 0.3)',
              }}>
                {concentration || (type === 'solid' ? 'Solid Balm' : 'Extrait de Parfum')}
              </span>
              <span style={styles.tagBadge}>{tag}</span>
            </div>

            <h2 style={styles.title}>{name}</h2>
            <div style={styles.priceRow}>
              {product.discountPrice ? (
  <div>
    <div
      style={{
        textDecoration:'line-through',
        color:'#888',
        fontSize:'1.2rem'
      }}
    >
      ₹{formattedPrice}
    </div>

    <div
      style={{
        color:'#c5a880',
        fontSize:'2rem',
        fontWeight:'700'
      }}
    >
      ₹{Number(
        product.discountPrice
      ).toLocaleString('en-IN')}
    </div>

    <div
      style={{
        color:'#2ecc71'
      }}
    >
      {Math.round(
        ((product.price - product.discountPrice)
          / product.price) * 100
      )}
      % OFF
    </div>
  </div>
) : (
  <span style={styles.price}>
    ₹{formattedPrice}
  </span>
)}
              <span style={styles.volume}>{volume}</span>
            </div>

            <p style={styles.description}>{description}</p>

            {/* Olfactory Pyramid */}
            {notes && (
              <div style={styles.pyramidSection}>
                <h3 style={styles.sectionHeading}>Olfactory Notes</h3>
                
                <div style={styles.noteRow}>
                  <div style={styles.noteLabel}>
                    <span style={styles.noteDot} />
                    <span>Top Notes</span>
                  </div>
                  <p style={styles.noteContent}>{notes.top.join(', ')}</p>
                </div>

                <div style={styles.noteRow}>
                  <div style={styles.noteLabel}>
                    <span style={{...styles.noteDot, backgroundColor: '#5885a5'}} />
                    <span>Heart Notes</span>
                  </div>
                  <p style={styles.noteContent}>{notes.heart.join(', ')}</p>
                </div>

                <div style={styles.noteRow}>
                  <div style={styles.noteLabel}>
                    <span style={{...styles.noteDot, backgroundColor: '#c5a880'}} />
                    <span>Base Notes</span>
                  </div>
                  <p style={styles.noteContent}>{notes.base.join(', ')}</p>
                </div>
              </div>
            )}

            {/* Action Section */}
            {available ? (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={styles.whatsappBtn}
  >
    <MessageSquare size={16} style={{marginRight: '10px'}} />
    Enquire on WhatsApp
  </a>
) : (
  <div style={styles.soldOutBtn}>
    SOLD OUT
  </div>
)}

            {/* Sub-text from brochure */}
            <p style={styles.brochureNote}>
              * For custom pricing, bulk orders, or inquiries, click "Enquire" to chat with AUREYA support directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(5, 5, 5, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    padding: '20px',
    overflowY: 'auto',
  },
  modal: {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: '#121212',
    border: '1px solid rgba(197, 168, 128, 0.15)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)',
    position: 'relative',
    margin: 'auto',
  },
  soldOutBtn: {
  width: '100%',
  height: '45px',
  backgroundColor: '#2b2b2b',
  color: '#e05c4a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '700',
  letterSpacing: '0.15em',
},
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: '#a0a0a5',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    zIndex: 10,
    ':hover': {
      color: '#f5f5f7',
    }
  },
  content: {
  display: 'flex',
  flexWrap: 'wrap',
  },
  imageCol: {
    padding: '40px',
    display: 'flex',
    flex: '1 1 350px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0e12',
    borderRight: '1px solid rgba(197, 168, 128, 0.08)',
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.6))',
  },
  infoBox: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(252, 209, 22, 0.06)',
    border: '1px solid rgba(252, 209, 22, 0.15)',
    padding: '12px 15px',
    marginTop: '25px',
    width: '100%',
  },
  infoBoxText: {
    fontSize: '0.72rem',
    color: '#a0a0a5',
    lineHeight: '1.4',
  },
  detailsCol: {
    padding: '45px',
    display: 'flex',
    flex: '1 1 450px',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '15px',
  },
  typeBadge: {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    padding: '4px 10px',
    border: '1px solid',
  },
  tagBadge: {
    fontSize: '0.65rem',
    color: '#a0a0a5',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: '2rem',
    fontWeight: '400',
    color: '#f5f5f7',
    marginBottom: '10px',
    letterSpacing: '0.05em',
    textAlign: 'left',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '15px',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '15px',
  },
  price: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.4rem',
    fontWeight: '500',
    color: '#fcd116', // brochure yellow
  },
  volume: {
    fontSize: '0.9rem',
    color: '#a0a0a5',
  },
  description: {
    fontSize: '0.88rem',
    lineHeight: '1.6',
    color: '#a0a0a5',
    marginBottom: '25px',
  },
  pyramidSection: {
    marginBottom: '30px',
  },
  sectionHeading: {
    fontFamily: "'Cinzel', serif",
    fontSize: '0.9rem',
    color: '#c5a880',
    letterSpacing: '0.1em',
    marginBottom: '15px',
    borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
    paddingBottom: '6px',
    textTransform: 'uppercase',
  },
  noteRow: {
    display: 'flex',
    marginBottom: '10px',
    fontSize: '0.8rem',
    alignItems: 'baseline',
  },
  noteLabel: {
    width: '110px',
    flexShrink: 0,
    fontWeight: '500',
    color: '#f5f5f7',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  noteDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#fcd116',
    display: 'inline-block',
  },
  noteContent: {
    color: '#a0a0a5',
  },
  actionsContainer: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-end',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  qtyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  qtySelector: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(197, 168, 128, 0.2)',
    height: '42px',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    color: '#f5f5f7',
    cursor: 'pointer',
    width: '30px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#c5a880',
    }
  },
  qtyVal: {
    fontSize: '0.85rem',
    width: '24px',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    flexGrow: 1,
    '@media (max-width: 480px)': {
      width: '100%',
    }
  },
  addBtn: {
    flexGrow: 2,
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
  },
  whatsappBtn: {
    width: '100%',
    height: '45px',
    backgroundColor: '#fcd116',
    color: '#0a0b10',
    border: '1px solid #fcd116',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#fcd116',
    }
  },
  brochureNote: {
    fontSize: '0.65rem',
    color: '#6b6b72',
    lineHeight: '1.4',
    fontStyle: 'italic',
    marginTop: '15px',
  }
};
