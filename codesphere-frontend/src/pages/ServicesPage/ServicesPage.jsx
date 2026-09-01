// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//     FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone,
//     FiArrowRight, FiShield, FiZap, FiHeadphones, FiCheckCircle,
// } from 'react-icons/fi';
// import api from '../../utils/api';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import './ServicesPage.css';

// const ICONS = { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone };

// // Fallback content — used until /services responds, or if it fails.
// // Keep the shape identical to what the backend returns so real data
// // swaps in without any UI change.
// const FALLBACK_SERVICES = [
//     {
//         _id: '1',
//         slug: 'web-application-development',
//         icon: 'FiCode',
//         title: 'Web Application Development',
//         summary: 'Custom, full-stack web apps built on the MERN stack.',
//         points: [
//             'React front-ends with fast, accessible interfaces',
//             'Node.js & Express APIs built for scale',
//             'MongoDB data modeling for real business logic',
//         ],
//     },
//     {
//         _id: '2',
//         slug: 'ecommerce-solutions',
//         icon: 'FiShoppingCart',
//         title: 'E-commerce Solutions',
//         summary: 'Storefronts that are built to convert and easy to manage.',
//         points: [
//             'Custom checkout, cart & payment gateway integration',
//             'Inventory and order management dashboards',
//             'Fast, mobile-first shopping experience',
//         ],
//     },
//     {
//         _id: '3',
//         slug: 'ui-ux-design',
//         icon: 'FiLayout',
//         title: 'UI/UX Design',
//         summary: 'Interfaces designed around how people actually use them.',
//         points: [
//             'Wireframes and prototypes before a line of code',
//             'Design systems that keep products consistent',
//             'Usability-first, not decoration-first',
//         ],
//     },
//     {
//         _id: '4',
//         slug: 'custom-software-saas',
//         icon: 'FiServer',
//         title: 'Custom Software & SaaS',
//         summary: 'Internal tools and multi-tenant platforms built from scratch.',
//         points: [
//             'Admin panels, dashboards, and internal tools',
//             'Role-based access and subscription billing',
//             'API-first architecture for future integrations',
//         ],
//     },
//     {
//         _id: '5',
//         slug: 'deployment-cloud-hosting',
//         icon: 'FiCloud',
//         title: 'Deployment & Cloud Hosting',
//         summary: 'From local build to production, handled end-to-end.',
//         points: [
//             'CI/CD pipelines with Vercel, Render & MongoDB Atlas',
//             'Environment configuration & secrets management',
//             'Monitoring and uptime support after launch',
//         ],
//     },
//     {
//         _id: '6',
//         slug: 'maintenance-support',
//         icon: 'FiSmartphone',
//         title: 'Maintenance & Support',
//         summary: 'Software that keeps working after we ship it.',
//         points: [
//             'Bug fixes and security patches',
//             'Feature additions as your business grows',
//             'Direct communication, no ticket queues',
//         ],
//     },
// ];

// const BENEFITS = [
//     {
//         icon: FiZap,
//         title: 'Built for Speed',
//         text: 'We ship working software in weeks, not quarters — with clear milestones you can track.',
//     },
//     {
//         icon: FiShield,
//         title: 'Transparent Process',
//         text: 'Fixed scope, fixed price where possible, and no surprise revisions hidden in the fine print.',
//     },
//     {
//         icon: FiHeadphones,
//         title: 'Support After Launch',
//         text: 'A project isn\u2019t done at deployment. We stay reachable for fixes, updates, and questions.',
//     },
// ];

// export default function ServicesPage() {
//     const [services, setServices] = useState(FALLBACK_SERVICES);

//     useEffect(() => {
//         api.get('/services')
//             .then(r => { if (r.data?.length) setServices(r.data); })
//             .catch(() => { /* keep fallback content */ });
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <div className="svc-page">

//                 {/* ---------- Hero banner ---------- */}
//                 <section className="svc-hero">
//                     <div className="svc-hero-bg" />
//                     <div className="svc-hero-overlay" />
//                     <div className="container svc-hero-content">
//                         <div className="svc-breadcrumb">
//                             <Link to="/">Home</Link>
//                             <span className="svc-crumb-sep">»</span>
//                             <span className="svc-crumb-current">Services</span>
//                         </div>
//                         <h1 className="svc-hero-title">Our Services</h1>
//                         <p className="svc-hero-sub">
//                             MERN stack development, e-commerce, and custom software —
//                             built by a team that ships and stays around to support it.
//                         </p>
//                     </div>
//                 </section>

