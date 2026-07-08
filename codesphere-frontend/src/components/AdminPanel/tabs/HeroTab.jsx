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
// }
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay, FiCode, FiShoppingCart, FiLayout, FiPenTool, FiFilm, FiCloud, FiSmartphone, FiTrendingUp, FiServer } from 'react-icons/fi';
import api from '../../utils/api';
import './Hero.css';

const ICONS = { FiCode, FiShoppingCart, FiLayout, FiPenTool, FiFilm, FiCloud, FiSmartphone, FiTrendingUp, FiServer };

const DEFAULT = {
    badge: 'Now accepting new projects',
    heading: 'We Build',
    typedWords: ['Web Applications', 'E-commerce Stores', 'SaaS Platforms', 'Custom Software', 'Digital Solutions'],
    subtext: 'It takes years to build a reputation, and only one bad system to damage it. AMANAH IT delivers secure, modern MERN Stack solutions built for trust and growth.',
    primaryBtn: 'What We Serve',
    primaryBtnLink: '/services/web-application-development',
    secondaryBtn: 'Learn More',
    secondaryBtnLink: '/explore-us',
};

const FALLBACK_SERVICES = [
    { _id: '1', title: 'Web Development', icon: 'FiCode' },
    { _id: '2', title: 'E-commerce', icon: 'FiShoppingCart' },
    { _id: '3', title: 'UI/UX Design', icon: 'FiLayout' },
    { _id: '4', title: 'Graphic Design', icon: 'FiPenTool' },
    { _id: '5', title: 'Animation', icon: 'FiFilm' },
    { _id: '6', title: 'Cloud & DevOps', icon: 'FiCloud' },
];

export default function Hero() {
    const [data, setData] = useState(DEFAULT);
    const [services, setServices] = useState(FALLBACK_SERVICES);
    const [typed, setTyped] = useState('');
    const [wi, setWi] = useState(0);
    const [del, setDel] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        api.get('/hero').then(r => setData({ ...DEFAULT, ...r.data })).catch(() => { });
        api.get('/services').then(r => { if (r.data.length) setServices(r.data.slice(0, 6)); }).catch(() => { });
    }, []);

    useEffect(() => {
        const words = data.typedWords || DEFAULT.typedWords;
        const word = words[wi % words.length];
        let timeout;
        if (!del) {
            if (typed.length < word.length) {
                timeout = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80);
            } else {
                timeout = setTimeout(() => setDel(true), 1800);
            }
        } else {
            if (typed.length > 0) {
                timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
            } else {
                setDel(false);
                setWi(w => w + 1);
            }
        }
        return () => clearTimeout(timeout);
    }, [typed, del, wi, data.typedWords]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height, particles, animId;

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const initParticles = () => {
            const count = Math.min(140, Math.floor((width * height) / 7000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1.1,
                vy: (Math.random() - 0.5) * 1.1,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist < 130) {
                        ctx.strokeStyle = `rgba(74,222,128,${(1 - dist / 130) * 0.55})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            particles.forEach(p => {
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };

        resize();
        initParticles();
        draw();

        const onResize = () => { resize(); initParticles(); };
        window.addEventListener('resize', onResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <section className="hero" id="hero">
            <canvas ref={canvasRef} className="hero-canvas" />
            <div className="hero-glow hero-glow-1" />
            <div className="hero-glow hero-glow-2" />

            <div className="container hero-content">
                <div className="hero-badge">
                    <span className="badge-dot" />
                    {data.badge}
                </div>

                <h1 className="hero-h1">
                    {data.heading}<br />
                    <span className="hero-typed">
                        {typed}<span className="hero-cursor" />
                    </span>
                </h1>

                <p className="hero-sub">{data.subtext}</p>

                <div className="hero-ctas">
                    <Link to={data.primaryBtnLink || DEFAULT.primaryBtnLink} className="btn btn-primary hero-btn-primary">
                        {data.primaryBtn || DEFAULT.primaryBtn} <FiArrowRight />
                    </Link>
                    <Link to={data.secondaryBtnLink || DEFAULT.secondaryBtnLink} className="btn btn-outline-dark hero-btn-outline">
                        <FiPlay size={14} /> {data.secondaryBtn || DEFAULT.secondaryBtn}
                    </Link>
                </div>
            </div>

            <div className="hero-strip">
                <div className="hero-strip-box">
                    <div className="hero-strip-inner">
                        {services.map((item, i) => {
                            const Icon = ICONS[item.icon] || FiCode;
                            return (
                                <div key={item._id || item.title} className="strip-item">
                                    <Icon size={26} className="strip-icon" />
                                    <div className="strip-text">
                                        <span className="strip-num">{String(i + 1).padStart(2, '0')} <span className="strip-line" /></span>
                                        <span className="strip-label">{item.title}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}