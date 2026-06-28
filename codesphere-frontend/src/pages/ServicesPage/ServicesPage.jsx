import { useState, useEffect } from 'react';
import { FiArrowUp, FiCode, FiShoppingCart, FiLayout, FiTrendingUp, FiServer, FiSmartphone, FiPenTool, FiFilm, FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import api from '../../utils/api';
import './ServicesPage.css';

const ICONS = { FiCode, FiShoppingCart, FiLayout, FiTrendingUp, FiServer, FiSmartphone, FiPenTool, FiFilm };

const FALLBACK = [
    { _id: '1', title: 'Web Development', icon: 'FiCode', color: '#2563eb', description: 'Custom MERN stack web apps, dashboards, and enterprise portals built for performance and scale.', features: ['React + Node.js', 'REST APIs', 'MongoDB', 'Auth & Roles'] },
    { _id: '2', title: 'E-commerce Solutions', icon: 'FiShoppingCart', color: '#16a34a', description: 'Full-featured online stores with payment gateways, inventory management, and order tracking.', features: ['Stripe & SSLCommerz', 'Product Management', 'Order Tracking', 'Admin Panel'] },
    { _id: '3', title: 'UI/UX Design', icon: 'FiLayout', color: '#3b82f6', description: 'Modern, responsive interface design that converts visitors to customers across all devices.', features: ['Figma Design', 'Mobile First', 'Prototyping', 'Design Systems'] },
    { _id: '4', title: 'Digital Marketing', icon: 'FiTrendingUp', color: '#1d4ed8', description: 'SEO, social media management, and content strategies to grow your online presence.', features: ['SEO Optimization', 'Social Media', 'Google Ads', 'Analytics'] },
    { _id: '5', title: 'Mobile App Development', icon: 'FiSmartphone', color: '#22c55e', description: 'Cross-platform mobile applications using React Native for iOS and Android.', features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support'] },
    { _id: '6', title: 'Cloud & Deployment', icon: 'FiServer', color: '#15803d', description: 'Server setup, CI/CD pipelines, and cloud deployment on AWS, Vercel, or DigitalOcean.', features: ['AWS / DigitalOcean', 'CI/CD Pipeline', 'Docker', 'SSL & Security'] },
];

const PROCESS_STEPS = [
    { num: '01', title: 'Discovery', desc: 'We learn about your business, goals, and the problem you need solved.' },
    { num: '02', title: 'Design', desc: 'Wireframes and UI design that map out the experience before any code is written.' },
    { num: '03', title: 'Development', desc: 'Clean, tested MERN stack code built in focused, transparent sprints.' },
    { num: '04', title: 'Launch & Support', desc: 'Deployment, monitoring, and ongoing support after your product goes live.' },
];

export default function ServicesPage() {
    const [services, setServices] = useState(FALLBACK);

    useEffect(() => {
        window.scrollTo(0, 0);
        api.get('/services').then(r => { if (r.data.length) setServices(r.data); }).catch(() => { });
    }, []);

    return (
        <>
            <Navbar />

            <section className="services-banner">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a> <span>»</span> <span className="current">Services</span>
                    </div>
                    <h1>Our Services</h1>
                    <p>
                        Practical, well-engineered solutions for businesses that need software they can rely on.
                    </p>
                </div>
            </section>

            <section className="services-intro section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">What We Do</span>
                        <h2 className="section-title">End-to-End MERN Stack Solutions</h2>
                        <p className="section-sub">
                            From a first conversation to post-launch support, AMANAH IT handles every layer
                            of your digital product — design, development, deployment, and growth.
                        </p>
                    </div>
                </div>
            </section>

            <section className="services-grid-section section">
                <div className="container">
                    <div className="sp-grid">
                        {services.map(s => {
                            const Icon = ICONS[s.icon] || FiCode;
                            return (
                                <div key={s._id} className="sp-card" style={{ '--accent': s.color || '#16a34a' }}>
                                    <div className="sp-icon" style={{ background: `${s.color || '#16a34a'}18`, color: s.color || '#16a34a' }}>
                                        <Icon size={28} />
                                    </div>
                                    <h3>{s.title}</h3>
                                    <p>{s.description}</p>
                                    {s.features?.length > 0 && (
                                        <ul className="sp-features">
                                            {s.features.map(f => (
                                                <li key={f}><span className="sp-dot" style={{ background: s.color || '#16a34a' }} />{f}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <a href="#contact-section" className="sp-link" style={{ color: s.color || '#16a34a' }}>
                                        Get Started <FiArrowRight size={14} />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="services-process section alt-bg">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Process</span>
                        <h2 className="section-title">How We Work</h2>
                    </div>
                    <div className="process-grid">
                        {PROCESS_STEPS.map((step, i) => (
                            <div key={step.num} className="process-card">
                                <div className="process-num">{step.num}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                                {i < PROCESS_STEPS.length - 1 && <div className="process-connector" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services-cta">
                <div className="container cta-inner">
                    <div>
                        <span className="section-label cta-label">Request Consultation</span>
                        <h2>Ready to Start Your<br />Next Project?</h2>
                    </div>
                    <div className="cta-right">
                        <p>We Are Always With Your Business</p>
                        <a href="/#contact" className="cta-btn">Request Consultation</a>
                    </div>
                </div>
            </section>

            <Footer />

           
        </>
    );
}