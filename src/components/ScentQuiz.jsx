import { useState } from 'react';
import { Award, Compass, RefreshCw, ArrowRight } from 'lucide-react';


const QUESTIONS = [
  {
  id: 0,
  question: "Which fragrance format do you prefer?",
  options: [
    {
      text: "Solid Perfume (Portable Balm)",
      type: "solid",
      isFormat: true,
    },
    {
      text: "Extrait de Parfum (Spray)",
      type: "spray",
      isFormat: true,
    }
  ]
},
  {
    id: 1,
    question: "Where is your ideal sensory escape?",
    options: [
      { text: "A crisp ocean breeze under the morning sun", type: "Fresh" },
      { text: "A warm, sunlit greenhouse of rare flowers", type: "Floral" },
      { text: "A deep, ancient forest at twilight", type: "Woody" },
      { text: "A cozy, candlelit study with warm pastries", type: "Sweet" }
    ]
  },
  {
    id: 2,
    question: "Which word best describes your signature aura?",
    options: [
      { text: "Vibrant and energizing", type: "Fresh" },
      { text: "Mysterious and alluring", type: "Floral" },
      { text: "Grounded and sophisticated", type: "Woody" },
      { text: "Warm and comforting", type: "Sweet" }
    ]
  },
  {
    id: 3,
    question: "Choose a texture or feeling that speaks to you:",
    options: [
      { text: "Cool, splashing sea mist", type: "Fresh" },
      { text: "Smooth, velvet orchid petals", type: "Floral" },
      { text: "Warm, dry cedar wood", type: "Woody" },
      { text: "Soft, melting golden honey", type: "Sweet" }
    ]
  }
];

