// // import { useState, useEffect } from 'react';
// // import { FiCode, FiShoppingCart, FiSmartphone, FiTrendingUp, FiLayout, FiServer } from 'react-icons/fi';
// // import api from '../../utils/api';
// // import './Services.css';

// // const ICONS = { FiCode, FiShoppingCart, FiSmartphone, FiTrendingUp, FiLayout, FiServer };

// // const DEFAULTS = [
// //     { _id: '1', title: 'Web Development', description: 'Custom MERN stack web apps, dashboards, and enterprise portals built for performance and scale.', icon: 'FiCode', color: '#2563eb', features: ['React + Node.js', 'REST & GraphQL APIs', 'MongoDB', 'Auth & Roles'] },
// //     { _id: '2', title: 'E-commerce Solutions', description: 'Full-featured online stores with payment gateways, inventory management, and order tracking.', icon: 'FiShoppingCart', color: '#16a34a', features: ['Stripe & SSL Commerz', 'Product Management', 'Order Tracking', 'Admin Panel'] },
// //     { _id: '3', title: 'UI/UX Design', description: 'Modern, responsive interface design that converts visitors to customers across all devices.', icon: 'FiLayout', color: '#3b82f6', features: ['Figma Design', 'Mobile First', 'Prototyping', 'Design Systems'] },
// //     { _id: '4', title: 'Mobile App Dev', description: 'Cross-platform mobile applications using React Native for iOS and Android.', icon: 'FiSmartphone', color: '#22c55e', features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support'] },
// //     { _id: '5', title: 'Digital Marketing', description: 'SEO, social media management, and content strategies to grow your online presence.', icon: 'FiTrendingUp', color: '#1d4ed8', features: ['SEO Optimization', 'Social Media', 'Google Ads', 'Analytics'] },
// //     { _id: '6', title: 'Cloud & Deployment', description: 'Server setup, CI/CD pipelines, and cloud deployment on AWS, Vercel, or DigitalOcean.', icon: 'FiServer', color: '#15803d', features: ['AWS / DigitalOcean', 'CI/CD Pipeline', 'Docker', 'SSL & Security'] },
// // ];

// // export default function Services() {
// //     const [services, setServices] = useState(DEFAULTS);

// //     useEffect(() => {
// //         api.get('/services').then(r => { if (r.data.length) setServices(r.data); }).catch(() => { });
// //     }, []);

// //     const getIcon = (name) => {
// //         const Icon = ICONS[name] || FiCode;
// //         return <Icon size={28} />;
// //     };

// //     return (
// //         <section className="services section" id="services">
// //             <div className="container">
// //                 <div className="section-header">
// //                     <span className="section-label">What We Offer</span>
// //                     <h2 className="section-title">Services That <span className="grad-text">Drive Results</span></h2>
// //                     <p className="section-sub">From idea to launch — we build complete digital products with cutting-edge tech.</p>
// //                 </div>

// //                 <div className="services-grid">
// //                     {services.map((s, i) => (
// //                         <div key={s._id} className="service-card" style={{ '--accent': s.color, animationDelay: `${i * 0.08}s` }}>
// //                             <div className="service-icon" style={{ color: s.color, background: `${s.color}18` }}>
// //                                 {getIcon(s.icon)}
// //                             </div>
// //                             <h3 className="service-title">{s.title}</h3>
// //                             <p className="service-desc">{s.description}</p>
// //                             <ul className="service-features">
// //                                 {(s.features || []).map(f => (
// //                                     <li key={f}><span className="feature-dot" style={{ background: s.color }} />{f}</li>
// //                                 ))}
// //                             </ul>
// //                             <div className="service-footer">
// //                                 <a href="#contact" className="service-link" style={{ color: s.color }}>
// //                                     Learn more →
// //                                 </a>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // }
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Services.css';

// const ICONS = { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone };

// // Slugs here MUST match the slugs in ServiceDetails.jsx's FALLBACK_SERVICES,
// // otherwise "Learn more" will land on the Service Not Found page.

