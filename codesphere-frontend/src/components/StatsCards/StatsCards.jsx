// import { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import './StatsCards.css';

// const DEFAULT = { projects: 28, founded: 2024, techFocus: 'MERN', commitment: 100 };

// export default function StatsCards() {
//     const [stats, setStats] = useState(DEFAULT);

//     useEffect(() => {
//         api.get('/stats').then(r => {
//             // Only trust the backend response if it actually has the new
//             // field shape (founded). Otherwise it's stale/old data —
//             // keep the honest defaults instead of showing "undefined".
//             if (r.data && r.data.founded) {
//                 setStats(r.data);
//             }
//         }).catch(() => { });
//     }, []);

//     const yearsActive = new Date().getFullYear() - stats.founded;

//     const cards = [
//         {
//             value: `${stats.projects}+`,
//             label: 'Projects Built',
//             desc: 'Real-world MERN stack projects shipped and deployed.',
//         },
//         {
//             value: `${yearsActive || 1}+`,
//             label: 'Years of Craft',
//             desc: `Building with the MERN stack since ${stats.founded}.`,
//         },
//         {
//             value: stats.techFocus,
//             label: 'Core Stack',
//             desc: 'MongoDB, Express, React, Node — our specialty end to end.',
//         },
//         {
//             value: `${stats.commitment}%`,
//             label: 'Commitment',
//             desc: 'Every project gets our full focus, start to finish.',
//         },
//     ];

//     return (
//         <section className="stats-cards section" id="stats-cards">
//             <div className="container stats-cards-grid">
//                 {cards.map((c, i) => (
//                     <div key={c.label} className={`stat-card-box tone-${(i % 4) + 1}`}>
//                         <div className="stat-card-glow" />
//                         <div className="stat-card-value">{c.value}</div>
//                         <div className="stat-card-label">{c.label}</div>
//                         <p className="stat-card-desc">{c.desc}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }import { useState, useEffect } from 'react';
// import { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import './StatsCards.css';

// const DEFAULT_CARDS = [
//     { value: '28+', label: 'Projects Built', desc: 'Real-world MERN stack projects shipped and deployed.', tone: 1 },
//     { value: '2+', label: 'Years of Craft', desc: 'Building with the MERN stack since 2024.', tone: 2 },
//     { value: 'MERN', label: 'Core Stack', desc: 'MongoDB, Express, React, Node — our specialty end to end.', tone: 3 },
//     { value: '100%', label: 'Commitment', desc: 'Every project gets our full focus, start to finish.', tone: 4 },
// ];

// export default function StatsCards() {
//     const [cards, setCards] = useState(DEFAULT_CARDS);

//     useEffect(() => {
//         api.get('/home-sections').then(r => {
//             if (r.data?.statsCards?.length) setCards(r.data.statsCards);
//         }).catch(() => { });
//     }, []);

//     return (
//         <section className="stats-cards section" id="stats-cards">
//             <div className="container stats-cards-grid">
//                 {cards.map((c, i) => (
//                     <div key={c._id || i} className={`stat-card-box tone-${c.tone || (i % 4) + 1}`}>
//                         <div className="stat-card-glow" />
//                         <div className="stat-card-value">{c.value}</div>
//                         <div className="stat-card-label">{c.label}</div>
//                         <p className="stat-card-desc">{c.desc}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import socket from '../../utils/socket';
import './StatsCards.css';

const DEFAULT_CARDS = [
    { value: '28+', label: 'Projects Built', desc: 'Real-world MERN stack projects shipped and deployed.', tone: 1 },
    { value: '2+', label: 'Years of Craft', desc: 'Building with the MERN stack since 2024.', tone: 2 },
    { value: 'MERN', label: 'Core Stack', desc: 'MongoDB, Express, React, Node — our specialty end to end.', tone: 3 },
    { value: '100%', label: 'Commitment', desc: 'Every project gets our full focus, start to finish.', tone: 4 },
];

export default function StatsCards() {
    const [cards, setCards] = useState(DEFAULT_CARDS);

    useEffect(() => {
        api.get('/home-sections').then(r => {
            if (r.data?.statsCards?.length) setCards(r.data.statsCards);
        }).catch(() => { });

        // 🔴 admin panel theke card add/edit/delete/save korle instantly update, refresh lagbe na
        const handleUpdate = (event) => {
            if (event.model !== 'HomeSections') return;
            if (event.payload?.statsCards?.length) setCards(event.payload.statsCards);
        };

        socket.on('dataUpdated', handleUpdate);
        return () => socket.off('dataUpdated', handleUpdate);
    }, []);

    return (
        <section className="stats-cards section" id="stats-cards">
            <div className="container stats-cards-grid">
                {cards.map((c, i) => (
                    <div key={c._id || i} className={`stat-card-box tone-${c.tone || (i % 4) + 1}`}>
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