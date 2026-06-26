import { useState, useEffect } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../utils/api';
import './Testimonials.css';

const DEFAULTS = [
    { _id: '1', name: 'Rashed Karim', company: 'Owner, Dhaka Mart', message: 'AMANAH IT built our e-commerce platform from scratch. Sales increased 40% within 3 months of launch!', rating: 5, country: 'Bangladesh' },
    { _id: '2', name: 'Sarah Williams', company: 'Founder, HealthHub', message: 'Professional, fast, and reliable. The MERN stack app they built handles thousands of users smoothly.', rating: 5, country: 'USA' },
    { _id: '3', name: 'Imran Hossain', company: 'CEO, EduTrack', message: 'Great communication throughout the project. They delivered exactly what we needed, on time and on budget.', rating: 5, country: 'Bangladesh' },
    { _id: '4', name: 'Michael Chen', company: 'CTO, RetailFlow', message: 'The admin panel they built is incredibly intuitive. Our non-technical staff manage everything with ease.', rating: 5, country: 'Singapore' },
];

const AVATAR_COLORS = ['#16a34a', '#0ea5e9', '#8b5cf6', '#22c55e'];

export default function Testimonials() {
    const [items, setItems] = useState(DEFAULTS);
    const [active, setActive] = useState(0);

    useEffect(() => {
        api.get('/testimonials').then(r => { if (r.data.length) setItems(r.data); }).catch(() => { });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive(a => (a + 1) % items.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [items.length]);

    const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const goTo = (i) => setActive(i);
    const prev = () => setActive(a => (a - 1 + items.length) % items.length);
    const next = () => setActive(a => (a + 1) % items.length);

    const t = items[active];
    if (!t) return null;

    return (
        <section className="testimonials section" id="testimonials">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Clients Testimonials</span>
                    <h2 className="section-title">What Our <span className="grad-text">Clients Say</span> About Us</h2>
                </div>

                <div className="testi-slide">
                    <button className="testi-arrow left" onClick={prev} aria-label="Previous"><FiChevronLeft /></button>

                    <div className="testi-slide-inner">
                        <div className="testi-avatar-lg" style={{ background: AVATAR_COLORS[active % 4] }}>
                            {t.image ? <img src={t.image} alt={t.name} /> : initials(t.name)}
                        </div>

                        <div className="testi-stars">
                            {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                                <FiStar key={idx} className="star-icon" />
                            ))}
                        </div>

                        <p className="testi-msg">"{t.message}"</p>

                        <h4 className="testi-name">{t.name}</h4>
                        <p className="testi-role">{t.company}{t.country ? ` · ${t.country}` : ''}</p>
                    </div>

                    <button className="testi-arrow right" onClick={next} aria-label="Next"><FiChevronRight /></button>
                </div>

                <div className="testi-dots">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            className={`testi-dot ${i === active ? 'active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}