//                 {/* ---------- Intro ---------- */}
//                 <section className="svc-intro">
//                     <div className="container">
//                         <h2 className="svc-intro-heading">
//                             Software That Fits the Way You Actually Work
//                         </h2>
//                         <p className="svc-intro-text">
//                             AMANAH IT builds full-stack web applications, e-commerce platforms,
//                             and custom software using the MERN stack — React, Node.js, Express,
//                             and MongoDB. Every project is scoped around a real business problem,
//                             not a template. Below is what we handle end-to-end, from the first
//                             wireframe to production deployment.
//                         </p>
//                     </div>
//                 </section>

//                 {/* ---------- Services grid ---------- */}
//                 <section className="svc-grid-section">
//                     <div className="container">
//                         <div className="svc-grid">
//                             {services.map((s, i) => {
//                                 const Icon = ICONS[s.icon] || FiCode;
//                                 const tone = i % 3 === 0 ? 'tone-a' : i % 3 === 1 ? 'tone-b' : 'tone-c';
//                                 return (
//                                     <Link
//                                         to={s.slug ? `/services/${s.slug}` : '#'}
//                                         key={s._id || s.title}
//                                         className={`svc-card ${tone}`}
//                                         data-index={String(i + 1).padStart(2, '0')}
//                                     >
//                                         <div className="svc-card-head">
//                                             <span className="svc-card-icon"><Icon size={26} /></span>
//                                             <h3 className="svc-card-title">{s.title}</h3>
//                                         </div>
//                                         <div className="svc-card-body">
//                                             <p className="svc-card-summary">{s.summary}</p>
//                                             {Array.isArray(s.points) && s.points.length > 0 && (
//                                                 <ul className="svc-card-points">
//                                                     {s.points.map((p, idx) => (
//                                                         <li key={idx}>
//                                                             <FiCheckCircle size={14} className="svc-point-icon" />
//                                                             <span>{p}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             )}
//                                             <span className="svc-card-cta">
//                                                 View Details <FiArrowRight size={14} />
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </section>

//                 {/* ---------- Mid CTA strip ---------- */}
//                 <section className="svc-cta-strip">
//                     <div className="container svc-cta-strip-inner">
//                         <h3>Have a project in mind?</h3>
//                         <Link to="/contact" className="svc-cta-strip-btn">
//                             Talk to Us <FiArrowRight />
//                         </Link>
//                     </div>
//                 </section>

//                 {/* ---------- Benefits ---------- */}
//                 <section className="svc-benefits">
//                     <div className="container">
//                         <h2 className="svc-benefits-heading">Why Work With AMANAH IT</h2>
//                         <p className="svc-benefits-sub">
//                             Three things clients consistently point to when they come back for a
//                             second project.
//                         </p>
//                         <div className="svc-benefits-grid">
//                             {BENEFITS.map((b) => {
//                                 const Icon = b.icon;
//                                 return (
//                                     <div key={b.title} className="svc-benefit-card">
//                                         <span className="svc-benefit-icon"><Icon size={24} /></span>
//                                         <h4>{b.title}</h4>
//                                         <p>{b.text}</p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </section>

//                 {/* ---------- Bottom CTA ---------- */}
//                 <section className="svc-bottom-cta">
//                     <div className="container svc-bottom-cta-inner">
//                         <div>
//                             <span className="svc-bottom-eyebrow">Request a Quote</span>
//                             <h2>Need a Custom Solution for Your Business?</h2>
//                         </div>
//                         <Link to="/contact" className="svc-bottom-cta-btn">
//                             Start a Project <FiArrowRight />
//                         </Link>
//                     </div>
//                 </section>

//             </div>
//             <Footer />
//         </>
//     );
// }
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//     FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone,
//     FiArrowRight, FiShield, FiZap, FiHeadphones, FiCheckCircle,
// } from 'react-icons/fi';
// import api from '../../utils/api';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import './ServicesPage.css';

// const ICONS = { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone };

