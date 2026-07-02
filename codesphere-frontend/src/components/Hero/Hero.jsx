// import { useState, useEffect } from 'react';
// import { FiArrowRight, FiPlay } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Hero.css';

// const DEFAULT = {
//     badge: 'Now accepting new projects',
//     heading: 'We Build',
//     typedWords: ['Web Applications', 'E-commerce Stores', 'SaaS Platforms', 'Custom Software', 'Digital Solutions'],
//     subtext: 'AMANAH IT delivers modern MERN Stack web applications, e-commerce platforms, and custom software solutions for businesses across Bangladesh and beyond.',
//     stats: [
//         { number: '50+', label: 'Happy Clients' },
//         { number: '120+', label: 'Projects Done' },
//         { number: '8+', label: 'Years Exp.' },
//         { number: '24/7', label: 'Support' },
//     ],
// };

// export default function Hero() {
//     const [data, setData] = useState(DEFAULT);
//     const [typed, setTyped] = useState('');
//     const [wi, setWi] = useState(0);
//     const [del, setDel] = useState(false);

//     useEffect(() => {
//         api.get('/hero').then(r => setData({ ...DEFAULT, ...r.data })).catch(() => { });
//     }, []);

//     useEffect(() => {
//         const words = data.typedWords || DEFAULT.typedWords;
//         const word = words[wi % words.length];
//         let timeout;
//         if (!del) {
//             if (typed.length < word.length) {
//                 timeout = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80);
//             } else {
//                 timeout = setTimeout(() => setDel(true), 1800);
//             }
//         } else {
//             if (typed.length > 0) {
//                 timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
//             } else {
//                 setDel(false);
//                 setWi(w => w + 1);
//             }
//         }
//         return () => clearTimeout(timeout);
//     }, [typed, del, wi, data.typedWords]);

//     return (
//         <section className="hero" id="hero">
//             <div className="hero-bg">
//                 <div className="hero-blob hero-blob-1" />
//                 <div className="hero-blob hero-blob-2" />
//                 <div className="hero-grid" />
//             </div>

//             <div className="container hero-content">
//                 <div className="hero-left">

//                     <div className="hero-badge">
//                         <span className="badge-dot" />
//                         {data.badge}
//                     </div>

//                     <h1 className="hero-h1">
//                         {data.heading}<br />
//                         <span className="hero-typed">
//                             {typed}<span className="hero-cursor" />
//                         </span>
//                     </h1>

//                     <p className="hero-sub">{data.subtext}</p>

//                     <div className="hero-ctas">
//                         <a href="#contact" className="btn btn-primary hero-btn-primary">
//                             Start a Project <FiArrowRight />
//                         </a>
//                         <a href="#portfolio" className="btn btn-outline hero-btn-outline">
//                             <FiPlay size={14} /> View Our Work
//                         </a>
//                     </div>

//                     <div className="hero-tags">
//                         {['React', 'Node.js', 'MongoDB', 'Express', 'Next.js', 'TypeScript'].map(t => (
//                             <span key={t} className="hero-tag">{t}</span>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="hero-right">
//                     <div className="hero-card animate-float">
//                         <div className="hero-card-header">
//                             <div className="card-dot green" />
//                             <div className="card-dot yellow" />
//                             <div className="card-dot red" />
//                             <span>Live Dashboard</span>
//                         </div>
//                         <div className="hero-metrics">
//                             <div className="metric-box">
//                                 <div className="metric-num">120+</div>
//                                 <div className="metric-lbl">Projects</div>
//                             </div>
//                             <div className="metric-box">
//                                 <div className="metric-num">98%</div>
//                                 <div className="metric-lbl">Satisfaction</div>
//                             </div>
//                         </div>
//                         <div className="hero-bars">
//                             {[
//                                 { label: 'Web Dev', pct: 95, color: 'linear-gradient(90deg,#2563eb,#22c55e)' },
//                                 { label: 'UI/UX', pct: 88, color: 'linear-gradient(90deg,#2563eb,#16a34a)' },
//                                 { label: 'Marketing', pct: 80, color: 'linear-gradient(90deg,#3b82f6,#22c55e)' },
//                             ].map(b => (
//                                 <div key={b.label} className="bar-row">
//                                     <div className="bar-meta">
//                                         <span>{b.label}</span><span>{b.pct}%</span>
//                                     </div>
//                                     <div className="bar-track">
//                                         <div className="bar-fill" style={{ width: `${b.pct}%`, background: b.color }} />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="hero-avatars">
//                             {['SK', 'AR', 'MR', 'TN'].map((a, i) => (
//                                 <div key={a} className="avatar" style={{ zIndex: 4 - i }}>
//                                     {a}
//                                 </div>
//                             ))}
//                             <span className="avatar-text">Our expert team</span>
//                         </div>
//                     </div>

