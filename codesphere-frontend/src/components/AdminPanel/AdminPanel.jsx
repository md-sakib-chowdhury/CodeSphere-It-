// // import { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import {
// //     FiGrid, FiLayout, FiBriefcase, FiUsers, FiMessageSquare,
// //     FiMail, FiBarChart2, FiLogOut, FiMenu, FiX
// // } from 'react-icons/fi';
// // import { useAuth } from '../../context/AuthContext';

// // import StatsTab from './tabs/StatsTab';
// // import HeroTab from './tabs/HeroTab';
// // import ServicesTab from './tabs/ServicesTab';
// // import PortfolioTab from './tabs/PortfolioTab';
// // import TeamTab from './tabs/TeamTab';
// // import TestimonialsTab from './tabs/TestimonialsTab';
// // import ContactTab from './tabs/ContactTab';

// // import './AdminPanel.css';

// // const TABS = [
// //     { id: 'stats', label: 'Dashboard', icon: FiBarChart2 },
// //     { id: 'hero', label: 'Hero Section', icon: FiLayout },
// //     { id: 'services', label: 'Services', icon: FiGrid },
// //     { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase },
// //     { id: 'team', label: 'Team', icon: FiUsers },
// //     { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare },
// //     { id: 'contact', label: 'Messages', icon: FiMail },
// // ];

// // export default function AdminPanel() {
// //     const [active, setActive] = useState('stats');
// //     const [sidebarOpen, setSidebarOpen] = useState(false);
// //     const { admin, logout } = useAuth();
// //     const navigate = useNavigate();

// //     const handleLogout = () => {
// //         logout();
// //         toast.success('Logged out successfully');
// //         navigate('/admin');
// //     };

// //     const renderTab = () => {
// //         switch (active) {
// //             case 'stats': return <StatsTab />;
// //             case 'hero': return <HeroTab />;
// //             case 'services': return <ServicesTab />;
// //             case 'portfolio': return <PortfolioTab />;
// //             case 'team': return <TeamTab />;
// //             case 'testimonials': return <TestimonialsTab />;
// //             case 'contact': return <ContactTab />;
// //             default: return <StatsTab />;
// //         }
// //     };

// //     return (
// //         <div className="admin-shell">
// //             <div className="admin-topbar">
// //                 <button className="admin-burger" onClick={() => setSidebarOpen(!sidebarOpen)}>
// //                     {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
// //                 </button>
// //                 <span className="admin-topbar-title">AMANAH IT Admin</span>
// //             </div>

// //             <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
// //                 <div className="admin-sidebar-brand">
// //                     <div className="admin-logo-box">A</div>
// //                     <div>
// //                         <h3>AMANAH IT</h3>
// //                         <span>Admin Dashboard</span>
// //                     </div>
// //                 </div>

// //                 <nav className="admin-nav">
// //                     {TABS.map(t => {
// //                         const Icon = t.icon;
// //                         return (
// //                             <button
// //                                 key={t.id}
// //                                 className={`admin-nav-item ${active === t.id ? 'active' : ''}`}
// //                                 onClick={() => { setActive(t.id); setSidebarOpen(false); }}
// //                             >
// //                                 <Icon size={18} />
// //                                 <span>{t.label}</span>
// //                             </button>
// //                         );
// //                     })}
// //                 </nav>

// //                 <div className="admin-sidebar-footer">
// //                     <div className="admin-user-info">
// //                         <div className="admin-user-avatar">{(admin?.name || 'A')[0].toUpperCase()}</div>
// //                         <div>
// //                             <p className="admin-user-name">{admin?.name || 'Admin'}</p>
// //                             <p className="admin-user-email">{admin?.email || ''}</p>
// //                         </div>
// //                     </div>
// //                     <button className="admin-logout-btn" onClick={handleLogout}>
// //                         <FiLogOut size={16} /> Logout
// //                     </button>
// //                 </div>
// //             </aside>

// //             {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