export default function ScentQuiz({ products, onSelectProduct }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleOptionSelect = (value, isFormat = false) => {
  if (isFormat) {
    setSelectedFormat(value);
  } else {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(updatedAnswers);
    }

    return;
  }

  setCurrentStep(currentStep + 1);
};

  const calculateResult = (finalAnswers) => {
    // Count occurrences of each category
    const counts = finalAnswers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    // Find the category with the highest count
    let topCategory = 'Fresh';
    let maxCount = 0;
    Object.entries(counts).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = cat;
      }
    });

    // Match with products
    // Filter products matching the topCategory tag
    const matches = products.filter(
  p =>
    p.available !== false &&
    p.tag === topCategory &&
    p.type === selectedFormat
);
    
    // Pick the first match, or fallback to any product
    const recommendedProduct =
  matches[0] ||
  products.find(
    p =>
      p.available !== false &&
      p.type === selectedFormat
  ) ||
  products.find(
    p => p.available !== false
  );

    setResult({
      category: topCategory,
      product: recommendedProduct,
      description: getCategoryDescription(topCategory)
    });
  };

  const getCategoryDescription = (category) => {
    switch (category) {
      case 'Fresh':
        return "You are drawn to light, aquatic, and citrusy profiles. Crisp notes like lemon, mint, and sea breeze represent your energetic, free-spirited nature.";
      case 'Floral':
        return "You appreciate elegance, depth, and classic mystery. Indulgent, rich notes of orchid, jasmine, and vanilla reflect your refined and charming presence.";
      case 'Woody':
        return "You seek grounding, structure, and timeless sophistication. Earthy notes like sandalwood, cedar, and oakmoss define your calm, confident aura.";
      case 'Sweet':
        return "You love warm, comforting, and delicious profiles. Rich cherries, berries, caramel, and musk evoke a cozy, sensual, and unforgettable warmth.";
      default:
        return "A refined blending that showcases the absolute balance of scent and sophistication.";
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div style={styles.section} className="section">
      <div className="container">
        <div style={styles.quizHeader}>
          <Compass size={36} color="#c5a880" style={{marginBottom: '10px'}} />
          <h2 style={styles.sectionTitle}>Scent Finder</h2>
          <p style={styles.sectionSubtitle}>
            Answer 3 sensory questions to discover the Aureya fragrance that aligns with your essence.
          </p>
        </div>

        <div style={styles.cardContainer} className="glass">
          {!result ? (
            <div>
              {/* Progress Indicator */}
              <div style={styles.progressContainer}>
                <div style={styles.progressText}>
                  Question {QUESTIONS[currentStep].id} of {QUESTIONS.length}
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{
                    ...styles.progressBarFill,
                    width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`
                  }} />
                </div>
              </div>

              {/* Question */}
              <h3 style={styles.questionText}>
                {QUESTIONS[currentStep].question}
              </h3>

              {/* Options */}
              <div style={styles.optionsGrid}>
                {QUESTIONS[currentStep].options.map((opt, index) => (
                  <button 
                    key={index} 
                    style={styles.optionBtn}
                    onClick={() => handleOptionSelect(opt.type,opt.isFormat)}
                  >
                    <span>{opt.text}</span>
                    <ArrowRight size={14} style={styles.optionIcon} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.resultContainer}>
              <div style={styles.resultBadge}>
                <Award size={24} color="#0a0b10" />
              </div>
              <p style={styles.resultSubtitle}>Your Olfactory Profile is</p>
              <h3 style={styles.resultTitle}>
  {result.category} • {
    selectedFormat === 'solid'
      ? 'Solid Perfume'
      : 'Extrait de Parfum'
  }
</h3>
              <p style={styles.resultDesc}>{result.description}</p>
              
              <div style={styles.recBox}>
                <p style={{fontSize: '0.75rem', letterSpacing: '0.1em', color: '#c5a880', textTransform: 'uppercase', marginBottom: '10px'}}>
                  Recommended Signature Scent:
                </p>
                <div style={styles.recProductCard}>
                  <img 
                    src={result.product.image} 
                    alt={result.product.name} 
                    style={styles.recImg}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                  <div style={styles.recInfo}>
                    <h4 style={styles.recName}>{result.product.name}</h4>
                    <p style={styles.recType}>
                      {result.product.type === 'solid' ? 'Solid Perfume' : 'Extrait de Parfum'} — {result.product.volume}
                    </p>
                    <button 
                      style={styles.viewBtn}
                      onClick={() => onSelectProduct(result.product)}
                    >
                      View Scent Details
                    </button>
                  </div>
                </div>
              </div>

              <button style={styles.resetBtn} onClick={handleReset}>
                <RefreshCw size={12} style={{marginRight: '8px'}} /> Retake Scent Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: {
  paddingTop: '10rem',
  paddingBottom: '6rem',
  minHeight: '100vh',
  backgroundColor: '#0a0b10',
  backgroundImage:
    'radial-gradient(circle at 50% 80%, rgba(252, 209, 22, 0.05) 0%, transparent 50%)',
},
  quizHeader: {
    textAlign: 'center',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    color: '#a0a0a5',
    maxWidth: '500px',
    margin: '0 auto',
    fontSize: '0.9rem',
  },
  cardContainer: {
    maxWidth: '650px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#121212',
    border: '1px solid rgba(197, 168, 128, 0.12)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
    '@media (max-width: 576px)': {
      padding: '25px',
    }
  },
  progressContainer: {
    marginBottom: '35px',
  },
  progressText: {
    fontSize: '0.72rem',
    color: '#a0a0a5',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '8px',
  },
  progressBarBg: {
    width: '100%',
    height: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#c5a880',
    transition: 'width 0.4s ease',
  },
  questionText: {
    fontFamily: "'Cinzel', serif",
    fontSize: '1.4rem',
    color: '#f5f5f7',
    marginBottom: '30px',
    letterSpacing: '0.03em',
    textAlign: 'left',
    lineHeight: '1.4',
  },
  optionsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  optionBtn: {
    background: 'rgba(26, 26, 26, 0.5)',
    border: '1px solid rgba(197, 168, 128, 0.15)',
    color: '#a0a0a5',
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '0.85rem',
    letterSpacing: '0.02em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    ':hover': {
      backgroundColor: 'rgba(197, 168, 128, 0.1)',
      borderColor: '#c5a880',
      color: '#f5f5f7',
      transform: 'translateX(5px)',
    }
  },
  optionIcon: {
    color: '#c5a880',
    opacity: 0.5,
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  resultBadge: {
    backgroundColor: '#fcd116',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  resultSubtitle: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#a0a0a5',
    marginBottom: '5px',
  },
  resultTitle: {
    fontSize: '2.2rem',
    color: '#fcd116', // brochure yellow
    marginBottom: '15px',
  },
  resultDesc: {
    fontSize: '0.9rem',
    color: '#a0a0a5',
    lineHeight: '1.6',
    maxWidth: '480px',
    marginBottom: '30px',
  },
  recBox: {
    backgroundColor: '#0a0b10',
    border: '1px solid rgba(88, 133, 165, 0.2)',
    padding: '20px',
    width: '100%',
    maxWidth: '480px',
    marginBottom: '30px',
    textAlign: 'left',
  },
  recProductCard: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      textAlign: 'center',
    }
  },
  recImg: {
    width: '80px',
    height: '100px',
    objectFit: 'contain',
    backgroundColor: '#121212',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  recInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '@media (max-width: 480px)': {
      alignItems: 'center',
    }
  },
  recName: {
    fontFamily: "'Cinzel', serif",
    fontSize: '1.1rem',
    color: '#f5f5f7',
    marginBottom: '4px',
  },
  recType: {
    fontSize: '0.75rem',
    color: '#a0a0a5',
    marginBottom: '10px',
  },
  viewBtn: {
    backgroundColor: '#c5a880',
    color: '#0a0b10',
    border: 'none',
    padding: '6px 15px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#dfc19b',
    }
  },
  resetBtn: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#a0a0a5',
    fontSize: '0.7rem',
    padding: '8px 18px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: '#c5a880',
      color: '#c5a880',
    }
  }
};