// // Fallback content — used until /services responds, or if it fails.
// const FALLBACK_SERVICES = [
//     {
//         _id: '1',
//         slug: 'web-application-development',
//         icon: 'FiCode',
//         title: 'Web Application Development',
//         description: 'Custom, full-stack web apps built on the MERN stack.',
//         features: [
//             'React front-ends with fast, accessible interfaces',
//             'Node.js & Express APIs built for scale',
//             'MongoDB data modeling for real business logic',
//         ],
//     },
//     {
//         _id: '2',
//         slug: 'ecommerce-solutions',
//         icon: 'FiShoppingCart',
//         title: 'E-commerce Solutions',
//         description: 'Storefronts that are built to convert and easy to manage.',
//         features: [
//             'Custom checkout, cart & payment gateway integration',
//             'Inventory and order management dashboards',
//             'Fast, mobile-first shopping experience',
//         ],
//     },
//     {
//         _id: '3',
//         slug: 'ui-ux-design',
//         icon: 'FiLayout',
//         title: 'UI/UX Design',
//         description: 'Interfaces designed around how people actually use them.',
//         features: [
//             'Wireframes and prototypes before a line of code',
//             'Design systems that keep products consistent',
//             'Usability-first, not decoration-first',
//         ],
//     },
//     {
//         _id: '4',
//         slug: 'custom-software-saas',
//         icon: 'FiServer',
//         title: 'Custom Software & SaaS',
//         description: 'Internal tools and multi-tenant platforms built from scratch.',
//         features: [
//             'Admin panels, dashboards, and internal tools',
//             'Role-based access and subscription billing',
//             'API-first architecture for future integrations',
//         ],
//     },
//     {
//         _id: '5',
//         slug: 'deployment-cloud-hosting',
//         icon: 'FiCloud',
//         title: 'Deployment & Cloud Hosting',
//         description: 'From local build to production, handled end-to-end.',
//         features: [
//             'CI/CD pipelines with Vercel, Render & MongoDB Atlas',
//             'Environment configuration & secrets management',
//             'Monitoring and uptime support after launch',
//         ],
//     },
//     {
//         _id: '6',
//         slug: 'maintenance-support',
//         icon: 'FiSmartphone',
//         title: 'Maintenance & Support',
//         description: 'Software that keeps working after we ship it.',
//         features: [
//             'Bug fixes and security patches',
//             'Feature additions as your business grows',
//             'Direct communication, no ticket queues',
//         ],
//     },
// ];

// const BENEFITS = [
//     {
//         icon: FiZap,
//         title: 'Built for Speed',
//         text: 'We ship working software in weeks, not quarters — with clear milestones you can track.',
//     },
//     {
//         icon: FiShield,
//         title: 'Transparent Process',
//         text: 'Fixed scope, fixed price where possible, and no surprise revisions hidden in the fine print.',
//     },
//     {
//         icon: FiHeadphones,
//         title: 'Support After Launch',
//         text: "A project isn't done at deployment. We stay reachable for fixes, updates, and questions.",
//     },
// ];

// export default function ServicesPage() {
//     const [services, setServices] = useState(FALLBACK_SERVICES);

//     useEffect(() => {
//         api.get('/services')
//             .then(r => { if (r.data?.length) setServices(r.data); })
//             .catch(() => { /* keep fallback content */ });
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <div className="svc-page">

//                 {/* ---------- Hero banner ---------- */}
//                 <section className="svc-hero">
//                     <div className="svc-hero-bg" />
//                     <div className="svc-hero-overlay" />
//                     <div className="container svc-hero-content">
//                         <div className="svc-breadcrumb">
//                             <Link to="/">Home</Link>
//                             <span className="svc-crumb-sep">»</span>
//                             <span className="svc-crumb-current">Services</span>
//                         </div>
//                         <h1 className="svc-hero-title">Our Services</h1>
//                         <p className="svc-hero-sub">
//                             MERN stack development, e-commerce, and custom software —
//                             built by a team that ships and stays around to support it.
//                         </p>
//                     </div>
//                 </section>

//                 {/* ---------- Intro ---------- */}
//                 <section className="svc-intro">
//                     <div className="container">
//                         <h2 className="svc-intro-heading">
//                             Software That Fits the Way You Actually Work
//                         </h2>
//                         <p className="svc-intro-text">
//                             AMANAH IT builds full-stack web applications, e-commerce platforms,
//                             and custom software using the MERN stack — React, Node.js, Express,
//                             and MongoDB. Every project is scoped around a real business problem,
//                             not a template. Below is what we handle end-to-end, from the first
//                             wireframe to production deployment.
//                         </p>
//                     </div>
//                 </section>

//                 {/* ---------- Services grid ---------- */}
//                 <section className="svc-grid-section">
//                     <div className="container">
//                         <div className="svc-grid">
//                             {services.map((s, i) => {
//                                 const Icon = ICONS[s.icon] || FiCode;
//                                 const tone = i % 3 === 0 ? 'tone-a' : i % 3 === 1 ? 'tone-b' : 'tone-c';
//                                 return (
//                                     <Link
//                                         to={s.slug ? `/services/${s.slug}` : '#'}
//                                         key={s._id || s.title}
//                                         className={`svc-card ${tone}`}
//                                         data-index={String(i + 1).padStart(2, '0')}
//                                     >
//                                         <div className="svc-card-head">
//                                             <span className="svc-card-icon"><Icon size={26} /></span>
//                                             <h3 className="svc-card-title">{s.title}</h3>
//                                         </div>
//                                         <div className="svc-card-body">
//                                             <p className="svc-card-summary">{s.description}</p>
//                                             {Array.isArray(s.features) && s.features.length > 0 && (
//                                                 <ul className="svc-card-points">
//                                                     {s.features.map((f, idx) => (
//                                                         <li key={idx}>
//                                                             <FiCheckCircle size={14} className="svc-point-icon" />
//                                                             <span>{f}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             )}
//                                             <span className="svc-card-cta">
//                                                 View Details <FiArrowRight size={14} />
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </section>