// const DEFAULTS = [
//     { _id: '1', slug: 'web-application-development', title: 'Web Application Development', description: 'Custom MERN stack web apps, dashboards, and enterprise portals built for performance and scale.', icon: 'FiCode', color: '#6366f1', features: ['React + Node.js', 'REST & GraphQL APIs', 'MongoDB', 'Auth & Roles'] },
//     { _id: '2', slug: 'ecommerce-solutions', title: 'E-commerce Solutions', description: 'Full-featured online stores with payment gateways, inventory management, and order tracking.', icon: 'FiShoppingCart', color: '#f59e0b', features: ['Stripe & SSL Commerz', 'Product Management', 'Order Tracking', 'Admin Panel'] },
//     { _id: '3', slug: 'ui-ux-design', title: 'UI/UX Design', description: 'Modern, responsive interface design that converts visitors to customers across all devices.', icon: 'FiLayout', color: '#ec4899', features: ['Figma Design', 'Mobile First', 'Prototyping', 'Design Systems'] },
//     { _id: '4', slug: 'custom-software-saas', title: 'Custom Software & SaaS', description: 'Internal tools and multi-tenant SaaS platforms built with an API-first approach.', icon: 'FiServer', color: '#14b8a6', features: ['Admin Panels', 'Role-based Access', 'Subscription Billing', 'API-first Design'] },
//     { _id: '5', slug: 'deployment-cloud-hosting', title: 'Deployment & Cloud Hosting', description: 'CI/CD pipelines, cloud deployment, and monitoring on AWS, Vercel, or Render.', icon: 'FiCloud', color: '#0ea5e9', features: ['CI/CD Pipeline', 'Env & Secrets Setup', 'Uptime Monitoring', 'SSL & Domain Setup'] },
//     { _id: '6', slug: 'maintenance-support', title: 'Maintenance & Support', description: 'Ongoing bug fixes, security patches, and feature additions after launch.', icon: 'FiSmartphone', color: '#84cc16', features: ['Bug Fixes', 'Security Patches', 'Feature Additions', 'Direct Communication'] },
// ];
// export default function Services() {
//     const [services, setServices] = useState(DEFAULTS);

//     useEffect(() => {
//         api.get('/services').then(r => { if (r.data.length) setServices(r.data); }).catch(() => { });
//     }, []);

//     const getIcon = (name) => {
//         const Icon = ICONS[name] || FiCode;
//         return <Icon size={28} />;
//     };

//     return (
//         <section className="services section" id="services">
//             <div className="container">
//                 <div className="section-header">
//                     <span className="section-label">What We Offer</span>
//                     <h2 className="section-title">Services That <span className="grad-text">Drive Results</span></h2>
//                     <p className="section-sub">From idea to launch — we build complete digital products with cutting-edge tech.</p>
//                 </div>

//                 <div className="services-grid">
//                     {services.map((s, i) => (
//                         <div key={s._id} className="service-card" style={{ '--accent': s.color, animationDelay: `${i * 0.08}s` }}>
//                             <div className="service-icon" style={{ color: s.color, background: `${s.color}18` }}>
//                                 {getIcon(s.icon)}
//                             </div>
//                             <h3 className="service-title">{s.title}</h3>
//                             <p className="service-desc">{s.description}</p>
//                             <ul className="service-features">
//                                 {(s.features || []).map(f => (
//                                     <li key={f}><span className="feature-dot" style={{ background: s.color }} />{f}</li>
//                                 ))}
//                             </ul>
//                             <div className="service-footer">
//                                 <Link to={`/services/${s.slug}`} className="service-link" style={{ color: s.color }}>
//                                     Learn more →
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }import { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone } from 'react-icons/fi';
import api from '../../utils/api';
import './Services.css';

const ICONS = { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone };

// Slugs here MUST match the slugs in ServiceDetails.jsx's FALLBACK_SERVICES,
// otherwise "Learn more" will land on the Service Not Found page.

