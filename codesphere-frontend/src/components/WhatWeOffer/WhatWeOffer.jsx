import { useState, useEffect } from 'react';
import { FiCode, FiShoppingCart, FiLayout, FiTrendingUp, FiServer, FiSmartphone, FiPenTool, FiFilm } from 'react-icons/fi';
import api from '../../utils/api';
import './WhatWeOffer.css';

const ICONS = { FiCode, FiShoppingCart, FiLayout, FiTrendingUp, FiServer, FiSmartphone, FiPenTool, FiFilm };

const FALLBACK = [
    { _id: '1', title: 'Web Development', icon: 'FiCode', description: 'Custom MERN stack web apps and dashboards built for performance and scale.' },
    { _id: '2', title: 'E-commerce Solutions', icon: 'FiShoppingCart', description: 'Full-featured online stores with payment gateways and order tracking.' },
    { _id: '3', title: 'UI/UX Design', icon: 'FiLayout', description: 'Modern, responsive interface design that converts visitors to customers.' },
    { _id: '4', title: 'Digital Marketing', icon: 'FiTrendingUp', description: 'SEO, social media, and content strategies to grow your online presence.' },
];

export default function WhatWeOffer() {
    const [services, setServices] = useState(FALLBACK);

    useEffect(() => {
        api.get('/services').then(r => { if (r.data.length) setServices(r.data.slice(0, 4)); }).catch(() => { });
    }, []);

    const scrollToServices = (e) => {
        e.preventDefault();
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="what-we-offer section" id="what-we-offer">
            <div className="container wwo-row">
                <div className="wwo-img-wrap">
                    <img
                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80"
                        alt="Our team at work"
                    />
                </div>

                <div className="wwo-text">
                    <span className="section-label">What We Offer</span>
                    <h2 className="wwo-title">We Make Different Solutions</h2>
                    <p className="wwo-sub">
                        From web development to cloud deployment, we offer a dynamic suite of
                        technological services to drive your business success.
                    </p>

                    <div className="wwo-list">
                        {services.map(s => {
                            const Icon = ICONS[s.icon] || FiCode;
                            return (
                                <div key={s._id} className="wwo-item">
                                    <div className="wwo-icon"><Icon size={22} /></div>
                                    <div>
                                        <h3>{s.title}</h3>
                                        <p>{s.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <a href="/services" className="btn btn-primary wwo-btn">
                        Learn More Us
                    </a>
                </div>
            </div>
        </section>
    );
}