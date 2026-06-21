import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import api from '../../utils/api';
import './Testimonials.css';

const DEFAULTS = [
    { _id: '1', name: 'Rashed Karim', company: 'Owner, Dhaka Mart', message: 'AMANAH IT built our e-commerce platform from scratch. Sales increased 40% within 3 months of launch!', rating: 5, country: 'Bangladesh' },
    { _id: '2', name: 'Sarah Williams', company: 'Founder, HealthHub', message: 'Professional, fast, and reliable. The MERN stack app they built handles thousands of users smoothly.', rating: 5, country: 'USA' },
    { _id: '3', name: 'Imran Hossain', company: 'CEO, EduTrack', message: 'Great communication throughout the project. They delivered exactly what we needed, on time and on budget.', rating: 5, country: 'Bangladesh' },
    { _id: '4', name: 'Michael Chen', company: 'CTO, RetailFlow', message: 'The admin panel they built is incredibly intuitive. Our non-technical staff manage everything with ease.', rating: 5, country: 'Singapore' },
];

const AVATAR_COLORS = ['#2563eb', '#16a34a', '#3b82f6', '#22c55e'];

export default function Testimonials() {
    const [items, setItems] = useState(DEFAULTS);

    useEffect(() => {
        api.get('/testimonials').then(r => { if (r.data.length) setItems(r.data); }).catch(() => { });
    }, []);

    const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <section className="testimonials section" id="testimonials">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Client Love</span>
                    <h2 className="section-title">What Our <span className="grad-text">Clients Say</span></h2>
                    <p className="section-sub">Real feedback from businesses we've helped grow with technology.</p>
                </div>

                <div className="testimonials-grid">
                    {items.map((t, i) => (
                        <div key={t._id} className="testimonial-card" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="testimonial-stars">
                                {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                                    <FiStar key={idx} className="star-icon" />
                                ))}
                            </div>
                            <p className="testimonial-msg">"{t.message}"</p>
                            <div className="testimonial-author">
                                {t.image ? (
                                    <img src={t.image} alt={t.name} className="author-img" />
                                ) : (
                                    <div className="author-avatar" style={{ background: AVATAR_COLORS[i % 4] }}>
                                        {initials(t.name)}
                                    </div>
                                )}
                                <div className="author-info">
                                    <h4>{t.name}</h4>
                                    <p>{t.company}{t.country ? ` · ${t.country}` : ''}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}