//                 {/* ---------- Mid CTA strip ---------- */}
//                 <section className="svc-cta-strip">
//                     <div className="container svc-cta-strip-inner">
//                         <h3>Have a project in mind?</h3>
//                         <Link to="/contact" className="svc-cta-strip-btn">
//                             Talk to Us <FiArrowRight />
//                         </Link>
//                     </div>
//                 </section>

//                 {/* ---------- Benefits ---------- */}
//                 <section className="svc-benefits">
//                     <div className="container">
//                         <h2 className="svc-benefits-heading">Why Work With AMANAH IT</h2>
//                         <p className="svc-benefits-sub">
//                             Three things clients consistently point to when they come back for a
//                             second project.
//                         </p>
//                         <div className="svc-benefits-grid">
//                             {BENEFITS.map((b) => {
//                                 const Icon = b.icon;
//                                 return (
//                                     <div key={b.title} className="svc-benefit-card">
//                                         <span className="svc-benefit-icon"><Icon size={24} /></span>
//                                         <h4>{b.title}</h4>
//                                         <p>{b.text}</p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </section>

//                 {/* ---------- Bottom CTA ---------- */}
//                 <section className="svc-bottom-cta">
//                     <div className="container svc-bottom-cta-inner">
//                         <div>
//                             <span className="svc-bottom-eyebrow">Request a Quote</span>
//                             <h2>Need a Custom Solution for Your Business?</h2>
//                         </div>
//                         <Link to="/contact" className="svc-bottom-cta-btn">
//                             Start a Project <FiArrowRight />
//                         </Link>
//                     </div>
//                 </section>

//             </div>
//             <Footer />
//         </>
//     );
// }import { useState, useEffect } from 'react';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//     FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone,
//     FiArrowRight, FiShield, FiZap, FiHeadphones, FiCheckCircle,
// } from 'react-icons/fi';
// import api from '../../utils/api';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import './ServicesPage.css';

// const ICONS = { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone, FiShield, FiZap, FiHeadphones };

// // Fallback content — used until data loads, or if API fails.
// const FALLBACK_SERVICES = [
//     {
//         _id: '1', slug: 'web-application-development', icon: 'FiCode',
//         title: 'Web Application Development',
//         description: 'Custom, full-stack web apps built on the MERN stack.',
//         features: [
//             'React front-ends with fast, accessible interfaces',
//             'Node.js & Express APIs built for scale',
//             'MongoDB data modeling for real business logic',
//         ],
//     },
//     {
//         _id: '2', slug: 'ecommerce-solutions', icon: 'FiShoppingCart',
//         title: 'E-commerce Solutions',
//         description: 'Storefronts that are built to convert and easy to manage.',
//         features: [
//             'Custom checkout, cart & payment gateway integration',
//             'Inventory and order management dashboards',
//             'Fast, mobile-first shopping experience',
//         ],
//     },
//     {
//         _id: '3', slug: 'ui-ux-design', icon: 'FiLayout',
//         title: 'UI/UX Design',
//         description: 'Interfaces designed around how people actually use them.',
//         features: [
//             'Wireframes and prototypes before a line of code',
//             'Design systems that keep products consistent',
//             'Usability-first, not decoration-first',
//         ],
//     },
//     {
//         _id: '4', slug: 'custom-software-saas', icon: 'FiServer',
//         title: 'Custom Software & SaaS',
//         description: 'Internal tools and multi-tenant platforms built from scratch.',
//         features: [
//             'Admin panels, dashboards, and internal tools',
//             'Role-based access and subscription billing',
//             'API-first architecture for future integrations',
//         ],
//     },
//     {
//         _id: '5', slug: 'deployment-cloud-hosting', icon: 'FiCloud',
//         title: 'Deployment & Cloud Hosting',
//         description: 'From local build to production, handled end-to-end.',
//         features: [
//             'CI/CD pipelines with Vercel, Render & MongoDB Atlas',
//             'Environment configuration & secrets management',
//             'Monitoring and uptime support after launch',
//         ],
//     },
//     {
//         _id: '6', slug: 'maintenance-support', icon: 'FiSmartphone',
//         title: 'Maintenance & Support',
//         description: 'Software that keeps working after we ship it.',
//         features: [
//             'Bug fixes and security patches',
//             'Feature additions as your business grows',
//             'Direct communication, no ticket queues',
//         ],
//     },
// ];

