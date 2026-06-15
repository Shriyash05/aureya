import { useState } from 'react';
import { X, Lock, User } from 'lucide-react';

export default function AdminLogin({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      if (res.ok && data.token) {
        onLoginSuccess(data.token);
        setError('');
        setUsername('');
        setPassword('');
        onClose();
      } else {
        setError(data.error || 'Invalid credentials. Try admin / aureya2026');
      }
    } catch {
      setError('Connection to auth server failed.');
    }
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()} className="glass animate-fade-in">
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleRow}>
            <Lock size={18} color="#c5a880" />
            <h3 style={styles.title}>Admin Portal</h3>
          </div>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Close portal">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <User size={16} style={styles.inputIcon} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock size={16} style={styles.inputIcon} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitBtn}>
            Authorize access
          </button>
        </form>
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
    backgroundColor: 'rgba(5, 5, 5, 0.75)',
    backdropFilter: 'blur(6px)',
    zIndex: 2200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#121212',
    border: '1px solid rgba(197, 168, 128, 0.15)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
    position: 'relative',
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: '0.95rem',
    color: '#f5f5f7',
    letterSpacing: '0.05em',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#a0a0a5',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  errorBox: {
    backgroundColor: 'rgba(221, 75, 57, 0.1)',
    border: '1px solid rgba(221, 75, 57, 0.3)',
    color: '#dd4b39',
    fontSize: '0.75rem',
    padding: '10px 12px',
    textAlign: 'center',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.68rem',
    color: '#c5a880',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    color: '#6b6b72',
  },
  input: {
    paddingLeft: '38px',
  },
  submitBtn: {
    width: '100%',
    height: '42px',
    marginTop: '10px',
  }
};