const DEFAULTS = [
    { _id: '1', slug: 'web-application-development', title: 'Web Application Development', description: 'Custom MERN stack web apps, dashboards, and enterprise portals built for performance and scale.', icon: 'FiCode', color: '#6366f1', features: ['React + Node.js', 'REST & GraphQL APIs', 'MongoDB', 'Auth & Roles'] },
    { _id: '2', slug: 'ecommerce-solutions', title: 'E-commerce Solutions', description: 'Full-featured online stores with payment gateways, inventory management, and order tracking.', icon: 'FiShoppingCart', color: '#f59e0b', features: ['Stripe & SSL Commerz', 'Product Management', 'Order Tracking', 'Admin Panel'] },
    { _id: '3', slug: 'ui-ux-design', title: 'UI/UX Design', description: 'Modern, responsive interface design that converts visitors to customers across all devices.', icon: 'FiLayout', color: '#ec4899', features: ['Figma Design', 'Mobile First', 'Prototyping', 'Design Systems'] },
    { _id: '4', slug: 'custom-software-saas', title: 'Custom Software & SaaS', description: 'Internal tools and multi-tenant SaaS platforms built with an API-first approach.', icon: 'FiServer', color: '#14b8a6', features: ['Admin Panels', 'Role-based Access', 'Subscription Billing', 'API-first Design'] },
    { _id: '5', slug: 'deployment-cloud-hosting', title: 'Deployment & Cloud Hosting', description: 'CI/CD pipelines, cloud deployment, and monitoring on AWS, Vercel, or Render.', icon: 'FiCloud', color: '#0ea5e9', features: ['CI/CD Pipeline', 'Env & Secrets Setup', 'Uptime Monitoring', 'SSL & Domain Setup'] },
    { _id: '6', slug: 'maintenance-support', title: 'Maintenance & Support', description: 'Ongoing bug fixes, security patches, and feature additions after launch.', icon: 'FiSmartphone', color: '#84cc16', features: ['Bug Fixes', 'Security Patches', 'Feature Additions', 'Direct Communication'] },
];

const DEFAULT_HEADER = {
    label: 'What We Offer',
    titlePrefix: 'Services That ',
    titleHighlight: 'Drive Results',
    subtext: 'From idea to launch — we build complete digital products with cutting-edge tech.',
};

export default function Services() {
    const [services, setServices] = useState(DEFAULTS);
    const [header, setHeader] = useState(DEFAULT_HEADER);

    useEffect(() => {
        api.get('/services').then(r => { if (r.data.length) setServices(r.data); }).catch(() => { });
        api.get('/home-sections').then(r => {
            if (r.data?.servicesHeader) setHeader({ ...DEFAULT_HEADER, ...r.data.servicesHeader });
        }).catch(() => { });
    }, []);

    const getIcon = (name) => {
        const Icon = ICONS[name] || FiCode;
        return <Icon size={28} />;
    };

    return (
        <section className="services section" id="services">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{header.label}</span>
                    <h2 className="section-title">{header.titlePrefix}<span className="grad-text">{header.titleHighlight}</span></h2>
                    <p className="section-sub">{header.subtext}</p>
                </div>

                <div className="services-grid">
                    {services.map((s, i) => (
                        <div key={s._id} className="service-card" style={{ '--accent': s.color, animationDelay: `${i * 0.08}s` }}>
                            <div className="service-icon" style={{ color: s.color, background: `${s.color}18` }}>
                                {getIcon(s.icon)}
                            </div>
                            <h3 className="service-title">{s.title}</h3>
                            <p className="service-desc">{s.description}</p>
                            <ul className="service-features">
                                {(s.features || []).map(f => (
                                    <li key={f}><span className="feature-dot" style={{ background: s.color }} />{f}</li>
                                ))}
                            </ul>
                            <div className="service-footer">
                                <Link to={`/services/${s.slug}`} className="service-link" style={{ color: s.color }}>
                                    Learn more →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}