// const DEFAULT_PAGE_HEADER = {
//     heroTitle: 'Our Services',
//     heroSubtitle: 'MERN stack development, e-commerce, and custom software — built by a team that ships and stays around to support it.',
//     introHeading: 'Software That Fits the Way You Actually Work',
//     introText: "AMANAH IT builds full-stack web applications, e-commerce platforms, and custom software using the MERN stack — React, Node.js, Express, and MongoDB. Every project is scoped around a real business problem, not a template. Below is what we handle end-to-end, from the first wireframe to production deployment.",
// };

// const DEFAULT_BENEFITS = {
//     heading: 'Why Work With AMANAH IT',
//     subtext: 'Three things clients consistently point to when they come back for a second project.',
//     items: [
//         { icon: 'FiZap', title: 'Built for Speed', text: 'We ship working software in weeks, not quarters — with clear milestones you can track.' },
//         { icon: 'FiShield', title: 'Transparent Process', text: 'Fixed scope, fixed price where possible, and no surprise revisions hidden in the fine print.' },
//         { icon: 'FiHeadphones', title: 'Support After Launch', text: "A project isn't done at deployment. We stay reachable for fixes, updates, and questions." },
//     ],
// };

// const DEFAULT_CTA_STRIP = {
//     title: 'Have a project in mind?',
//     buttonText: 'Talk to Us',
//     buttonLink: '/contact',
// };

// const DEFAULT_BOTTOM_CTA = {
//     eyebrow: 'Request a Quote',
//     heading: 'Need a Custom Solution for Your Business?',
//     buttonText: 'Start a Project',
//     buttonLink: '/contact',
// };

// export default function ServicesPage() {
//     const [services, setServices] = useState(FALLBACK_SERVICES);
//     const [pageHeader, setPageHeader] = useState(DEFAULT_PAGE_HEADER);
//     const [benefits, setBenefits] = useState(DEFAULT_BENEFITS);
//     const [ctaStrip, setCtaStrip] = useState(DEFAULT_CTA_STRIP);
//     const [bottomCta, setBottomCta] = useState(DEFAULT_BOTTOM_CTA);

//     useEffect(() => {
//         api.get('/services')
//             .then(r => { if (r.data?.length) setServices(r.data); })
//             .catch(() => { /* keep fallback content */ });

//         api.get('/home-sections')
//             .then(r => {
//                 const d = r.data || {};
//                 if (d.servicesPageHeader) {
//                     const nonEmpty = Object.fromEntries(
//                         Object.entries(d.servicesPageHeader).filter(([, v]) => v !== '' && v != null)
//                     );
//                     setPageHeader(prev => ({ ...prev, ...nonEmpty }));
//                 }
//                 if (d.servicesPageBenefits) setBenefits({ ...DEFAULT_BENEFITS, ...d.servicesPageBenefits });
//                 if (d.servicesPageCtaStrip) setCtaStrip({ ...DEFAULT_CTA_STRIP, ...d.servicesPageCtaStrip });
//                 if (d.servicesPageBottomCta) setBottomCta({ ...DEFAULT_BOTTOM_CTA, ...d.servicesPageBottomCta });
//             })
//             .catch(() => { /* keep defaults */ });
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <div className="svc-page">

//                 {/* ---------- Hero banner (now also holds the intro heading/text) ---------- */}
//                 <section className="svc-hero">
//                     <div className="svc-hero-bg" />
//                     <div className="svc-hero-overlay" />
//                     <div className="container svc-hero-content">
//                         <div className="svc-breadcrumb">
//                             <Link to="/">Home</Link>
//                             <span className="svc-crumb-sep">»</span>
//                             <span className="svc-crumb-current">Services</span>
//                         </div>
//                         <h1 className="svc-hero-title">{pageHeader.heroTitle}</h1>
//                         <p className="svc-hero-sub">{pageHeader.heroSubtitle}</p>

