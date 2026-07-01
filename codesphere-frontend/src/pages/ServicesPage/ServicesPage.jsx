// import { useState, useEffect } from 'react';
// import { FiArrowUp, FiCode, FiShoppingCart, FiLayout, FiTrendingUp, FiServer, FiSmartphone, FiPenTool, FiFilm, FiArrowRight } from 'react-icons/fi';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import api from '../../utils/api';
// import './ServicesPage.css';

// const ICONS = { FiCode, FiShoppingCart, FiLayout, FiTrendingUp, FiServer, FiSmartphone, FiPenTool, FiFilm };

// const FALLBACK = [
//     { _id: '1', title: 'Web Development', icon: 'FiCode', color: '#2563eb', description: 'Custom MERN stack web apps, dashboards, and enterprise portals built for performance and scale.', features: ['React + Node.js', 'REST APIs', 'MongoDB', 'Auth & Roles'] },
//     { _id: '2', title: 'E-commerce Solutions', icon: 'FiShoppingCart', color: '#16a34a', description: 'Full-featured online stores with payment gateways, inventory management, and order tracking.', features: ['Stripe & SSLCommerz', 'Product Management', 'Order Tracking', 'Admin Panel'] },
//     { _id: '3', title: 'UI/UX Design', icon: 'FiLayout', color: '#3b82f6', description: 'Modern, responsive interface design that converts visitors to customers across all devices.', features: ['Figma Design', 'Mobile First', 'Prototyping', 'Design Systems'] },
//     { _id: '4', title: 'Digital Marketing', icon: 'FiTrendingUp', color: '#1d4ed8', description: 'SEO, social media management, and content strategies to grow your online presence.', features: ['SEO Optimization', 'Social Media', 'Google Ads', 'Analytics'] },
//     { _id: '5', title: 'Mobile App Development', icon: 'FiSmartphone', color: '#22c55e', description: 'Cross-platform mobile applications using React Native for iOS and Android.', features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support'] },
//     { _id: '6', title: 'Cloud & Deployment', icon: 'FiServer', color: '#15803d', description: 'Server setup, CI/CD pipelines, and cloud deployment on AWS, Vercel, or DigitalOcean.', features: ['AWS / DigitalOcean', 'CI/CD Pipeline', 'Docker', 'SSL & Security'] },
// ];

// const PROCESS_STEPS = [
//     { num: '01', title: 'Discovery', desc: 'We learn about your business, goals, and the problem you need solved.' },
//     { num: '02', title: 'Design', desc: 'Wireframes and UI design that map out the experience before any code is written.' },
//     { num: '03', title: 'Development', desc: 'Clean, tested MERN stack code built in focused, transparent sprints.' },
//     { num: '04', title: 'Launch & Support', desc: 'Deployment, monitoring, and ongoing support after your product goes live.' },
// ];

// export default function ServicesPage() {
//     const [services, setServices] = useState(FALLBACK);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         api.get('/services').then(r => { if (r.data.length) setServices(r.data); }).catch(() => { });
//     }, []);

//     return (
//         <>
//             <Navbar />

//             <section className="services-banner">
//                 <div className="container">
//                     <div className="breadcrumb">
//                         <a href="/">Home</a> <span>»</span> <span className="current">Services</span>
//                     </div>
//                     <h1>Our Services</h1>
//                     <p>
//                         Practical, well-engineered solutions for businesses that need software they can rely on.
//                     </p>
//                 </div>
//             </section>

//             <section className="services-intro section">
//                 <div className="container">
//                     <div className="section-header">
//                         <span className="section-label">What We Do</span>
//                         <h2 className="section-title">End-to-End MERN Stack Solutions</h2>
//                         <p className="section-sub">
//                             From a first conversation to post-launch support, AMANAH IT handles every layer
//                             of your digital product — design, development, deployment, and growth.
//                         </p>
//                     </div>
//                 </div>
//             </section>

