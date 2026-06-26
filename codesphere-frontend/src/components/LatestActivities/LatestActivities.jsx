import { useState, useEffect } from 'react';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import api from '../../utils/api';
import './LatestActivities.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80';

const DEFAULTS = [
    {
        _id: '1',
        title: 'Essential Features Your Website Should Have in 2026',
        excerpt: 'A modern business website needs more than a homepage — here is what we recommend before launch.',
        image: PLACEHOLDER,
        tags: ['Web Development'],
        createdAt: '2026-06-05',
    },
    {
        _id: '2',
        title: 'Why MERN Stack Is Still a Great Choice for Startups',
        excerpt: 'React, Node, MongoDB and Express remain one of the fastest ways to go from idea to working product.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
        tags: ['MERN Stack'],
        createdAt: '2026-05-28',
    },
    {
        _id: '3',
        title: "A Founder's Guide to Choosing an E-commerce Platform",
        excerpt: 'Custom-built vs off-the-shelf — what matters when picking a platform for your online store.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
        tags: ['E-commerce'],
        createdAt: '2026-05-12',
    },
];

export default function LatestActivities() {
    const [blogs, setBlogs] = useState(DEFAULTS);

    useEffect(() => {
        api.get('/blogs').then(r => { if (r.data.length) setBlogs(r.data.slice(0, 3)); }).catch(() => { });
    }, []);

    const formatDate = (d) =>
        new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <section className="latest-activities">
            <div className="container">
                <div className="la-header">
                    <div>
                        <span className="section-label la-label">Our Recent Activities</span>
                        <h2 className="la-title">Latest Activities</h2>
                    </div>
                    <a href="/latest-articles" className="la-more-btn">
                        Learn More <FiArrowRight />
                    </a>
                </div>

                <div className="la-grid">
                    {blogs.map(b => (
                        <a key={b._id} href="/latest-articles" className="la-card">
                            <div className="la-card-img">
                                <img src={b.image || PLACEHOLDER} alt={b.title} />
                                {b.tags?.[0] && <span className="la-tag">News</span>}
                            </div>
                            <div className="la-card-body">
                                <h3>{b.title}</h3>
                                <p>{b.excerpt}</p>
                                <div className="la-date"><FiCalendar size={13} /> {formatDate(b.createdAt)}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}