// //             <main className="admin-main">
// //                 {renderTab()}
// //             </main>
// //         </div>
// //     );
// // }
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import {
//     FiGrid, FiLayout, FiBriefcase, FiUsers, FiMessageSquare,
//     FiMail, FiBarChart2, FiLogOut, FiMenu, FiX, FiUserPlus
// } from 'react-icons/fi';
// import { useAuth } from '../../context/AuthContext';

// import StatsTab from './tabs/StatsTab';
// import HeroTab from './tabs/HeroTab';
// import ServicesTab from './tabs/ServicesTab';
// import PortfolioTab from './tabs/PortfolioTab';
// import TeamTab from './tabs/TeamTab';
// import TestimonialsTab from './tabs/TestimonialsTab';
// import ContactTab from './tabs/ContactTab';
// import EmployeesTab from './tabs/EmployeesTab';

// import './AdminPanel.css';

// // Kon tab er jonno kon permission lagbe — eita diye filter hobe
// const TABS = [
//     { id: 'stats', label: 'Dashboard', icon: FiBarChart2, permission: null }, // shobai dekhte parbe
//     { id: 'hero', label: 'Hero Section', icon: FiLayout, permission: 'manageHero' },
//     { id: 'services', label: 'Services', icon: FiGrid, permission: 'manageServices' },
//     { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase, permission: 'managePortfolio' },
//     { id: 'team', label: 'Team', icon: FiUsers, permission: 'manageTeam' },
//     { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare, permission: 'manageTestimonials' },
//     { id: 'contact', label: 'Messages', icon: FiMail, permission: 'manageContactMessages' },
// ];

// export default function AdminPanel() {
//     const [active, setActive] = useState('stats');
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const { admin, logout, can, isSuperAdmin } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         toast.success('Logged out successfully');
//         navigate('/admin');
//     };

//     // Employee er permission onujayi tab filter kora, Super Admin shob dekhbe
//     const visibleTabs = TABS.filter(t => t.permission === null || can(t.permission));

//     const renderTab = () => {
//         switch (active) {
//             case 'stats': return <StatsTab />;
//             case 'hero': return <HeroTab />;
//             case 'services': return <ServicesTab />;
//             case 'portfolio': return <PortfolioTab />;
//             case 'team': return <TeamTab />;
//             case 'testimonials': return <TestimonialsTab />;
//             case 'contact': return <ContactTab />;
//             case 'employees': return <EmployeesTab />;
//             default: return <StatsTab />;
//         }
//     };

//     return (
//         <div className="admin-shell">
//             <div className="admin-topbar">
//                 <button className="admin-burger" onClick={() => setSidebarOpen(!sidebarOpen)}>
//                     {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//                 </button>
//                 <span className="admin-topbar-title">AMANAH IT Admin</span>
//             </div>

//             <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
//                 <div className="admin-sidebar-brand">
//                     <div className="admin-logo-box">A</div>
//                     <div>
//                         <h3>AMANAH IT</h3>
//                         <span>Admin Dashboard</span>
//                     </div>
//                 </div>

//                 <nav className="admin-nav">
//                     {visibleTabs.map(t => {
//                         const Icon = t.icon;
//                         return (
//                             <button
//                                 key={t.id}
//                                 className={`admin-nav-item ${active === t.id ? 'active' : ''}`}
//                                 onClick={() => { setActive(t.id); setSidebarOpen(false); }}
//                             >
//                                 <Icon size={18} />
//                                 <span>{t.label}</span>
//                             </button>
//                         );
//                     })}

//                     {/* Shudhu Super Admin ei tab dekhbe */}
//                     {isSuperAdmin && (
//                         <button
//                             className={`admin-nav-item ${active === 'employees' ? 'active' : ''}`}
//                             onClick={() => { setActive('employees'); setSidebarOpen(false); }}
//                         >
//                             <FiUserPlus size={18} />
//                             <span>Employees</span>
//                         </button>
//                     )}
//                 </nav>

//                 <div className="admin-sidebar-footer">
//                     <div className="admin-user-info">
//                         <div className="admin-user-avatar">{(admin?.name || 'A')[0].toUpperCase()}</div>
//                         <div>
//                             <p className="admin-user-name">{admin?.name || 'Admin'}</p>
//                             <p className="admin-user-email">{admin?.email || ''}</p>
//                             {admin?.role && (
//                                 <p className="admin-user-role">{admin.role === 'superadmin' ? 'Super Admin' : 'Editor'}</p>
//                             )}
//                         </div>
//                     </div>
//                     <button className="admin-logout-btn" onClick={handleLogout}>
//                         <FiLogOut size={16} /> Logout
//                     </button>
//                 </div>
//             </aside>

//             {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

//             <main className="admin-main">
//                 {renderTab()}
//             </main>
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