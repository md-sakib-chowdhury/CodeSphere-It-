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
import { useState, useEffect } from 'react';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import api from '../../utils/api';
import './Hero.css';

const DEFAULT = {
    badge: '⚡ WHY CHOOSE US',
    heading: 'IT Service BD-',
    typedWords: ['Skyrocket Your Business', 'Data Safety Expert', 'Business Automation', 'Custom Software'],
    subtext: 'We take responsibility for your data safety. AMANAH IT delivers modern MERN Stack web applications, IT infrastructure, and robust cybersecurity solutions for businesses across Bangladesh.',
    stats: [
        { number: '50+', label: 'Happy Clients' },
        { number: '120+', label: 'Projects Done' },
        { number: '8+', label: 'Years Exp.' },
        { number: '24/7', label: 'Support' },
    ],
};

// Goinnovior স্টাইলের ৪টি কোর হাইলাইট মডিউল ডাটা
const GOINNOVIOR_HIGHLIGHTS = [
    { id: '01', title: 'IT Infrastructure' },
    { id: '02', title: 'CyberSecurity' },
    { id: '03', title: 'Business Automation' },
    { id: '04', title: 'IT Consultancy' }
];

export default function Hero() {
    const [data, setData] = useState(DEFAULT);
    const [typed, setTyped] = useState('');
    const [wi, setWi] = useState(0);
    const [del, setDel] = useState(false);

    useEffect(() => {
        api.get('/hero').then(r => setData({ ...DEFAULT, ...r.data })).catch(() => { });
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

    return (
        <section className="hero" id="hero">
            <div className="hero-bg">
                <div className="hero-blob hero-blob-1" />
                <div className="hero-blob hero-blob-2" />
                <div className="hero-grid" />
            </div>

            <div className="container hero-content">
                <div className="hero-left">
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
                        <a href="#contact" className="btn btn-primary hero-btn-primary">
                            Request Consultation <FiArrowRight />
                        </a>
                        <a href="#portfolio" className="btn btn-outline hero-btn-outline">
                            <FiPlay size={14} /> View Our Work
                        </a>
                    </div>

                    <div className="hero-tags">
                        {['React', 'Node.js', 'MongoDB', 'Cybersecurity', 'Infrastructure', 'DevOps'].map(t => (
                            <span key={t} className="hero-tag">{t}</span>
                        ))}
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-card animate-float">
                        <div className="hero-card-header">
                            <div className="card-dot green" />
                            <div className="card-dot yellow" />
                            <div className="card-dot red" />
                            <span>Live IT Management</span>
                        </div>
                        <div className="hero-metrics">
                            <div className="metric-box">
                                <div className="metric-num">96%</div>
                                <div className="metric-lbl">Infrastructure</div>
                            </div>
                            <div className="metric-box">
                                <div className="metric-num">93%</div>
                                <div className="metric-lbl">Cyber Security</div>
                            </div>
                        </div>
                        <div className="hero-bars">
                            {[
                                { label: 'IT Infrastructure', pct: 96, color: 'linear-gradient(90deg,#00b4d8,#f77f00)' },
                                { label: 'Cyber Security', pct: 93, color: 'linear-gradient(90deg,#00b4d8,#16a34a)' },
                                { label: 'Design & Development', pct: 88, color: 'linear-gradient(90deg,#3b82f6,#22c55e)' },
                            ].map(b => (
                                <div key={b.label} className="bar-row">
                                    <div className="bar-meta">
                                        <span>{b.label}</span><span>{b.pct}%</span>
                                    </div>
                                    <div className="bar-track">
                                        <div className="bar-fill" style={{ width: `${b.pct}%`, background: b.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hero-avatars">
                            {['IT', 'SEC', 'DEV', 'PM'].map((a, i) => (
                                <div key={a} className="avatar" style={{ zIndex: 4 - i }}>
                                    {a}
                                </div>
                            ))}
                            <span className="avatar-text">Certified Resources</span>
                        </div>
                    </div>

                    <div className="float-badge fb-1">🛡️ Data Protection Active</div>
                    <div className="float-badge fb-2">⭐ 10+ Years Expertise</div>
                </div>
            </div>

            {/* Goinnovior স্টাইলের ৪টি হাইলাইট বক্স গ্রিড */}
            <div className="container">
                <div className="goinnovior-highlights-grid">
                    {GOINNOVIOR_HIGHLIGHTS.map((item) => (
                        <div key={item.id} className="goinnovior-highlight-card">
                            <div className="card-top-row">
                                <span className="highlight-id">{item.id}</span>
                                <div className="highlight-arrow">→</div>
                            </div>
                            <h4 className="highlight-title">{item.title}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* আপনার আগের বটম স্ট্যাটাস বার */}
            <div className="hero-statsbar">
                <div className="container">
                    <div className="statsbar-inner">
                        {(data.stats || DEFAULT.stats).map((s, i) => (
                            <div key={i} className="stat-block">
                                <div className="stat-num">{s.number}</div>
                                <div className="stat-lbl">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