//                         <div className="svc-hero-intro">
//                             <span className="svc-hero-badge">Our Approach</span>
//                             <h2 className="svc-intro-heading">{pageHeader.introHeading}</h2>
//                             <p className="svc-intro-text">{pageHeader.introText}</p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* ---------- Services grid ---------- */}
//                 <section className="svc-grid-section">
//                     <div className="container">
//                         <div className="svc-grid">
//                             {services.map((s, i) => {
//                                 const Icon = ICONS[s.icon] || FiCode;
//                                 const tone = i % 3 === 0 ? 'tone-a' : i % 3 === 1 ? 'tone-b' : 'tone-c';
//                                 return (
//                                     <Link
//                                         to={s.slug ? `/services/${s.slug}` : '#'}
//                                         key={s._id || s.title}
//                                         className={`svc-card ${tone}`}
//                                         data-index={String(i + 1).padStart(2, '0')}
//                                     >
//                                         <div className="svc-card-head">
//                                             <span className="svc-card-icon"><Icon size={26} /></span>
//                                             <h3 className="svc-card-title">{s.title}</h3>
//                                         </div>
//                                         <div className="svc-card-body">
//                                             <p className="svc-card-summary">{s.description}</p>
//                                             {Array.isArray(s.features) && s.features.length > 0 && (
//                                                 <ul className="svc-card-points">
//                                                     {s.features.map((f, idx) => (
//                                                         <li key={idx}>
//                                                             <FiCheckCircle size={14} className="svc-point-icon" />
//                                                             <span>{f}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             )}
//                                             <span className="svc-card-cta">
//                                                 View Details <FiArrowRight size={14} />
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </section>

//                 {/* ---------- Mid CTA strip ---------- */}
//                 <section className="svc-cta-strip">
//                     <div className="container svc-cta-strip-inner">
//                         <h3>{ctaStrip.title}</h3>
//                         <Link to={ctaStrip.buttonLink || '/contact'} className="svc-cta-strip-btn">
//                             {ctaStrip.buttonText} <FiArrowRight />
//                         </Link>
//                     </div>
//                 </section>

//                 {/* ---------- Benefits ---------- */}
//                 <section className="svc-benefits">
//                     <div className="container">
//                         <h2 className="svc-benefits-heading">{benefits.heading}</h2>
//                         <p className="svc-benefits-sub">{benefits.subtext}</p>
//                         <div className="svc-benefits-grid">
//                             {(benefits.items || []).map((b) => {
//                                 const Icon = ICONS[b.icon] || FiZap;
//                                 return (
//                                     <div key={b.title} className="svc-benefit-card">
//                                         <span className="svc-benefit-icon"><Icon size={24} /></span>
//                                         <h4>{b.title}</h4>
//                                         <p>{b.text}</p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </section>

//                 {/* ---------- Bottom CTA ---------- */}
//                 <section className="svc-bottom-cta">
//                     <div className="container svc-bottom-cta-inner">
//                         <div>
//                             <span className="svc-bottom-eyebrow">{bottomCta.eyebrow}</span>
//                             <h2>{bottomCta.heading}</h2>
//                         </div>
//                         <Link to={bottomCta.buttonLink || '/contact'} className="svc-bottom-cta-btn">
//                             {bottomCta.buttonText} <FiArrowRight />
//                         </Link>
//                     </div>
//                 </section>

//             </div>
//             <Footer />
//         </>
//     );
// }
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone,
    FiArrowRight, FiShield, FiZap, FiHeadphones, FiCheckCircle,
} from 'react-icons/fi';
import api from '../../utils/api';
import socket from '../../utils/socket';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ServicesPage.css';

const ICONS = { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone, FiShield, FiZap, FiHeadphones };

// Fallback content — used until data loads, or if API fails.
const FALLBACK_SERVICES = [
    {
        _id: '1', slug: 'web-application-development', icon: 'FiCode',
        title: 'Web Application Development',
        description: 'Custom, full-stack web apps built on the MERN stack.',
        features: [
            'React front-ends with fast, accessible interfaces',
            'Node.js & Express APIs built for scale',
            'MongoDB data modeling for real business logic',
        ],
    },
    {
        _id: '2', slug: 'ecommerce-solutions', icon: 'FiShoppingCart',
        title: 'E-commerce Solutions',
        description: 'Storefronts that are built to convert and easy to manage.',
        features: [
            'Custom checkout, cart & payment gateway integration',
            'Inventory and order management dashboards',
            'Fast, mobile-first shopping experience',
        ],
    },
    {
        _id: '3', slug: 'ui-ux-design', icon: 'FiLayout',
        title: 'UI/UX Design',
        description: 'Interfaces designed around how people actually use them.',
        features: [
            'Wireframes and prototypes before a line of code',
            'Design systems that keep products consistent',
            'Usability-first, not decoration-first',
        ],
    },
    {
        _id: '4', slug: 'custom-software-saas', icon: 'FiServer',
        title: 'Custom Software & SaaS',
        description: 'Internal tools and multi-tenant platforms built from scratch.',
        features: [
            'Admin panels, dashboards, and internal tools',
            'Role-based access and subscription billing',
            'API-first architecture for future integrations',
        ],
    },
    {
        _id: '5', slug: 'deployment-cloud-hosting', icon: 'FiCloud',
        title: 'Deployment & Cloud Hosting',
        description: 'From local build to production, handled end-to-end.',
        features: [
            'CI/CD pipelines with Vercel, Render & MongoDB Atlas',
            'Environment configuration & secrets management',
            'Monitoring and uptime support after launch',
        ],
    },
    {
        _id: '6', slug: 'maintenance-support', icon: 'FiSmartphone',
        title: 'Maintenance & Support',
        description: 'Software that keeps working after we ship it.',
        features: [
            'Bug fixes and security patches',
            'Feature additions as your business grows',
            'Direct communication, no ticket queues',
        ],
    },
];

