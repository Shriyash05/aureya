import { useState } from 'react';
import { Plus, Edit, Trash2, FileText, ArrowLeft } from 'lucide-react';

export default function AdminDashboard({ 
  products, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct, 
  onUploadImage,
  inquiries, 
  onClearInquiries 
}) {
  const [activeSubTab, setActiveSubTab] = useState('fragrances'); // 'fragrances' or 'inquiries'
  const [editingProduct, setEditingProduct] = useState(null); // null means not editing/adding
  const [isNew, setIsNew] = useState(false); // true if adding a new perfume

  // Form State
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState('spray');
  const [formPrice, setFormPrice] = useState('');
  const [formVolume, setFormVolume] = useState('100ml');
  const [formDescription, setFormDescription] = useState('');
  const [formTag, setFormTag] = useState('Fresh');
  const [formTopNotes, setFormTopNotes] = useState('');
  const [formHeartNotes, setFormHeartNotes] = useState('');
  const [formBaseNotes, setFormBaseNotes] = useState('');
  const [formImage, setFormImage] = useState('/images/cosmic.jpeg');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Initializing Form for Edit or Create
  const handleStartAdd = () => {
    setIsNew(true);
    setEditingProduct({});
    setFormName('');
    setFormType('spray');
    setFormPrice('95');
    setFormVolume('100ml');
    setFormDescription('A luxurious scent designed to elevate your aura.');
    setFormTag('Fresh');
    setFormTopNotes('Lemon, Bergamot');
    setFormHeartNotes('Jasmine, Rose');
    setFormBaseNotes('Cedarwood, Musk');
    setFormImage('/images/cosmic.jpeg'); // Default mock
    setUploadStatus('');
  };

  const handleStartEdit = (product) => {
    setIsNew(false);
    setEditingProduct(product);
    setFormName(product.name);
    setFormType(product.type);
    setFormPrice(product.price.toString());
    setFormVolume(product.volume);
    setFormDescription(product.description);
    setFormTag(product.tag);
    setFormTopNotes(product.notes?.top.join(', ') || '');
    setFormHeartNotes(product.notes?.heart.join(', ') || '');
    setFormBaseNotes(product.notes?.base.join(', ') || '');
    setFormImage(product.image);
    setUploadStatus('');
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadStatus('Please choose an image file.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus('Uploading image...');
      const uploadedUrl = await onUploadImage(file);
      setFormImage(uploadedUrl);
      setUploadStatus('Image uploaded and ready to save.');
    } catch (error) {
      setUploadStatus(error.message || 'Image upload failed.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const productData = {
      name: formName,
      type: formType,
      price: parseFloat(formPrice) || 0,
      volume: formVolume,
      description: formDescription,
      tag: formTag,
      image: formImage,
      notes: {
        top: formTopNotes.split(',').map(n => n.trim()).filter(Boolean),
        heart: formHeartNotes.split(',').map(n => n.trim()).filter(Boolean),
        base: formBaseNotes.split(',').map(n => n.trim()).filter(Boolean),
      },
      concentration: formType === 'solid' ? 'Solid Balm' : 'Extrait de Parfum'
    };

    if (isNew) {
      // Create new ID
      const newId = Date.now().toString();
      onAddProduct({ ...productData, id: newId });
    } else {
      onUpdateProduct({ ...productData, id: editingProduct.id });
    }

    setEditingProduct(null);
  };

  // Pre-configured luxury images selector
  const mockImages = [
    { label: "Cosmic (Blue)", path: "/images/cosmic.jpeg" },
    { label: "Flawless (Green)", path: "/images/flawless.jpeg" },
    { label: "Forbidden Orchid (Purple)", path: "/images/forbidden orchid.jpeg" },
    { label: "Mi Amor (Red)", path: "/images/mi amor.jpeg" },
    { label: "Heaven's Garden (Floral)", path: "/images/heaven garden.jpeg" },
    { label: "Solid Perfumes Set", path: "/images/solid perfumes.png" },
    { label: "Solid Guide", path: "/images/solid perfume guide.png" },
    { label: "Vanillian Dream", path: "/images/vanillian dream.jpeg" },
  ];

  return (
    <div style={styles.dashboardSection} className="section">
      <div className="container">
        
        {/* Dashboard Header */}
        <div style={styles.dashHeader}>
          <div>
            <span style={styles.badge}>Security Access Granted</span>
            <h2 style={styles.title}>AUREYA Administrative Hub</h2>
          </div>

          <div style={styles.subTabRow}>
            <button 
              style={{
                ...styles.subTabBtn,
                color: activeSubTab === 'fragrances' ? '#c5a880' : '#a0a0a5',
                borderBottom: activeSubTab === 'fragrances' ? '2px solid #c5a880' : '2px solid transparent'
              }}
              onClick={() => {
                setActiveSubTab('fragrances');
                setEditingProduct(null);
              }}
            >
              Manage Fragrances
            </button>
            <button 
              style={{
                ...styles.subTabBtn,
                color: activeSubTab === 'inquiries' ? '#c5a880' : '#a0a0a5',
                borderBottom: activeSubTab === 'inquiries' ? '2px solid #c5a880' : '2px solid transparent'
              }}
              onClick={() => {
                setActiveSubTab('inquiries');
                setEditingProduct(null);
              }}
            >
              Inquiries ({inquiries.length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        {editingProduct ? (
          /* Form for Add/Edit */
          <div style={styles.formContainer} className="glass animate-fade-in">
            <div style={styles.formTitleRow}>
              <button style={styles.backBtn} onClick={() => setEditingProduct(null)}>
                <ArrowLeft size={16} /> Back to Dashboard
              </button>
              <h3 style={styles.formTitle}>{isNew ? "Add New Fragrance" : `Edit Scent: ${editingProduct.name}`}</h3>
            </div>

            <form onSubmit={handleSave} style={styles.form}>
              <div style={styles.formGrid}>
                {/* Column 1 */}
                <div style={styles.formCol}>
                  <div style={styles.inputGroup}>
                    <label>Scent Name</label>
                    <input 
                      type="text" 
                      value={formName} 
                      onChange={(e) => setFormName(e.target.value)} 
                      placeholder="e.g., Mystic Sandal" 
                      required 
                    />
                  </div>

                  <div style={styles.inputGroupRow}>
                    <div style={{...styles.inputGroup, flex: 1}}>
                      <label>Type</label>
                      <select value={formType} onChange={(e) => {
                        setFormType(e.target.value);
                        setFormVolume(e.target.value === 'solid' ? '15g' : '100ml');
                      }}>
                        <option value="spray">Extrait de Parfum (Spray)</option>
                        <option value="solid">Solid Balm (Perfume)</option>
                      </select>
                    </div>

                    <div style={{...styles.inputGroup, flex: 1}}>
                      <label>Volume</label>
                      <input 
                        type="text" 
                        value={formVolume} 
                        onChange={(e) => setFormVolume(e.target.value)} 
                        placeholder="e.g., 100ml or 15g" 
                        required 
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroupRow}>
                    <div style={{...styles.inputGroup, flex: 1}}>
                      <label>Price (₹)</label>
                      <input 
                        type="number" 
                        value={formPrice} 
                        onChange={(e) => setFormPrice(e.target.value)} 
                        placeholder="e.g., 7999" 
                        required 
                      />
                    </div>

                    <div style={{...styles.inputGroup, flex: 1}}>
                      <label>Scent Tag</label>
                      <select value={formTag} onChange={(e) => setFormTag(e.target.value)}>
                        <option value="Fresh">Fresh</option>
                        <option value="Floral">Floral</option>
                        <option value="Woody">Woody</option>
                        <option value="Sweet">Sweet</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label>Description</label>
                    <textarea 
                      value={formDescription} 
                      onChange={(e) => setFormDescription(e.target.value)} 
                      rows={4}
                      placeholder="Write a sensory description of the perfume..."
                      required
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div style={styles.formCol}>
                  <div style={styles.inputGroup}>
                    <label>Top Notes (Comma separated)</label>
                    <input 
                      type="text" 
                      value={formTopNotes} 
                      onChange={(e) => setFormTopNotes(e.target.value)} 
                      placeholder="e.g., Apple, Plum, Lemon" 
                      required 
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label>Heart Notes (Comma separated)</label>
                    <input 
                      type="text" 
                      value={formHeartNotes} 
                      onChange={(e) => setFormHeartNotes(e.target.value)} 
                      placeholder="e.g., Orange Blossom, Jasmine" 
                      required 
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label>Base Notes (Comma separated)</label>
                    <input 
                      type="text" 
                      value={formBaseNotes} 
                      onChange={(e) => setFormBaseNotes(e.target.value)} 
                      placeholder="e.g., Musk, Amber, Sandalwood" 
                      required 
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label>Select Product Image Asset</label>
                    <select value={formImage} onChange={(e) => setFormImage(e.target.value)}>
                      {mockImages.map((img, idx) => (
                        <option key={idx} value={img.path}>{img.label}</option>
                      ))}
                    </select>

                    <label style={styles.uploadLabel}>
                      Upload New Product Image
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        style={styles.fileInput}
                      />
                    </label>
                    {uploadStatus && (
                      <span style={{
                        ...styles.uploadStatus,
                        color: uploadStatus.includes('failed') || uploadStatus.includes('Please') ? '#dd4b39' : '#88b04b',
                      }}>
                        {uploadStatus}
                      </span>
                    )}
                    
                    <div style={styles.imagePreviewContainer}>
                      <img src={formImage} alt="Preview" style={styles.previewImage} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.formActions}>
                <button type="button" style={styles.cancelBtn} onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={styles.saveBtn} disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Save Fragrance'}
                </button>
              </div>
            </form>
          </div>
        ) : activeSubTab === 'fragrances' ? (
          /* List of Fragrances */
          <div style={styles.listContainer}>
            <div style={styles.listBar}>
              <h3 style={styles.subtitle}>Current Fragrance Catalog</h3>
              <button className="btn btn-primary" style={styles.addBtn} onClick={handleStartAdd}>
                <Plus size={16} style={{marginRight: '8px'}} /> Add New Scent
              </button>
            </div>

            <div style={styles.tableWrapper} className="glass">
              <table style={styles.table}>
                <thead>
                  <tr style={styles.trHead}>
                    <th style={styles.th}>Image</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Volume</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Tag</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={styles.trBody}>
                      <td style={styles.td}>
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          style={styles.thumbnail}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=80&q=80';
                          }}
                        />
                      </td>
                      <td style={{...styles.td, fontWeight: '500'}}>{p.name}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.tdType,
                          color: p.type === 'solid' ? '#fcd116' : '#5885a5'
                        }}>
                          {p.type === 'solid' ? 'Solid' : 'Extrait'}
                        </span>
                      </td>
                      <td style={styles.td}>{p.volume}</td>
                      <td style={{...styles.td, color: '#fcd116'}}>₹{parseInt(p.price).toLocaleString('en-IN')}</td>
                      <td style={styles.td}>
                        <span style={styles.tdTag}>{p.tag}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.rowActions}>
                          <button 
                            style={styles.editBtn} 
                            onClick={() => handleStartEdit(p)}
                            title="Edit Scent"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            style={styles.deleteBtn} 
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${p.name}?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            title="Delete Scent"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* List of Inquiries */
          <div style={styles.listContainer}>
            <div style={styles.listBar}>
              <h3 style={styles.subtitle}>Customer Submissions & Newsletter Signups</h3>
              {inquiries.length > 0 && (
                <button className="btn btn-secondary" style={styles.clearBtn} onClick={onClearInquiries}>
                  Clear All Logs
                </button>
              )}
            </div>

            {inquiries.length === 0 ? (
              <div style={styles.emptyContainer} className="glass">
                <FileText size={40} color="rgba(197, 168, 128, 0.2)" style={{marginBottom: '10px'}} />
                <p style={{color: '#a0a0a5'}}>No inquiries or subscriptions received yet.</p>
              </div>
            ) : (
              <div style={styles.inquiriesGrid}>
                {inquiries.map((inq, idx) => (
                  <div key={idx} style={styles.inqCard} className="glass">
                    <div style={styles.inqHeader}>
                      <span style={{
                        ...styles.inqTypeBadge,
                        backgroundColor: inq.type === 'Newsletter' ? 'rgba(88, 133, 165, 0.15)' : 'rgba(252, 209, 22, 0.15)',
                        color: inq.type === 'Newsletter' ? '#5885a5' : '#fcd116',
                      }}>
                        {inq.type}
                      </span>
                      <span style={styles.inqDate}>{new Date(inq.timestamp).toLocaleString()}</span>
                    </div>

                    <div style={styles.inqBody}>
                      {inq.name && <p style={styles.inqField}><strong>Name:</strong> {inq.name}</p>}
                      <p style={styles.inqField}><strong>Email / Phone:</strong> {inq.email}</p>
                      {inq.message && <p style={{...styles.inqField, marginTop: '8px'}}><strong>Message:</strong> {inq.message}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  dashboardSection: {
    backgroundColor: '#07070a',
    minHeight: '80vh',
    paddingTop: '120px',
  },
  dashHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
    paddingBottom: '20px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  badge: {
    fontSize: '0.62rem',
    color: '#88b04b',
    border: '1px solid rgba(136, 176, 75, 0.3)',
    backgroundColor: 'rgba(136, 176, 75, 0.1)',
    padding: '3px 8px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    display: 'inline-block',
    marginBottom: '8px',
  },
  title: {
    textAlign: 'left',
    margin: 0,
    fontSize: '1.8rem',
    '::after': {
      display: 'none',
    }
  },
  subTabRow: {
    display: 'flex',
    gap: '25px',
  },
  subTabBtn: {
    background: 'none',
    border: 'none',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.8rem',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    padding: '8px 4px',
    transition: 'all 0.2s ease',
  },
  listContainer: {
    width: '100%',
  },
  listBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: '1.1rem',
    color: '#f5f5f7',
    margin: 0,
    letterSpacing: '0.05em',
    '::after': {
      display: 'none',
    }
  },
  addBtn: {
    padding: '10px 20px',
    fontSize: '0.7rem',
  },
  clearBtn: {
    padding: '8px 16px',
    fontSize: '0.65rem',
    color: '#dd4b39',
    borderColor: 'rgba(221, 75, 57, 0.3)',
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
    border: '1px solid rgba(197, 168, 128, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.82rem',
  },
  trHead: {
    borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
    backgroundColor: '#0e0e12',
  },
  th: {
    padding: '16px 20px',
    color: '#c5a880',
    fontFamily: "'Cinzel', serif",
    fontWeight: '500',
    fontSize: '0.78rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  trBody: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.01)',
    }
  },
  td: {
    padding: '16px 20px',
    color: '#a0a0a5',
    verticalAlign: 'middle',
  },
  tdType: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '500',
  },
  tdTag: {
    fontSize: '0.7rem',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '2px 6px',
  },
  thumbnail: {
    width: '45px',
    height: '55px',
    objectFit: 'contain',
    backgroundColor: '#181818',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  rowActions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    background: 'none',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    color: '#c5a880',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(197, 168, 128, 0.1)',
      borderColor: '#c5a880',
    }
  },
  deleteBtn: {
    background: 'none',
    border: '1px solid rgba(221, 75, 57, 0.3)',
    color: '#dd4b39',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(221, 75, 57, 0.1)',
      borderColor: '#dd4b39',
    }
  },
  formContainer: {
    width: '100%',
    padding: '35px',
    backgroundColor: '#121212',
    border: '1px solid rgba(197, 168, 128, 0.15)',
  },
  formTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '15px',
    marginBottom: '25px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#c5a880',
    fontSize: '0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  formTitle: {
    margin: 0,
    fontSize: '1.2rem',
    '::after': {
      display: 'none',
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  inputGroupRow: {
    display: 'flex',
    gap: '15px',
  },
  imagePreviewContainer: {
    marginTop: '12px',
    border: '1px solid rgba(197, 168, 128, 0.1)',
    width: '120px',
    height: '150px',
    backgroundColor: '#0d0e12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  uploadLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '12px',
  },
  fileInput: {
    color: '#a0a0a5',
    border: '1px solid rgba(197, 168, 128, 0.12)',
    padding: '10px',
    backgroundColor: '#0d0e12',
  },
  uploadStatus: {
    fontSize: '0.75rem',
    marginTop: '8px',
  },
  formActions: {
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
  },
  cancelBtn: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#a0a0a5',
    padding: '12px 28px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontSize: '0.75rem',
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '12px 28px',
  },
  emptyContainer: {
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1px solid rgba(197, 168, 128, 0.08)',
  },
  inquiriesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  },
  inqCard: {
    backgroundColor: '#121212',
    border: '1px solid rgba(197, 168, 128, 0.1)',
    padding: '24px',
    textAlign: 'left',
  },
  inqHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  inqTypeBadge: {
    fontSize: '0.62rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '3px 8px',
    fontWeight: '500',
  },
  inqDate: {
    fontSize: '0.7rem',
    color: '#6b6b72',
  },
  inqBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  inqField: {
    fontSize: '0.8rem',
    color: '#a0a0a5',
    margin: 0,
  }
};