//             <section className="services-grid-section section">
//                 <div className="container">
//                     <div className="sp-grid">
//                         {services.map(s => {
//                             const Icon = ICONS[s.icon] || FiCode;
//                             return (
//                                 <div key={s._id} className="sp-card" style={{ '--accent': s.color || '#16a34a' }}>
//                                     <div className="sp-icon" style={{ background: `${s.color || '#16a34a'}18`, color: s.color || '#16a34a' }}>
//                                         <Icon size={28} />
//                                     </div>
//                                     <h3>{s.title}</h3>
//                                     <p>{s.description}</p>
//                                     {s.features?.length > 0 && (
//                                         <ul className="sp-features">
//                                             {s.features.map(f => (
//                                                 <li key={f}><span className="sp-dot" style={{ background: s.color || '#16a34a' }} />{f}</li>
//                                             ))}
//                                         </ul>
//                                     )}
//                                     <a href="#contact-section" className="sp-link" style={{ color: s.color || '#16a34a' }}>
//                                         Get Started <FiArrowRight size={14} />
//                                     </a>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </section>

//             <section className="services-process section alt-bg">
//                 <div className="container">
//                     <div className="section-header">
//                         <span className="section-label">Our Process</span>
//                         <h2 className="section-title">How We Work</h2>
//                     </div>
//                     <div className="process-grid">
//                         {PROCESS_STEPS.map((step, i) => (
//                             <div key={step.num} className="process-card">
//                                 <div className="process-num">{step.num}</div>
//                                 <h3>{step.title}</h3>
//                                 <p>{step.desc}</p>
//                                 {i < PROCESS_STEPS.length - 1 && <div className="process-connector" />}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

           

//             <Footer />

           
//         </>
//     );
// }
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone,
    FiArrowRight, FiShield, FiZap, FiHeadphones, FiCheckCircle,
} from 'react-icons/fi';
import api from '../../utils/api';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ServicesPage.css';

const ICONS = { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone };

// Fallback content — used until /services responds, or if it fails.
// Keep the shape identical to what the backend returns so real data
// swaps in without any UI change.
const FALLBACK_SERVICES = [
    {
        _id: '1',
        slug: 'web-application-development',
        icon: 'FiCode',
        title: 'Web Application Development',
        summary: 'Custom, full-stack web apps built on the MERN stack.',
        points: [
            'React front-ends with fast, accessible interfaces',
            'Node.js & Express APIs built for scale',
            'MongoDB data modeling for real business logic',
        ],
    },
    {
        _id: '2',
        slug: 'ecommerce-solutions',
        icon: 'FiShoppingCart',
        title: 'E-commerce Solutions',
        summary: 'Storefronts that are built to convert and easy to manage.',
        points: [
            'Custom checkout, cart & payment gateway integration',
            'Inventory and order management dashboards',
            'Fast, mobile-first shopping experience',
        ],
    },
    {
        _id: '3',
        slug: 'ui-ux-design',
        icon: 'FiLayout',
        title: 'UI/UX Design',
        summary: 'Interfaces designed around how people actually use them.',
        points: [
            'Wireframes and prototypes before a line of code',
            'Design systems that keep products consistent',
            'Usability-first, not decoration-first',
        ],
    },
    {
        _id: '4',
        slug: 'custom-software-saas',
        icon: 'FiServer',
        title: 'Custom Software & SaaS',
        summary: 'Internal tools and multi-tenant platforms built from scratch.',
        points: [
            'Admin panels, dashboards, and internal tools',
            'Role-based access and subscription billing',
            'API-first architecture for future integrations',
        ],
    },
    {
        _id: '5',
        slug: 'deployment-cloud-hosting',
        icon: 'FiCloud',
        title: 'Deployment & Cloud Hosting',
        summary: 'From local build to production, handled end-to-end.',
        points: [
            'CI/CD pipelines with Vercel, Render & MongoDB Atlas',
            'Environment configuration & secrets management',
            'Monitoring and uptime support after launch',
        ],
    },
    {
        _id: '6',
        slug: 'maintenance-support',
        icon: 'FiSmartphone',
        title: 'Maintenance & Support',
        summary: 'Software that keeps working after we ship it.',
        points: [
            'Bug fixes and security patches',
            'Feature additions as your business grows',
            'Direct communication, no ticket queues',
        ],
    },
];

const BENEFITS = [
    {
        icon: FiZap,
        title: 'Built for Speed',
        text: 'We ship working software in weeks, not quarters — with clear milestones you can track.',
    },
    {
        icon: FiShield,
        title: 'Transparent Process',
        text: 'Fixed scope, fixed price where possible, and no surprise revisions hidden in the fine print.',
    },
    {
        icon: FiHeadphones,
        title: 'Support After Launch',
        text: 'A project isn\u2019t done at deployment. We stay reachable for fixes, updates, and questions.',
    },
];