const DEFAULT_PAGE_HEADER = {
    heroTitle: 'Our Services',
    heroSubtitle: 'MERN stack development, e-commerce, and custom software — built by a team that ships and stays around to support it.',
    introHeading: 'Software That Fits the Way You Actually Work',
    introText: "AMANAH IT builds full-stack web applications, e-commerce platforms, and custom software using the MERN stack — React, Node.js, Express, and MongoDB. Every project is scoped around a real business problem, not a template. Below is what we handle end-to-end, from the first wireframe to production deployment.",
    heroBgType: 'image',
    heroImage: '',
};

const DEFAULT_BENEFITS = {
    heading: 'Why Work With AMANAH IT',
    subtext: 'Three things clients consistently point to when they come back for a second project.',
    items: [
        { icon: 'FiZap', title: 'Built for Speed', text: 'We ship working software in weeks, not quarters — with clear milestones you can track.' },
        { icon: 'FiShield', title: 'Transparent Process', text: 'Fixed scope, fixed price where possible, and no surprise revisions hidden in the fine print.' },
        { icon: 'FiHeadphones', title: 'Support After Launch', text: "A project isn't done at deployment. We stay reachable for fixes, updates, and questions." },
    ],
};

const DEFAULT_CTA_STRIP = {
    title: 'Have a project in mind?',
    buttonText: 'Talk to Us',
    buttonLink: '/contact',
};

const DEFAULT_BOTTOM_CTA = {
    eyebrow: 'Request a Quote',
    heading: 'Need a Custom Solution for Your Business?',
    buttonText: 'Start a Project',
    buttonLink: '/contact',
};

const PAGE_HEADER_CACHE_KEY = 'amanahit_svc_page_header';

const getInitialPageHeader = () => {
    try {
        const cached = localStorage.getItem(PAGE_HEADER_CACHE_KEY);
        if (cached) return { ...DEFAULT_PAGE_HEADER, ...JSON.parse(cached) };
    } catch { /* ignore bad/blocked storage */ }
    return DEFAULT_PAGE_HEADER;
};

