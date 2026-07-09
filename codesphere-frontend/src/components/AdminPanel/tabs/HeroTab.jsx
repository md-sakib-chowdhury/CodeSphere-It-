// import { useState, useEffect } from 'react';
// import { FiSave, FiPlus, FiX } from 'react-icons/fi';
// import { toast } from 'react-toastify';
// import api from '../../../utils/api';

// export default function HeroTab() {
//     const [data, setData] = useState({
//         badge: '', heading: '', subtext: '', typedWords: [], stats: []
//     });
//     const [wordInput, setWordInput] = useState('');
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         api.get('/hero').then(r => setData(r.data)).catch(() => { });
//     }, []);

//     const addWord = () => {
//         if (!wordInput.trim()) return;
//         setData({ ...data, typedWords: [...(data.typedWords || []), wordInput.trim()] });
//         setWordInput('');
//     };

//     const removeWord = (idx) => {
//         setData({ ...data, typedWords: data.typedWords.filter((_, i) => i !== idx) });
//     };

//     const updateStat = (idx, field, value) => {
//         const stats = [...data.stats];
//         stats[idx][field] = value;
//         setData({ ...data, stats });
//     };

//     const handleSave = async () => {
//         setSaving(true);
//         try {
//             await api.put('/hero', data);
//             toast.success('Hero section updated!');
//         } catch {
//             toast.error('Failed to update hero section');
//         } finally {
//             setSaving(false);
//         }
//     };

//     return (
//         <div>
//             <div className="admin-page-header">
//                 <div>
//                     <h2>Hero Section</h2>
//                     <p>Edit your homepage hero banner content and animated text.</p>
//                 </div>
//                 <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
//                     <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
//                 </button>
//             </div>

//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <div className="admin-form-group">
//                     <label>Badge Text</label>
//                     <input
//                         value={data.badge || ''}
//                         onChange={e => setData({ ...data, badge: e.target.value })}
//                         placeholder="Now accepting new projects"
//                     />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Heading (static part)</label>
//                     <input
//                         value={data.heading || ''}
//                         onChange={e => setData({ ...data, heading: e.target.value })}
//                         placeholder="We Build"
//                     />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Subtext</label>
//                     <textarea
//                         rows="3"
//                         value={data.subtext || ''}
//                         onChange={e => setData({ ...data, subtext: e.target.value })}
//                         placeholder="AMANAH IT delivers..."
//                     />
//                 </div>
//             </div>

//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
//                     Animated Typewriter Words
//                 </h3>
//                 <div className="admin-form-inline-edit" style={{ marginBottom: '0.75rem' }}>
//                     <input
//                         value={wordInput}
//                         onChange={e => setWordInput(e.target.value)}
//                         placeholder="e.g. SaaS Platforms"
//                         onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addWord())}
//                     />
//                     <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addWord}>
//                         <FiPlus size={14} /> Add
//                     </button>
//                 </div>
//                 <div className="admin-tags-input">
//                     {(data.typedWords || []).map((w, i) => (
//                         <span key={i} className="admin-tag-chip">
//                             {w}
//                             <button onClick={() => removeWord(i)}><FiX size={12} /></button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div className="admin-card">
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
//                     Stats Bar (bottom of hero)
//                 </h3>
//                 {(data.stats || []).map((s, i) => (
//                     <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem' }}>
//                         <div className="admin-form-group">
//                             <label>Number</label>
//                             <input value={s.number} onChange={e => updateStat(i, 'number', e.target.value)} />
//                         </div>
//                         <div className="admin-form-group">
//                             <label>Label</label>
//                             <input value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// // }
// import { useState, useEffect } from 'react';
// import { FiSave, FiPlus, FiX } from 'react-icons/fi';
// import { toast } from 'react-toastify';
// import api from '../../../utils/api';

