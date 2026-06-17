import { useState } from 'react';

export default function ProductCard({ product, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const hasDiscount =
  product.discountPrice &&
  Number(product.discountPrice) < Number(product.price);

const discountPercent = hasDiscount
  ? Math.round(
      ((product.price - product.discountPrice) /
        product.price) * 100
    )
  : 0;

  return (
  <div
    style={{
      ...styles.card,
      ...(hovered ? styles.cardHovered : {}),
      opacity: product.available === false ? 0.65 : 1,
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={() => {
      if (product.available === false) return;
      onSelect(product);
    }}
  >
      {/* Image area */}
      <div style={styles.imageWrap}>
        {product.discountPrice &&
 product.available !== false && (
  <div
    style={{
      position:'absolute',
      top:'15px',
      right:'-35px',
      width:'120px',
      textAlign:'center',
      background:'#ff0000',
      color:'#000',
      fontWeight:'700',
      fontSize:'0.7rem',
      padding:'6px 0',
      transform:'rotate(45deg)',
      zIndex:20,
    }}
  >
    {Math.round(
      ((product.price-product.discountPrice)/
        product.price)*100
    )}% OFF
  </div>
)}
        <img
          src={product.image || '/images/cosmic.jpeg'}
          alt={product.name}
          style={{
            ...styles.image,
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />
        {product.available === false && (
  <div
    style={{
      position: 'absolute',
      top: '12px',
      right: '12px',
      zIndex: 10,
      background: '#c0392b',
      color: '#fff',
      padding: '6px 12px',
      fontSize: '0.75rem',
      fontWeight: '700',
      borderRadius: '20px',
      textTransform: 'uppercase',
    }}
  >
    Sold Out
  </div>
)}
        {/* Overlay on hover */}
        <div
  style={{
    ...styles.imageOverlay,
    opacity: hovered ? 1 : 0,
  }}
>
  <span style={styles.viewLabel}>
    {product.available === false ? 'SOLD OUT' : 'VIEW DETAILS'}
  </span>
</div>
        {/* Badge */}
        {product.type && (
          <div style={styles.badge}>
            {product.type === 'solid' ? 'SOLID PERFUME' : 'EXTRAIT DE PARFUM'}
          </div>
        )}
      </div>

      {/* Text */}
      <div style={styles.info}>
        <p style={styles.tag}>{product.tag || ''}</p>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.desc}>{product.shortDesc || product.description?.slice(0, 70) + '...'}</p>
        <div style={styles.bottom}>
          {product.discountPrice ? (
  <div>
    <div
      style={{
        textDecoration:'line-through',
        color:'#888',
        fontSize:'0.9rem'
      }}
    >
      ₹{product.price}
    </div>

    <div
      style={{
        color:'#c5a880',
        fontWeight:'700'
      }}
    >
      ₹{product.discountPrice}
    </div>

    <div
      style={{
        color:'#2ecc71',
        fontSize:'0.8rem'
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
    ₹{product.price}
  </span>
)}
          <button
            style={{ ...styles.detailBtn, borderColor: hovered ? 'var(--gold)' : 'var(--border)', color: hovered ? 'var(--gold)' : 'var(--muted)' }}
            onClick={(e) => {
  e.stopPropagation();

  if (product.available === false) {
    return;
  }

  onSelect(product);
}}
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
  backgroundColor: 'var(--off-black)',
  border: '1px solid var(--border)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  minWidth: 0,
},
  cardHovered: {
    borderColor: 'var(--gold)',
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  },
  imageWrap: {
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: '3 / 4',
    backgroundColor: '#111',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
    display: 'block',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(5,5,5,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease',
  },
  viewLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'var(--white)',
    borderBottom: '1px solid var(--gold)',
    paddingBottom: '4px',
  },
  badge: {
    position: 'absolute',
    top: '1.4rem',
    left: '1.4rem',
    backgroundColor: 'rgba(5,5,5,0.85)',
    border: '1px solid var(--border)',
    color: 'var(--gold)',
    fontSize: '0.75rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    padding: '0.4rem 1rem',
  },
  info: {
    padding: '2rem 2rem 2.4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    flex: 1,
  },
  tag: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.9rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    margin: 0,
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2.2rem',
    fontWeight: '400',
    color: 'var(--white)',
    letterSpacing: '0.05em',
    margin: '0.2rem 0',
  },
  desc: {
    fontSize: '1.2rem',
    color: 'var(--muted)',
    lineHeight: '1.6',
    margin: 0,
    flex: 1,
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1.4rem',
  },
  price: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem',
    fontWeight: '500',
    color: 'var(--white)',
    letterSpacing: '0.05em',
  },
  detailBtn: {
    background: 'none',
    border: '1px solid',
    padding: '0.6rem 1.4rem',
    fontSize: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
};
