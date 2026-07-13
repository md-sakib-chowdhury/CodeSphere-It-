// // import { useState, useEffect } from 'react';
// // import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// // import api from '../../utils/api';
// // import './Testimonials.css';

// // const DEFAULTS = [
// //     { _id: '1', name: 'Rashed Karim', company: 'Owner, Dhaka Mart', message: 'AMANAH IT built our e-commerce platform from scratch. Sales increased 40% within 3 months of launch!', rating: 5, country: 'Bangladesh' },
// //     { _id: '2', name: 'Sarah Williams', company: 'Founder, HealthHub', message: 'Professional, fast, and reliable. The MERN stack app they built handles thousands of users smoothly.', rating: 5, country: 'USA' },
// //     { _id: '3', name: 'Imran Hossain', company: 'CEO, EduTrack', message: 'Great communication throughout the project. They delivered exactly what we needed, on time and on budget.', rating: 5, country: 'Bangladesh' },
// //     { _id: '4', name: 'Michael Chen', company: 'CTO, RetailFlow', message: 'The admin panel they built is incredibly intuitive. Our non-technical staff manage everything with ease.', rating: 5, country: 'Singapore' },
// // ];

// // const AVATAR_COLORS = ['#16a34a', '#0ea5e9', '#8b5cf6', '#22c55e'];

// // export default function Testimonials() {
// //     const [items, setItems] = useState(DEFAULTS);
// //     const [active, setActive] = useState(0);

// //     useEffect(() => {
// //         api.get('/testimonials').then(r => { if (r.data.length) setItems(r.data); }).catch(() => { });
// //     }, []);

// //     useEffect(() => {
// //         const timer = setInterval(() => {
// //             setActive(a => (a + 1) % items.length);
// //         }, 5000);
// //         return () => clearInterval(timer);
// //     }, [items.length]);

// //     const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
// //     const goTo = (i) => setActive(i);
// //     const prev = () => setActive(a => (a - 1 + items.length) % items.length);
// //     const next = () => setActive(a => (a + 1) % items.length);

// //     const t = items[active];
// //     if (!t) return null;

// //     return (
// //         <section className="testimonials section" id="testimonials">
// //             <div className="container">
// //                 <div className="section-header">
// //                     <span className="section-label">Clients Testimonials</span>
// //                     <h2 className="section-title">What Our <span className="grad-text">Clients Say</span> About Us</h2>
// //                 </div>

// //                 <div className="testi-slide">
// //                     <button className="testi-arrow left" onClick={prev} aria-label="Previous"><FiChevronLeft /></button>

// //                     <div className="testi-slide-inner">
// //                         <div className="testi-avatar-lg" style={{ background: AVATAR_COLORS[active % 4] }}>
// //                             {t.image ? <img src={t.image} alt={t.name} /> : initials(t.name)}
// //                         </div>

// //                         <div className="testi-stars">
// //                             {Array.from({ length: t.rating || 5 }).map((_, idx) => (
// //                                 <FiStar key={idx} className="star-icon" />
// //                             ))}
// //                         </div>

// //                         <p className="testi-msg">"{t.message}"</p>

// //                         <h4 className="testi-name">{t.name}</h4>
// //                         <p className="testi-role">{t.company}{t.country ? ` · ${t.country}` : ''}</p>
// //                     </div>

// //                     <button className="testi-arrow right" onClick={next} aria-label="Next"><FiChevronRight /></button>
// //                 </div>

// //                 <div className="testi-dots">
// //                     {items.map((_, i) => (
// //                         <button
// //                             key={i}
// //                             className={`testi-dot ${i === active ? 'active' : ''}`}
// //                             onClick={() => goTo(i)}
// //                             aria-label={`Go to testimonial ${i + 1}`}
// //                         />
// //                     ))}
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // }import { useState, useEffect } from 'react';
// import { useState, useEffect } from 'react';
// import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Testimonials.css';

