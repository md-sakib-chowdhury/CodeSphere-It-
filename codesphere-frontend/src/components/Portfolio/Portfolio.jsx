import { useState, useEffect } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import api from '../../utils/api';
import './Portfolio.css';

const CATEGORIES = ['All', 'Web', 'E-commerce', 'SaaS', 'Mobile', 'Other'];

const DEFAULTS = [
    { _id: '1', title: 'LifeInnovior', description: 'Full-stack SaaS mental health platform with Jitsi video sessions, Stripe payments, 3 user roles.', tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Jitsi'], category: 'SaaS', liveUrl: '#', featured: true },
    { _id: '2', title: 'Shastho Khoji', description: 'Healthcare management system connecting patients with doctors across Bangladesh.', tags: ['MERN', 'JWT', 'Cloudinary'], category: 'Web', liveUrl: '#', featured: true },
    { _id: '3', title: 'BanglaEats', description: 'Food delivery platform with real-time order tracking, restaurant dashboard, and customer app.', tags: ['React', 'Express', 'MongoDB'], category: 'E-commerce', liveUrl: '#', featured: false },
    { _id: '4', title: 'Migrant Sahay', description: 'Support platform for Bangladeshi migrant workers with agency verification and fraud reporting.', tags: ['React', 'Vite', 'Node.js'], category: 'Web', liveUrl: '#', featured: false },
    { _id: '5', title: 'School ERP', description: 'Complete school management system with attendance, grades, fees, and parent portal.', tags: ['MERN', 'Socket.io'], category: 'SaaS', liveUrl: '#', featured: false },
    { _id: '6', title: 'POS System', description: 'Point of sale system with inventory, billing, and reporting for retail businesses.', tags: ['React', 'Node.js', 'MongoDB'], category: 'Web', liveUrl: '#', featured: false },
];

const COLORS = ['#2563eb', '#16a34a', '#3b82f6', '#22c55e', '#1d4ed8', '#15803d'];

export default function Portfolio() {
    const [projects, setProjects] = useState(DEFAULTS);
    const [cat, setCat] = useState('All');

    useEffect(() => {
        api.get('/projects').then(r => { if (r.data.length) setProjects(r.data); }).catch(() => { });
    }, []);

    const filtered = cat === 'All' ? projects : projects.filter(p => p.category === cat);

    return (
        <section className="portfolio section" id="portfolio">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Our Work</span>
                    <h2 className="section-title">Recent <span className="grad-text">Projects</span></h2>
                    <p className="section-sub">Real products built for real clients — from startups to enterprises.</p>
                </div>

                <div className="portfolio-tabs">
                    {CATEGORIES.map(c => (
                        <button
                            key={c}
                            className={`tab-btn ${cat === c ? 'active' : ''}`}
                            onClick={() => setCat(c)}
                        >{c}</button>
                    ))}
                </div>

                <div className="portfolio-grid">
                    {filtered.map((p, i) => (
                        <div key={p._id} className={`project-card ${p.featured ? 'featured' : ''}`}>
                            <div className="project-img" style={{ background: `linear-gradient(135deg, ${COLORS[i % 6]}22, ${COLORS[(i + 2) % 6]}22)` }}>
                                <div className="project-img-overlay">
                                    <div className="project-initial" style={{ color: COLORS[i % 6] }}>
                                        {p.title.slice(0, 2).toUpperCase()}
                                    </div>
                                </div>
                                {p.featured && <span className="featured-badge">Featured</span>}
                            </div>

                            <div className="project-body">
                                <div className="project-cat">{p.category}</div>
                                <h3 className="project-title">{p.title}</h3>
                                <p className="project-desc">{p.description}</p>

                                <div className="project-tags">
                                    {(p.tags || []).slice(0, 3).map(t => (
                                        <span key={t} className="project-tag">{t}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener" className="proj-link primary"><FiExternalLink size={14} /> Live Demo</a>}
                                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener" className="proj-link secondary"><FiGithub size={14} /> GitHub</a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}