// export default function HeroTab() {
//     const [data, setData] = useState({
//         badge: '', heading: '', subtext: '', typedWords: [], stats: [],
//         primaryBtn: '', primaryBtnLink: '', secondaryBtn: '', secondaryBtnLink: ''
//     });
//     const [wordInput, setWordInput] = useState('');
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         api.get('/hero').then(r => setData(r.data)).catch(() => { });
//     }, []);

//     const addWord = () => {
//         if (!wordInput.trim()) return;
//         setData({ ...data, typedWords: [...(data.typedWords || []), wordInput.trim()] });
//         setWordInput('');
//     };

//     const removeWord = (idx) => {
//         setData({ ...data, typedWords: data.typedWords.filter((_, i) => i !== idx) });
//     };

//     const updateStat = (idx, field, value) => {
//         const stats = [...data.stats];
//         stats[idx][field] = value;
//         setData({ ...data, stats });
//     };

//     const handleSave = async () => {
//         setSaving(true);
//         try {
//             await api.put('/hero', data);
//             toast.success('Hero section updated!');
//         } catch {
//             toast.error('Failed to update hero section');
//         } finally {
//             setSaving(false);
//         }
//     };

//     return (
//         <div>
//             <div className="admin-page-header">
//                 <div>
//                     <h2>Hero Section</h2>
//                     <p>Edit your homepage hero banner content and animated text.</p>
//                 </div>
//                 <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
//                     <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
//                 </button>
//             </div>

//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <div className="admin-form-group">
//                     <label>Badge Text</label>
//                     <input
//                         value={data.badge || ''}
//                         onChange={e => setData({ ...data, badge: e.target.value })}
//                         placeholder="Now accepting new projects"
//                     />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Heading (static part)</label>
//                     <input
//                         value={data.heading || ''}
//                         onChange={e => setData({ ...data, heading: e.target.value })}
//                         placeholder="We Build"
//                     />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Subtext</label>
//                     <textarea
//                         rows="3"
//                         value={data.subtext || ''}
//                         onChange={e => setData({ ...data, subtext: e.target.value })}
//                         placeholder="AMANAH IT delivers..."
//                     />
//                 </div>
//             </div>

//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
//                     Animated Typewriter Words
//                 </h3>
//                 <div className="admin-form-inline-edit" style={{ marginBottom: '0.75rem' }}>
//                     <input
//                         value={wordInput}
//                         onChange={e => setWordInput(e.target.value)}
//                         placeholder="e.g. SaaS Platforms"
//                         onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addWord())}
//                     />
//                     <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addWord}>
//                         <FiPlus size={14} /> Add
//                     </button>
//                 </div>
//                 <div className="admin-tags-input">
//                     {(data.typedWords || []).map((w, i) => (
//                         <span key={i} className="admin-tag-chip">
//                             {w}
//                             <button onClick={() => removeWord(i)}><FiX size={12} /></button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
//                     CTA Buttons
//                 </h3>
//                 <div className="admin-form-row">
//                     <div className="admin-form-group">
//                         <label>Primary Button Text</label>
//                         <input
//                             value={data.primaryBtn || ''}
//                             onChange={e => setData({ ...data, primaryBtn: e.target.value })}
//                             placeholder="What We Serve"
//                         />
//                     </div>
//                     <div className="admin-form-group">
//                         <label>Primary Button Link</label>
//                         <input
//                             value={data.primaryBtnLink || ''}
//                             onChange={e => setData({ ...data, primaryBtnLink: e.target.value })}
//                             placeholder="/services/web-application-development"
//                         />
//                     </div>
//                 </div>
//                 <div className="admin-form-row">
//                     <div className="admin-form-group">
//                         <label>Secondary Button Text</label>
//                         <input
//                             value={data.secondaryBtn || ''}
//                             onChange={e => setData({ ...data, secondaryBtn: e.target.value })}
//                             placeholder="Learn More"
//                         />
//                     </div>
//                     <div className="admin-form-group">
//                         <label>Secondary Button Link</label>
//                         <input
//                             value={data.secondaryBtnLink || ''}
//                             onChange={e => setData({ ...data, secondaryBtnLink: e.target.value })}
//                             placeholder="/explore-us"
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="admin-card">
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
//                     Stats Bar (bottom of hero)
//                 </h3>
//                 {(data.stats || []).map((s, i) => (
//                     <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem' }}>
//                         <div className="admin-form-group">
//                             <label>Number</label>
//                             <input value={s.number} onChange={e => updateStat(i, 'number', e.target.value)} />
//                         </div>
//                         <div className="admin-form-group">
//                             <label>Label</label>
//                             <input value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiX, FiUploadCloud } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