// const DEFAULTS = [
//     { _id: '1', name: 'Rashed Karim', company: 'Owner, Dhaka Mart', message: 'AMANAH IT built our e-commerce platform from scratch. Sales increased 40% within 3 months of launch!', rating: 5, country: 'Bangladesh' },
//     { _id: '2', name: 'Sarah Williams', company: 'Founder, HealthHub', message: 'Professional, fast, and reliable. The MERN stack app they built handles thousands of users smoothly.', rating: 5, country: 'USA' },
//     { _id: '3', name: 'Imran Hossain', company: 'CEO, EduTrack', message: 'Great communication throughout the project. They delivered exactly what we needed, on time and on budget.', rating: 5, country: 'Bangladesh' },
//     { _id: '4', name: 'Michael Chen', company: 'CTO, RetailFlow', message: 'The admin panel they built is incredibly intuitive. Our non-technical staff manage everything with ease.', rating: 5, country: 'Singapore' },
// ];

// const AVATAR_COLORS = ['#16a34a', '#0ea5e9', '#8b5cf6', '#22c55e'];

// const DEFAULT_HEADER = {
//     label: 'Clients Testimonials',
//     titlePrefix: 'What Our ',
//     titleHighlight: 'Clients Say',
//     titleSuffix: ' About Us',
// };

// export default function Testimonials() {
//     const [items, setItems] = useState(DEFAULTS);
//     const [header, setHeader] = useState(DEFAULT_HEADER);
//     const [active, setActive] = useState(0);

//     useEffect(() => {
//         api.get('/testimonials').then(r => { if (r.data.length) setItems(r.data); }).catch(() => { });
//         api.get('/home-sections').then(r => {
//             if (r.data?.testimonialsHeader) setHeader({ ...DEFAULT_HEADER, ...r.data.testimonialsHeader });
//         }).catch(() => { });
//     }, []);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setActive(a => (a + 1) % items.length);
//         }, 5000);
//         return () => clearInterval(timer);
//     }, [items.length]);

//     const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
//     const goTo = (i) => setActive(i);
//     const prev = () => setActive(a => (a - 1 + items.length) % items.length);
//     const next = () => setActive(a => (a + 1) % items.length);

//     const t = items[active];
//     if (!t) return null;

//     return (
//         <section className="testimonials section" id="testimonials">
//             <div className="container">
//                 <div className="section-header">
//                     <span className="section-label">{header.label}</span>
//                     <h2 className="section-title">{header.titlePrefix}<span className="grad-text">{header.titleHighlight}</span>{header.titleSuffix}</h2>
//                 </div>

//                 <div className="testi-slide">
//                     <button className="testi-arrow left" onClick={prev} aria-label="Previous"><FiChevronLeft /></button>

//                     <div className="testi-slide-inner">
//                         <div className="testi-avatar-lg" style={{ background: AVATAR_COLORS[active % 4] }}>
//                             {t.image ? <img src={t.image} alt={t.name} /> : initials(t.name)}
//                         </div>

//                         <div className="testi-stars">
//                             {Array.from({ length: t.rating || 5 }).map((_, idx) => (
//                                 <FiStar key={idx} className="star-icon" />
//                             ))}
//                         </div>

//                         <p className="testi-msg">"{t.message}"</p>

//                         <h4 className="testi-name">{t.name}</h4>
//                         <p className="testi-role">{t.company}{t.country ? ` · ${t.country}` : ''}</p>
//                     </div>

//                     <button className="testi-arrow right" onClick={next} aria-label="Next"><FiChevronRight /></button>
//                 </div>

//                 <div className="testi-dots">
//                     {items.map((_, i) => (
//                         <button
//                             key={i}
//                             className={`testi-dot ${i === active ? 'active' : ''}`}
//                             onClick={() => goTo(i)}
//                             aria-label={`Go to testimonial ${i + 1}`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }import { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../utils/api';
import './Testimonials.css';

const AVATAR_COLORS = ['#16a34a', '#0ea5e9', '#8b5cf6', '#22c55e'];