//                     <div className="float-badge fb-1">✅ Trusted by 50+ clients</div>
//                     <div className="float-badge fb-2">⭐ 4.9 avg rating</div>
//                 </div>
//             </div>

//             <div className="hero-statsbar">
//                 <div className="container">
//                     <div className="statsbar-inner">
//                         {(data.stats || DEFAULT.stats).map((s, i) => (
//                             <div key={i} className="stat-block">
//                                 <div className="stat-num">{s.number}</div>
//                                 <div className="stat-lbl">{s.label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
// import { useState, useEffect, useRef } from 'react';
// import { FiArrowRight, FiPlay, FiCode, FiShoppingCart, FiLayout, FiPenTool, FiFilm, FiCloud } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Hero.css';

// const DEFAULT = {
//     badge: 'Now accepting new projects',
//     heading: 'We Build',
//     typedWords: ['Web Applications', 'E-commerce Stores', 'SaaS Platforms', 'Custom Software', 'Digital Solutions'],
//     subtext: 'It takes years to build a reputation, and only one bad system to damage it. AMANAH IT delivers secure, modern MERN Stack solutions built for trust and growth.',
// };

// const STRIP_ITEMS = [
//     { num: '01', label: 'Web Development', icon: FiCode },
//     { num: '02', label: 'E-commerce', icon: FiShoppingCart },
//     { num: '03', label: 'UI/UX Design', icon: FiLayout },
//     { num: '04', label: 'Graphic Design', icon: FiPenTool },
//     { num: '05', label: 'Animation', icon: FiFilm },
//     { num: '06', label: 'Cloud & DevOps', icon: FiCloud },
// ];

// export default function Hero() {
//     const [data, setData] = useState(DEFAULT);
//     const [typed, setTyped] = useState('');
//     const [wi, setWi] = useState(0);
//     const [del, setDel] = useState(false);
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         api.get('/hero').then(r => setData({ ...DEFAULT, ...r.data })).catch(() => { });
//     }, []);

//     useEffect(() => {
//         const words = data.typedWords || DEFAULT.typedWords;
//         const word = words[wi % words.length];
//         let timeout;
//         if (!del) {
//             if (typed.length < word.length) {
//                 timeout = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80);
//             } else {
//                 timeout = setTimeout(() => setDel(true), 1800);
//             }
//         } else {
//             if (typed.length > 0) {
//                 timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
//             } else {
//                 setDel(false);
//                 setWi(w => w + 1);
//             }
//         }
//         return () => clearTimeout(timeout);
//     }, [typed, del, wi, data.typedWords]);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         let width, height, particles, animId;

//         const resize = () => {
//             width = canvas.offsetWidth;
//             height = canvas.offsetHeight;
//             canvas.width = width;
//             canvas.height = height;
//         };

//         const initParticles = () => {
//             const count = Math.min(60, Math.floor((width * height) / 18000));
//             particles = Array.from({ length: count }, () => ({
//                 x: Math.random() * width,
//                 y: Math.random() * height,
//                 vx: (Math.random() - 0.5) * 0.3,
//                 vy: (Math.random() - 0.5) * 0.3,
//             }));
//         };

