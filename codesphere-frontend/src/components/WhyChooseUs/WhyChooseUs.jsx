// import { FiArrowRight } from 'react-icons/fi';
// import './WhyChooseUs.css';

// export default function WhyChooseUs() {
//     return (
//         <section className="why-choose section" id="why-choose">
//             <div className="container why-row">
//                 <div className="why-text">
//                     <span className="section-label">Why Choose Us</span>
//                     <h2 className="why-title">
//                         IT Services BD —<br />Skyrocket Your Business
//                     </h2>
//                     <p className="why-sub">
//                         Unlock your business potential with our IT service expertise, reliability,
//                         and passion for delivering exceptional results.
//                     </p>
//                     <a href="/explore-us" className="btn btn-primary why-btn">
//                         Learn More Us <FiArrowRight />
//                     </a>
//                 </div>

//                 <div className="why-images">
//                     <div className="why-img-card">
//                         <img
//                             src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
//                             alt="Professional strategy"
//                         />
//                         <p>Professional Strategy</p>
//                     </div>
//                     <div className="why-img-card">
//                         <img
//                             src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"
//                             alt="Great communication"
//                         />
//                         <p>Great Communication</p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
// import { useState, useEffect } from 'react';
// import { FiArrowRight } from 'react-icons/fi';
// import api from '../../utils/api';
// import './WhyChooseUs.css';

// const DEFAULT_SECTION = {
//     label: 'Why Choose Us',
//     title: 'IT Services BD — Skyrocket Your Business',
//     subtext: 'Unlock your business potential with our IT service expertise, reliability, and passion for delivering exceptional results.',
//     btnText: 'Learn More Us',
//     images: [
//         { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', caption: 'Professional Strategy' },
//         { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80', caption: 'Great Communication' },
//     ],
// };

// export default function WhyChooseUs() {
//     const [section, setSection] = useState(DEFAULT_SECTION);

//     useEffect(() => {
//         api.get('/home-sections').then(r => {
//             if (r.data?.whyChooseUs) {
//                 setSection({
//                     ...DEFAULT_SECTION,
//                     ...r.data.whyChooseUs,
//                     images: r.data.whyChooseUs.images?.length ? r.data.whyChooseUs.images : DEFAULT_SECTION.images,
//                 });
//             }
//         }).catch(() => { });
//     }, []);

//     return (
//         <section className="why-choose section" id="why-choose">
//             <div className="container why-row">
//                 <div className="why-text">
//                     <span className="section-label">{section.label}</span>
//                     <h2 className="why-title">{section.title}</h2>
//                     <p className="why-sub">{section.subtext}</p>
//                     <a href="/explore-us" className="btn btn-primary why-btn">
//                         {section.btnText} <FiArrowRight />
//                     </a>
//                 </div>

//                 <div className="why-images">
//                     {section.images.map((img, i) => (
//                         <div key={i} className="why-img-card">
//                             <img src={img.url} alt={img.caption} />
//                             <p>{img.caption}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
// import { useState, useEffect } from 'react';
// import { FiArrowRight } from 'react-icons/fi';
// import api from '../../utils/api';
// import './WhyChooseUs.css';

// const DEFAULT_SECTION = {
//     label: 'Why Choose Us',
//     title: 'IT Services BD — Skyrocket Your Business',
//     subtext: 'Unlock your business potential with our IT service expertise, reliability, and passion for delivering exceptional results.',
//     btnText: 'Learn More Us',
//     images: [
//         { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', caption: 'Professional Strategy' },
//         { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80', caption: 'Great Communication' },
//     ],
// };

// const SECTION_CACHE_KEY = 'amanahit_why_choose_us';

// const getInitialSection = () => {
//     try {
//         const cached = localStorage.getItem(SECTION_CACHE_KEY);
//         if (cached) {
//             const parsed = JSON.parse(cached);
//             return {
//                 ...DEFAULT_SECTION,
//                 ...parsed,
//                 images: parsed.images?.length ? parsed.images : DEFAULT_SECTION.images,
//             };
//         }
//     } catch { /* ignore bad/blocked storage */ }
//     return DEFAULT_SECTION;
// };

