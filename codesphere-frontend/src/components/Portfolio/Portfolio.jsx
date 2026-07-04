import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import api from '../../utils/api';
import './Portfolio.css';

const CATEGORIES = ['All', 'Web', 'E-commerce', 'SaaS', 'Other'];

const DEFAULTS = [
    {
        _id: '1',
        title: 'LifeInnovior',
        subtitle: 'Mental Health Care Platform',
        description:
            'LifeInnovior is a full-stack mental health care platform built with the MERN stack. It connects patients with licensed psychologists through secure video sessions powered by Jitsi Meet. Features include three user roles (Super Admin, Psychologist, Patient), Stripe payment integration, Cloudinary image storage, and Nodemailer notifications — bringing professional mental health care accessible from home.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'CSS', 'HTML'],
        category: 'SaaS',
        liveUrl: 'https://l-ifeinnovior.vercel.app/',
        bannerImg: '',
        featured: true,
    },
    {
        _id: '2',
        title: 'Shastho Khoji',
        subtitle: 'Doctor Finding Platform',
        description:
            'Shastho Khoji is a full-stack healthcare platform built with the MERN stack, specially designed for the rural people of Bangladesh. Many village patients visit local dispensaries and often receive wrong treatment due to lack of proper medical guidance. Shastho Khoji solves this by helping them find the right specialist doctor across all 64 districts from home — easily, quickly, and reliably.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'],
        category: 'Web',
        liveUrl: 'https://shastho-khoji.vercel.app/',
        bannerImg: '',
        featured: true,
    },
    {
        _id: '3',
        title: 'Alliance Sourcing BD',
        subtitle: 'Apparel Sourcing Business Site',
        description:
            'A complete frontend business website featuring responsive layouts, service sections, and a professional design tailored for sourcing and business operations.',
        tags: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Frontend'],
        category: 'Web',
        liveUrl: 'https://alliance-sourcing-bd.vercel.app/',
        bannerImg: '',
        featured: false,
    },
    {
        _id: '4',
        title: 'Codeinnovior',
        subtitle: 'EdTech Learning Platform',
        description:
            'A modern and responsive frontend website built with React.js. Features clean UI design, smooth navigation, mobile responsiveness, and optimized performance for an excellent user experience.',
        tags: ['React', 'JavaScript', 'Tailwind CSS', 'Frontend'],
        category: 'SaaS',
        liveUrl: 'https://codeinnovior-9sf9.vercel.app/',
        bannerImg: '',
        featured: false,
    },
    {
        _id: '5',
        title: 'Shopnoby',
        subtitle: 'E-Commerce Platform',
        description:
            'Shopnoby is a full-stack e-commerce platform built with the MERN stack. It features product listing, shopping cart, user authentication with JWT, and secure REST API integration. Designed with a clean UI for a seamless shopping experience.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'CSS'],
        category: 'E-commerce',
        liveUrl: 'https://frontend-final-project-phi.vercel.app/',
        bannerImg: '',
        featured: false,
    },
    {
        _id: '6',
        title: 'RideGrounds',
        subtitle: 'Cycling Community Platform',
        description:
            'A feature-rich cycling community platform built with TypeScript and React. Features include ride discovery, route exploration, community networking, equipment listings, and a blog section — all with a fully responsive design.',
        tags: ['TypeScript', 'React', 'CSS', 'HTML', 'JavaScript'],
        category: 'Other',
        liveUrl: 'https://front-end-project-2nd.vercel.app/',
        bannerImg: '',
        featured: false,
    },
    {
        _id: '7',
        title: 'Mesbah',
        subtitle: 'Student Housing Platform',
        description:
            'A full-stack MERN application built using MongoDB, Express.js, React, and Node.js. Features include user authentication, CRUD operations, responsive design, API integration, and efficient database management to deliver a seamless user experience.',
        tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React', 'Node.js', 'Authentication', 'CRUD Operations'],
        category: 'Web',
        liveUrl: 'https://mesbah-tan.vercel.app/',
        bannerImg: '',
        featured: false,
    },
    {
        _id: '8',
        title: 'BanglaEats',
        subtitle: 'Food Delivery Application',
        description:
            'A full-stack MERN food delivery application featuring user authentication, shopping cart functionality, product management, order processing, and a responsive user interface for seamless food ordering experiences.',
        tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'Cart System', 'Authentication'],
        category: 'E-commerce',
        liveUrl: 'https://food-delivery-app-8quf.vercel.app/',
        bannerImg: '',
        featured: false,
    },
    {
        _id: '9',
        title: 'GTCoding',
        subtitle: 'CRUD Operation Application',
        description:
            'A CRUD application demonstrating Create, Read, Update, and Delete operations with efficient data management and dynamic user interaction.',
        tags: ['React', 'CRUD', 'JavaScript', 'API'],
        category: 'Other',
        liveUrl: 'https://cruds-orpin.vercel.app/',
        bannerImg: '',
        featured: false,
    },
];

export default function Portfolio() {
    const [projects, setProjects] = useState(DEFAULTS);
    const [cat, setCat] = useState('All');

    useEffect(() => {
        api
            .get('/projects')
            .then((r) => {
                if (r.data.length) setProjects(r.data);
            })
            .catch(() => { });
    }, []);

    const filtered = cat === 'All' ? projects : projects.filter((p) => p.category === cat);

    return (
        <section className="portfolio section" id="portfolio">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Our Work</span>
                    <h2 className="section-title">
                        Recent <span className="grad-text">Projects</span>
                    </h2>
                    <p className="section-sub">
                        Real products built for real clients — from startups to enterprises.
                    </p>
                </div>

                <div className="portfolio-tabs">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c}
                            className={`tab-btn ${cat === c ? 'active' : ''}`}
                            onClick={() => setCat(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="portfolio-grid">
                    {filtered.map((p) => (
                        <div key={p._id} className={`project-card ${p.featured ? 'featured' : ''}`}>
                            <div
                                className="project-banner"
                                style={p.bannerImg ? { backgroundImage: `url(${p.bannerImg})` } : undefined}
                            >
                                <div className="project-banner-overlay" />
                                {p.featured && <span className="featured-badge">Featured</span>}
                            </div>

                            <div className="project-body">
                                <div className="project-cat">{p.category}</div>
                                <h3 className="project-title">{p.title}</h3>
                                {p.subtitle && <p className="project-subtitle">{p.subtitle}</p>}
                                <p className="project-desc">{p.description}</p>

                                <div className="project-tags">
                                    {(p.tags || []).map((t) => (
                                        <span key={t} className="project-tag">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {p.liveUrl && (
                                        <a
                                            href={p.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="proj-link primary"
                                        >
                                            Live <FiExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}