export default function ServicesPage() {
    const [services, setServices] = useState(FALLBACK_SERVICES);

    useEffect(() => {
        api.get('/services')
            .then(r => { if (r.data?.length) setServices(r.data); })
            .catch(() => { /* keep fallback content */ });
    }, []);

    return (
        <>
            <Navbar />
            <div className="svc-page">

                {/* ---------- Hero banner ---------- */}
                <section className="svc-hero">
                    <div className="svc-hero-bg" />
                    <div className="svc-hero-overlay" />
                    <div className="container svc-hero-content">
                        <div className="svc-breadcrumb">
                            <Link to="/">Home</Link>
                            <span className="svc-crumb-sep">»</span>
                            <span className="svc-crumb-current">Services</span>
                        </div>
                        <h1 className="svc-hero-title">Our Services</h1>
                        <p className="svc-hero-sub">
                            MERN stack development, e-commerce, and custom software —
                            built by a team that ships and stays around to support it.
                        </p>
                    </div>
                </section>

                {/* ---------- Intro ---------- */}
                <section className="svc-intro">
                    <div className="container">
                        <h2 className="svc-intro-heading">
                            Software That Fits the Way You Actually Work
                        </h2>
                        <p className="svc-intro-text">
                            AMANAH IT builds full-stack web applications, e-commerce platforms,
                            and custom software using the MERN stack — React, Node.js, Express,
                            and MongoDB. Every project is scoped around a real business problem,
                            not a template. Below is what we handle end-to-end, from the first
                            wireframe to production deployment.
                        </p>
                    </div>
                </section>

                {/* ---------- Services grid ---------- */}
                <section className="svc-grid-section">
                    <div className="container">
                        <div className="svc-grid">
                            {services.map((s, i) => {
                                const Icon = ICONS[s.icon] || FiCode;
                                const tone = i % 3 === 0 ? 'tone-a' : i % 3 === 1 ? 'tone-b' : 'tone-c';
                                return (
                                    <Link
                                        to={s.slug ? `/services/${s.slug}` : '#'}
                                        key={s._id || s.title}
                                        className={`svc-card ${tone}`}
                                    >
                                        <div className="svc-card-head">
                                            <span className="svc-card-icon"><Icon size={26} /></span>
                                            <h3 className="svc-card-title">{s.title}</h3>
                                        </div>
                                        <div className="svc-card-body">
                                            <p className="svc-card-summary">{s.summary}</p>
                                            {Array.isArray(s.points) && s.points.length > 0 && (
                                                <ul className="svc-card-points">
                                                    {s.points.map((p, idx) => (
                                                        <li key={idx}>
                                                            <FiCheckCircle size={14} className="svc-point-icon" />
                                                            <span>{p}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            <span className="svc-card-cta">
                                                View Details <FiArrowRight size={14} />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ---------- Mid CTA strip ---------- */}
                <section className="svc-cta-strip">
                    <div className="container svc-cta-strip-inner">
                        <h3>Have a project in mind?</h3>
                        <Link to="/contact" className="svc-cta-strip-btn">
                            Talk to Us <FiArrowRight />
                        </Link>
                    </div>
                </section>

                {/* ---------- Benefits ---------- */}
                <section className="svc-benefits">
                    <div className="container">
                        <h2 className="svc-benefits-heading">Why Work With AMANAH IT</h2>
                        <p className="svc-benefits-sub">
                            Three things clients consistently point to when they come back for a
                            second project.
                        </p>
                        <div className="svc-benefits-grid">
                            {BENEFITS.map((b) => {
                                const Icon = b.icon;
                                return (
                                    <div key={b.title} className="svc-benefit-card">
                                        <span className="svc-benefit-icon"><Icon size={24} /></span>
                                        <h4>{b.title}</h4>
                                        <p>{b.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ---------- Bottom CTA ---------- */}
                <section className="svc-bottom-cta">
                    <div className="container svc-bottom-cta-inner">
                        <div>
                            <span className="svc-bottom-eyebrow">Request a Quote</span>
                            <h2>Need a Custom Solution for Your Business?</h2>
                        </div>
                        <Link to="/contact" className="svc-bottom-cta-btn">
                            Start a Project <FiArrowRight />
                        </Link>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
}