// export default function WhyChooseUs() {
//     const [section, setSection] = useState(getInitialSection);

//     useEffect(() => {
//         api.get('/home-sections').then(r => {
//             if (r.data?.whyChooseUs) {
//                 const merged = {
//                     ...DEFAULT_SECTION,
//                     ...r.data.whyChooseUs,
//                     images: r.data.whyChooseUs.images?.length ? r.data.whyChooseUs.images : DEFAULT_SECTION.images,
//                 };
//                 setSection(merged);
//                 try { localStorage.setItem(SECTION_CACHE_KEY, JSON.stringify(merged)); } catch { /* ignore */ }
//             }
//         }).catch(() => { });
//     }, []);

//     return (
//         <section className="why-choose section" id="why-choose">
//             <div className="container why-row">
//                 <div className="why-text">
//                     <span className="section-label">{section.label}</span>
//                     <h2 className="why-title">{section.title}</h2>
//                     <p className="why-sub">{section.subtext}</p>
//                     <a href="/explore-us" className="btn btn-primary why-btn">
//                         {section.btnText} <FiArrowRight />
//                     </a>
//                 </div>

//                 <div className="why-images">
//                     {section.images.map((img, i) => (
//                         <div key={i} className="why-img-card">
//                             <img src={img.url} alt={img.caption} />
//                             <p>{img.caption}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import api from '../../utils/api';
import socket from '../../utils/socket';
import './WhyChooseUs.css';

const DEFAULT_SECTION = {
    label: 'Why Choose Us',
    title: 'IT Services BD — Skyrocket Your Business',
    subtext: 'Unlock your business potential with our IT service expertise, reliability, and passion for delivering exceptional results.',
    btnText: 'Learn More Us',
    images: [
        { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', caption: 'Professional Strategy' },
        { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80', caption: 'Great Communication' },
    ],
};

const SECTION_CACHE_KEY = 'amanahit_why_choose_us';

const mergeSection = (raw) => ({
    ...DEFAULT_SECTION,
    ...raw,
    images: raw?.images?.length ? raw.images : DEFAULT_SECTION.images,
});

const getInitialSection = () => {
    try {
        const cached = localStorage.getItem(SECTION_CACHE_KEY);
        if (cached) return mergeSection(JSON.parse(cached));
    } catch { /* ignore bad/blocked storage */ }
    return DEFAULT_SECTION;
};

export default function WhyChooseUs() {
    const [section, setSection] = useState(getInitialSection);

    useEffect(() => {
        api.get('/home-sections').then(r => {
            if (r.data?.whyChooseUs) {
                const merged = mergeSection(r.data.whyChooseUs);
                setSection(merged);
                try { localStorage.setItem(SECTION_CACHE_KEY, JSON.stringify(merged)); } catch { /* ignore */ }
            }
        }).catch(() => { });

        // 🔴 admin panel theke Save korle instantly ei event ashbe, refresh lagbe na
        const handleUpdate = (event) => {
            if (event.model !== 'HomeSections') return;
            if (!event.payload?.whyChooseUs) return;
            const merged = mergeSection(event.payload.whyChooseUs);
            setSection(merged);
            try { localStorage.setItem(SECTION_CACHE_KEY, JSON.stringify(merged)); } catch { /* ignore */ }
        };

        socket.on('dataUpdated', handleUpdate);
        return () => socket.off('dataUpdated', handleUpdate);
    }, []);

    return (
        <section className="why-choose section" id="why-choose">
            <div className="container why-row">
                <div className="why-text">
                    <span className="section-label">{section.label}</span>
                    <h2 className="why-title">{section.title}</h2>
                    <p className="why-sub">{section.subtext}</p>
                    <a href="/explore-us" className="btn btn-primary why-btn">
                        {section.btnText} <FiArrowRight />
                    </a>
                </div>

                <div className="why-images">
                    {section.images.map((img, i) => (
                        <div key={i} className="why-img-card">
                            <img src={img.url} alt={img.caption} />
                            <p>{img.caption}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}