export default function ServicesPage() {
    const [services, setServices] = useState(FALLBACK_SERVICES);
    const [pageHeader, setPageHeader] = useState(getInitialPageHeader);
    const [benefits, setBenefits] = useState(DEFAULT_BENEFITS);
    const [ctaStrip, setCtaStrip] = useState(DEFAULT_CTA_STRIP);
    const [bottomCta, setBottomCta] = useState(DEFAULT_BOTTOM_CTA);

    const fetchServices = () => {
        api.get('/services')
            .then(r => { if (r.data?.length) setServices(r.data); })
            .catch(() => { /* keep fallback content */ });
    };

    const applyHomeSections = (d) => {
        if (!d) return;
        if (d.servicesPageHeader) {
            const nonEmpty = Object.fromEntries(
                Object.entries(d.servicesPageHeader).filter(([, v]) => v !== '' && v != null)
            );
            setPageHeader(prev => {
                const merged = { ...prev, ...nonEmpty };
                try { localStorage.setItem(PAGE_HEADER_CACHE_KEY, JSON.stringify(merged)); } catch { /* ignore */ }
                return merged;
            });
        }
        if (d.servicesPageBenefits) setBenefits({ ...DEFAULT_BENEFITS, ...d.servicesPageBenefits });
        if (d.servicesPageCtaStrip) setCtaStrip({ ...DEFAULT_CTA_STRIP, ...d.servicesPageCtaStrip });
        if (d.servicesPageBottomCta) setBottomCta({ ...DEFAULT_BOTTOM_CTA, ...d.servicesPageBottomCta });
    };

    useEffect(() => {
        fetchServices();
        api.get('/home-sections').then(r => applyHomeSections(r.data)).catch(() => { });

        // 🔴 admin panel theke change korle instantly update, refresh lagbe na
        const handleUpdate = (event) => {
            if (event.model === 'HomeSections') {
                applyHomeSections(event.payload);
            } else if (event.model === 'Service') {
                fetchServices();
            }
        };

        socket.on('dataUpdated', handleUpdate);
        return () => socket.off('dataUpdated', handleUpdate);
    }, []);

    return (
        <>
            <Navbar />
            <div className="svc-page">

                {/* ---------- Hero banner (now also holds the intro heading/text) ---------- */}
                <section className="svc-hero">
                    <div
                        className={`svc-hero-bg ${pageHeader.heroBgType === 'image' && pageHeader.heroImage ? 'svc-hero-bg--image' : 'svc-hero-bg--gradient'}`}
                        style={pageHeader.heroBgType === 'image' && pageHeader.heroImage ? { backgroundImage: `url(${pageHeader.heroImage})` } : undefined}
                    />
                    <div className="svc-hero-overlay" />
                    <div className="container svc-hero-content">
                        <div className="svc-breadcrumb">
                            <Link to="/">Home</Link>
                            <span className="svc-crumb-sep">»</span>
                            <span className="svc-crumb-current">Services</span>
                        </div>
                        <h1 className="svc-hero-title">{pageHeader.heroTitle}</h1>
                        <p className="svc-hero-sub">{pageHeader.heroSubtitle}</p>

                        <div className="svc-hero-intro">
                            <span className="svc-hero-badge">Our Approach</span>
                            <h2 className="svc-intro-heading">{pageHeader.introHeading}</h2>
                            <p className="svc-intro-text">{pageHeader.introText}</p>
                        </div>
                    </div>
                </section>

                {/* ---------- Services grid ---------- */}
                <section className="svc-grid-section">
                    <div className="container">
                        <div className="svc-grid">
                            {services.map((s, i) => {
                                const Icon = ICONS[s.icon] || FiCode;
                                const tone = i % 3 === 0 ? 'tone-a' : i % 3 === 1 ? 'tone-b' : 'tone-c';
                                return (
                                    <Link
                                        to={s.slug ? `/services/${s.slug}` : '#'}
                                        key={s._id || s.title}
                                        className={`svc-card ${tone}`}
                                        data-index={String(i + 1).padStart(2, '0')}
                                    >
                                        <div className="svc-card-head">
                                            <span className="svc-card-icon"><Icon size={26} /></span>
                                            <h3 className="svc-card-title">{s.title}</h3>
                                        </div>
                                        <div className="svc-card-body">
                                            <p className="svc-card-summary">{s.description}</p>
                                            {Array.isArray(s.features) && s.features.length > 0 && (
                                                <ul className="svc-card-points">
                                                    {s.features.map((f, idx) => (
                                                        <li key={idx}>
                                                            <FiCheckCircle size={14} className="svc-point-icon" />
                                                            <span>{f}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            <span className="svc-card-cta">
                                                View Details <FiArrowRight size={14} />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ---------- Mid CTA strip ---------- */}
                <section className="svc-cta-strip">
                    <div className="container svc-cta-strip-inner">
                        <h3>{ctaStrip.title}</h3>
                        <Link to={ctaStrip.buttonLink || '/contact'} className="svc-cta-strip-btn">
                            {ctaStrip.buttonText} <FiArrowRight />
                        </Link>
                    </div>
                </section>

                {/* ---------- Benefits ---------- */}
                <section className="svc-benefits">
                    <div className="container">
                        <h2 className="svc-benefits-heading">{benefits.heading}</h2>
                        <p className="svc-benefits-sub">{benefits.subtext}</p>
                        <div className="svc-benefits-grid">
                            {(benefits.items || []).map((b) => {
                                const Icon = ICONS[b.icon] || FiZap;
                                return (
                                    <div key={b.title} className="svc-benefit-card">
                                        <span className="svc-benefit-icon"><Icon size={24} /></span>
                                        <h4>{b.title}</h4>
                                        <p>{b.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ---------- Bottom CTA ---------- */}
                <section className="svc-bottom-cta">
                    <div className="container svc-bottom-cta-inner">
                        <div>
                            <span className="svc-bottom-eyebrow">{bottomCta.eyebrow}</span>
                            <h2>{bottomCta.heading}</h2>
                        </div>
                        <Link to={bottomCta.buttonLink || '/contact'} className="svc-bottom-cta-btn">
                            {bottomCta.buttonText} <FiArrowRight />
                        </Link>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
}