const DEFAULT_HEADER = {
    label: 'Clients Testimonials',
    titlePrefix: 'What Our ',
    titleHighlight: 'Clients Say',
    titleSuffix: ' About Us',
};

export default function Testimonials() {
    const [items, setItems] = useState([]);       // fake DEFAULTS bad — khali array diye shuru
    const [loaded, setLoaded] = useState(false);   // API call shesh hoyeche kina track kora
    const [header, setHeader] = useState(DEFAULT_HEADER);
    const [active, setActive] = useState(0);

    useEffect(() => {
        api.get('/testimonials')
            .then(r => setItems(r.data || []))
            .catch(() => setItems([]))
            .finally(() => setLoaded(true));

        api.get('/home-sections').then(r => {
            if (r.data?.testimonialsHeader) setHeader({ ...DEFAULT_HEADER, ...r.data.testimonialsHeader });
        }).catch(() => { });
    }, []);

    useEffect(() => {
        if (items.length <= 1) return; // 1 ta ba 0 ta thakle auto-slide korar dorkar nei
        const timer = setInterval(() => {
            setActive(a => (a + 1) % items.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [items.length]);

    // Jotokkhon API response asheni, kichu render koro na (fake flash avoid korar jonno)
    if (!loaded) return null;

    // Real testimonial na thakle — animated "Coming Soon" placeholder dekhao।
    // Jokhon admin panel theke real testimonial add hobe, items.length > 0 hoye
    // jabe, ar eta automatically real content e switch hoye jabe — kono extra
    // kaj lagbe na।
    if (items.length === 0) {
        return (
            <section className="testimonials section" id="testimonials">
                <style>{`
                    @keyframes testiPulseDot {
                        0%, 100% { opacity: 0.3; transform: scale(0.9); }
                        50% { opacity: 1; transform: scale(1.15); }
                    }
                    @keyframes testiFadeUp {
                        from { opacity: 0; transform: translateY(12px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .testi-coming-soon {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 0.75rem;
                        padding: 3rem 1.5rem;
                        text-align: center;
                        animation: testiFadeUp 0.6s ease-out;
                    }
                    .testi-coming-soon-dots {
                        display: flex;
                        gap: 6px;
                        margin-bottom: 0.5rem;
                    }
                    .testi-coming-soon-dots span {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: currentColor;
                        display: inline-block;
                        animation: testiPulseDot 1.4s ease-in-out infinite;
                    }
                    .testi-coming-soon-dots span:nth-child(2) { animation-delay: 0.2s; }
                    .testi-coming-soon-dots span:nth-child(3) { animation-delay: 0.4s; }
                `}</style>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">{header.label}</span>
                        <h2 className="section-title">{header.titlePrefix}<span className="grad-text">{header.titleHighlight}</span>{header.titleSuffix}</h2>
                    </div>
                    <div className="testi-coming-soon">
                        <div className="testi-coming-soon-dots" style={{ color: 'var(--green-600, #16a34a)' }}>
                            <span /><span /><span />
                        </div>
                        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--gray-700, #374151)', margin: 0 }}>
                            Client reviews coming soon
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--gray-500, #6b7280)', maxWidth: 420, margin: 0 }}>
                            We're just getting started — real client testimonials will appear here soon.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

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
                    <span className="section-label">{header.label}</span>
                    <h2 className="section-title">{header.titlePrefix}<span className="grad-text">{header.titleHighlight}</span>{header.titleSuffix}</h2>
                </div>

                <div className="testi-slide">
                    {items.length > 1 && (
                        <button className="testi-arrow left" onClick={prev} aria-label="Previous"><FiChevronLeft /></button>
                    )}

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

                    {items.length > 1 && (
                        <button className="testi-arrow right" onClick={next} aria-label="Next"><FiChevronRight /></button>
                    )}
                </div>

                {items.length > 1 && (
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
                )}
            </div>
        </section>
    );
}