export default function HeroTab() {
    const [data, setData] = useState({
        badge: '', heading: '', subtext: '', typedWords: [], stats: [],
        primaryBtn: '', primaryBtnLink: '', secondaryBtn: '', secondaryBtnLink: '',
        backgroundType: 'particles', particleColor: '#4ade80', bgImage: '', bgOverlayOpacity: 0.6
    });
    const [wordInput, setWordInput] = useState('');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        api.get('/hero').then(r => setData(r.data)).catch(() => { });
    }, []);

    const addWord = () => {
        if (!wordInput.trim()) return;
        setData({ ...data, typedWords: [...(data.typedWords || []), wordInput.trim()] });
        setWordInput('');
    };

    const removeWord = (idx) => {
        setData({ ...data, typedWords: data.typedWords.filter((_, i) => i !== idx) });
    };

    const updateStat = (idx, field, value) => {
        const stats = [...data.stats];
        stats[idx][field] = value;
        setData({ ...data, stats });
    };

    // কম্পিউটার থেকে সরাসরি ইমেজ আপলোড — এটা নিজের সার্ভারে সেভ হয়, তাই স্থায়ী
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Shudhu image file upload kora jabe');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const res = await api.post('/upload', formData);
            setData(prev => ({ ...prev, bgImage: res.data.url }));
            toast.success('Image upload hoyeche!');
        } catch (err) {
            toast.error('Upload fail hoyeche, abar try koro');
        } finally {
            setUploading(false);
            e.target.value = ''; // same file abar select korar jonno reset
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/hero', data);
            toast.success('Hero section updated!');
        } catch {
            toast.error('Failed to update hero section');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Hero Section</h2>
                    <p>Edit your homepage hero banner content and animated text.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-form-group">
                    <label>Badge Text</label>
                    <input
                        value={data.badge || ''}
                        onChange={e => setData({ ...data, badge: e.target.value })}
                        placeholder="Now accepting new projects"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Heading (static part)</label>
                    <input
                        value={data.heading || ''}
                        onChange={e => setData({ ...data, heading: e.target.value })}
                        placeholder="We Build"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea
                        rows="3"
                        value={data.subtext || ''}
                        onChange={e => setData({ ...data, subtext: e.target.value })}
                        placeholder="AMANAH IT delivers..."
                    />
                </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Animated Typewriter Words
                </h3>
                <div className="admin-form-inline-edit" style={{ marginBottom: '0.75rem' }}>
                    <input
                        value={wordInput}
                        onChange={e => setWordInput(e.target.value)}
                        placeholder="e.g. SaaS Platforms"
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addWord())}
                    />
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addWord}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                <div className="admin-tags-input">
                    {(data.typedWords || []).map((w, i) => (
                        <span key={i} className="admin-tag-chip">
                            {w}
                            <button onClick={() => removeWord(i)}><FiX size={12} /></button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    CTA Buttons
                </h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Primary Button Text</label>
                        <input
                            value={data.primaryBtn || ''}
                            onChange={e => setData({ ...data, primaryBtn: e.target.value })}
                            placeholder="What We Serve"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Primary Button Link</label>
                        <input
                            value={data.primaryBtnLink || ''}
                            onChange={e => setData({ ...data, primaryBtnLink: e.target.value })}
                            placeholder="/services/web-application-development"
                        />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Secondary Button Text</label>
                        <input
                            value={data.secondaryBtn || ''}
                            onChange={e => setData({ ...data, secondaryBtn: e.target.value })}
                            placeholder="Learn More"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Secondary Button Link</label>
                        <input
                            value={data.secondaryBtnLink || ''}
                            onChange={e => setData({ ...data, secondaryBtnLink: e.target.value })}
                            placeholder="/explore-us"
                        />
                    </div>
                </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Background Style
                </h3>

                <div className="admin-form-group">
                    <label>Background Type</label>
                    <select
                        value={data.backgroundType || 'particles'}
                        onChange={e => setData({ ...data, backgroundType: e.target.value })}
                    >
                        <option value="particles">Particle Animation</option>
                        <option value="image">Background Image</option>
                    </select>
                </div>

                {data.backgroundType === 'image' ? (
                    <>
                        {/* মূল পদ্ধতি — কম্পিউটার থেকে সরাসরি আপলোড (নিজের সার্ভারে স্থায়ীভাবে সেভ হয়) */}
                        <div className="admin-form-group">
                            <label>Upload Image from Computer</label>
                            <label
                                htmlFor="hero-bg-upload"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    border: '1.5px dashed var(--gray-300, #d1d5db)',
                                    borderRadius: '8px',
                                    padding: '0.75rem 1rem',
                                    cursor: uploading ? 'not-allowed' : 'pointer',
                                    color: 'var(--gray-600, #4b5563)',
                                    fontSize: '0.9rem',
                                    opacity: uploading ? 0.6 : 1,
                                }}
                            >
                                <FiUploadCloud size={16} />
                                {uploading ? 'Uploading...' : 'Click to choose an image file'}
                            </label>
                            <input
                                id="hero-bg-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                                style={{ display: 'none' }}
                            />
                            <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', marginTop: '0.35rem' }}>
                                এভাবে আপলোড করা ইমেজ আপনার নিজের সার্ভারে স্থায়ীভাবে থাকবে।
                            </p>
                        </div>

                        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-500)', margin: '0.5rem 0' }}>
                            — অথবা বাইরের লিঙ্ক বসান (ঐচ্ছিক) —
                        </div>

                        {/* বিকল্প পদ্ধতি — সরাসরি URL বসানো */}
                        <div className="admin-form-group">
                            <label>Background Image URL</label>
                            <input
                                value={data.bgImage || ''}
                                onChange={e => setData({ ...data, bgImage: e.target.value })}
                                placeholder="https://your-image-link.jpg"
                            />
                        </div>

                        {data.bgImage && (
                            <img
                                src={data.bgImage}
                                alt="Background preview"
                                style={{ marginTop: '0.5rem', maxWidth: '100%', maxHeight: '160px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                        )}

                        <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                            <label>Dark Overlay Strength ({Math.round((data.bgOverlayOpacity ?? 0.6) * 100)}%)</label>
                            <input
                                type="range"
                                min="0"
                                max="0.9"
                                step="0.05"
                                value={data.bgOverlayOpacity ?? 0.6}
                                onChange={e => setData({ ...data, bgOverlayOpacity: parseFloat(e.target.value) })}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                                টেক্সট পড়তে সহজ করার জন্য ইমেজের উপর অন্ধকার লেয়ার — বেশি করলে ইমেজ ততই ঢাকা পড়বে।
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="admin-form-group">
                        <label>Particle & Line Color</label>
                        <input
                            type="color"
                            value={data.particleColor || '#4ade80'}
                            onChange={e => setData({ ...data, particleColor: e.target.value })}
                            style={{ width: '60px', height: '38px', padding: '2px', cursor: 'pointer' }}
                        />
                    </div>
                )}
            </div>

            
        </div>
    );
}