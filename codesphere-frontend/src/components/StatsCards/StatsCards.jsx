import { useState, useEffect } from 'react';
import api from '../../utils/api';
import './StatsCards.css';

const DEFAULT = { clients: 50, projects: 120, experience: 8, satisfaction: 98 };

export default function StatsCards() {
    const [stats, setStats] = useState(DEFAULT);

    useEffect(() => {
        api.get('/stats').then(r => setStats(r.data)).catch(() => { });
    }, []);

    const cards = [
        { value: `${stats.clients}+`, label: 'Satisfied Clients', desc: 'Trust us to consistently deliver exceptional results.', color: '#14532d' },
        { value: `${stats.projects}+`, label: 'Projects Completed', desc: 'Our top priority: exceeding your expectations.', color: '#16a34a' },
        { value: `${stats.experience}+`, label: 'Years of Experience', desc: 'A growing team of skilled MERN stack engineers.', color: '#65a30d' },
        { value: `${stats.satisfaction}%`, label: 'Client Satisfaction', desc: 'Driven by honest communication and reliable delivery.', color: '#a3a517' },
    ];

    return (
        <section className="stats-cards section" id="stats-cards">
            <div className="container stats-cards-grid">
                {cards.map(c => (
                    <div key={c.label} className="stat-card-box" style={{ background: c.color }}>
                        <div className="stat-card-value">{c.value}</div>
                        <div className="stat-card-label">{c.label}</div>
                        <p className="stat-card-desc">{c.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}