//         const draw = () => {
//             ctx.clearRect(0, 0, width, height);
//             particles.forEach(p => {
//                 p.x += p.vx;
//                 p.y += p.vy;
//                 if (p.x < 0 || p.x > width) p.vx *= -1;
//                 if (p.y < 0 || p.y > height) p.vy *= -1;
//             });
//             for (let i = 0; i < particles.length; i++) {
//                 for (let j = i + 1; j < particles.length; j++) {
//                     const a = particles[i], b = particles[j];
//                     const dist = Math.hypot(a.x - b.x, a.y - b.y);
//                     if (dist < 140) {
//                         ctx.strokeStyle = `rgba(34,197,94,${(1 - dist / 140) * 0.25})`;
//                         ctx.lineWidth = 1;
//                         ctx.beginPath();
//                         ctx.moveTo(a.x, a.y);
//                         ctx.lineTo(b.x, b.y);
//                         ctx.stroke();
//                     }
//                 }
//             }
//             particles.forEach(p => {
//                 ctx.fillStyle = 'rgba(255,255,255,0.6)';
//                 ctx.beginPath();
//                 ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
//                 ctx.fill();
//             });
//             animId = requestAnimationFrame(draw);
//         };

//         resize();
//         initParticles();
//         draw();

//         const onResize = () => { resize(); initParticles(); };
//         window.addEventListener('resize', onResize);
//         return () => {
//             cancelAnimationFrame(animId);
//             window.removeEventListener('resize', onResize);
//         };
//     }, []);

//     return (
//         <section className="hero" id="hero">
//             <canvas ref={canvasRef} className="hero-canvas" />
//             <div className="hero-glow hero-glow-1" />
//             <div className="hero-glow hero-glow-2" />

//             <div className="container hero-content">
//                 <div className="hero-badge">
//                     <span className="badge-dot" />
//                     {data.badge}
//                 </div>

//                 <h1 className="hero-h1">
//                     {data.heading}<br />
//                     <span className="hero-typed">
//                         {typed}<span className="hero-cursor" />
//                     </span>
//                 </h1>

//                 <p className="hero-sub">{data.subtext}</p>

//                 <div className="hero-trust">
//                     <span className="hero-trust-label">Built With</span>
//                     <div className="hero-trust-tags">
//                         {['React', 'Node.js', 'MongoDB', 'Express'].map(t => (
//                             <span key={t} className="hero-trust-tag">{t}</span>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="hero-ctas">
//                     <a href="#contact" className="btn btn-primary hero-btn-primary">
//                         What We Serve <FiArrowRight />
//                     </a>
//                     <a href="#portfolio" className="btn btn-outline-dark hero-btn-outline">
//                         <FiPlay size={14} /> Learn More
//                     </a>
//                 </div>
//             </div>

//             <div className="hero-strip">
//                 <div className="container hero-strip-inner">
//                     {STRIP_ITEMS.map((item, i) => {
//                         const Icon = item.icon;
//                         return (
//                             <div key={item.label} className="strip-item">
//                                 <Icon size={26} className="strip-icon" />
//                                 <div className="strip-text">
//                                     <span className="strip-num">{item.num} <span className="strip-line" /></span>
//                                     <span className="strip-label">{item.label}</span>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
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

                <div className="hero-trust">
                    <span className="hero-trust-label">Built With</span>
                    <div className="hero-trust-tags">
                        {['React', 'Node.js', 'MongoDB', 'Express'].map(t => (
                            <span key={t} className="hero-trust-tag">{t}</span>
                        ))}
                    </div>
                </div>

                <div className="hero-ctas">
                    <Link to="/services/web-application-development" className="btn btn-primary hero-btn-primary">
                        What We Serve <FiArrowRight />
                    </Link>
                    <Link to="/explore-us" className="btn btn-outline-dark hero-btn-outline">
                        <FiPlay size={14} /> Learn More
                    </Link>
                </div>
            </div>

            {/* <div className="hero-strip">
                <div className="container hero-strip-inner">
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
            </div> */}
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