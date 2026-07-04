import { useState, useEffect } from 'react';
import api from '../../utils/api';
import './StatsCards.css';

const DEFAULT = { projects: 28, founded: 2024, techFocus: 'MERN', commitment: 100 };

export default function StatsCards() {
    const [stats, setStats] = useState(DEFAULT);

    useEffect(() => {
        api.get('/stats').then(r => setStats(r.data)).catch(() => { });
    }, []);

    const yearsActive = new Date().getFullYear() - stats.founded;

    const cards = [
        {
            value: `${stats.projects}+`,
            label: 'Projects Built',
            desc: 'Real-world MERN stack projects shipped and deployed.',
        },
        {
            value: `${yearsActive || 1}+`,
            label: 'Years of Craft',
            desc: `Building with the MERN stack since ${stats.founded}.`,
        },
        {
            value: stats.techFocus,
            label: 'Core Stack',
            desc: 'MongoDB, Express, React, Node — our specialty end to end.',
        },
        {
            value: `${stats.commitment}%`,
            label: 'Commitment',
            desc: 'Every project gets our full focus, start to finish.',
        },
    ];

    return (
        <section className="stats-cards section" id="stats-cards">
            <div className="container stats-cards-grid">
                {cards.map((c, i) => (
                    <div key={c.label} className={`stat-card-box tone-${(i % 4) + 1}`}>
                        <div className="stat-card-glow" />
                        <div className="stat-card-value">{c.value}</div>
                        <div className="stat-card-label">{c.label}</div>
                        <p className="stat-card-desc">{c.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}