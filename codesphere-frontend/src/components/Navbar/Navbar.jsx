
// import { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//     FiPhone, FiMail, FiFacebook, FiInstagram, FiLinkedin,
//     FiTwitter, FiYoutube, FiChevronDown, FiMenu, FiX, FiArrowUpRight
// } from 'react-icons/fi';
// import './Navbar.css';

// const SERVICES_DATA = {
//     'it-consultancy': {
//         label: 'IT Consultancy',
//         items: [
//             { title: 'IT Strategy and Planning', desc: 'Assisting clients in aligning their IT initiatives with their overall business objectives.' },
//             { title: 'IT Project Management', desc: 'Managing and overseeing IT projects from initiation to completion.' },
//             { title: 'Software Development and Integration', desc: 'Assisting clients in developing custom software solutions.' },
//             { title: 'Data Analytics and Business Intelligence', desc: 'Helping clients make data-driven decisions by implementing analytics solutions.' },
//         ]
//     },
//     'managed-it': {
//         label: 'Managed IT',
//         items: [
//             { title: '24/7 Infrastructure Monitoring', desc: 'Round-the-clock monitoring to keep your systems running smoothly.' },
//             { title: 'Network & Server Management', desc: 'Proactive management of your network and server infrastructure.' },
//             { title: 'Helpdesk Support', desc: 'Responsive helpdesk support for your team whenever issues arise.' },
//             { title: 'Backup & Disaster Recovery', desc: 'Reliable backup solutions to protect your business data.' },
//         ]
//     },
//     'digital-marketing': {
//         label: 'Digital Marketing',
//         items: [
//             { title: 'SEO Optimization', desc: 'Rank higher on search engines and attract organic traffic.' },
//             { title: 'Social Media Marketing', desc: 'Engage your audience across platforms with curated content.' },
//             { title: 'PPC & Ad Campaigns', desc: 'Targeted paid campaigns that maximize your return on investment.' },
//             { title: 'Content Marketing', desc: 'Compelling content strategies that build brand authority.' },
//         ]
//     },
//     'brand-promotion': {
//         label: 'Brand & Promotion',
//         items: [
//             { title: 'Brand Identity Design', desc: 'Distinct visual identity that reflects your business values.' },
//             { title: 'Promotional Campaigns', desc: 'Creative campaigns to boost visibility and engagement.' },
//         ]
//     },
//     'domain-hosting': {
//         label: 'Domain & Hosting',
//         items: [
//             { title: 'Domain Registration', desc: 'Secure the perfect domain name for your brand.' },
//             { title: 'Cloud Hosting', desc: 'Secure cloud hosting with 99.9% uptime guarantee.' },
//             { title: 'CI/CD Pipeline', desc: 'Automated deployment pipelines for faster and reliable releases.' },
//         ]
//     },
//     'technology-training': {
//         label: 'Technology Training',
//         items: [
//             { title: 'Corporate IT Training', desc: 'Upskill your team with hands-on technology training programs.' },
//             { title: 'Developer Workshops', desc: 'In-depth workshops on modern frameworks and best practices.' },
//         ]
//     },
//     'offshore-development': {
//         label: 'Offshore Development',
//         items: [
//             { title: 'Dedicated Development Teams', desc: 'Scalable offshore teams working as an extension of your business.' },
//             { title: 'Cost-Effective Outsourcing', desc: 'High-quality development at competitive offshore rates.' },
//         ]
//     },
// };

// const SOLUTIONS_DATA = {
//     'startup': {
//         label: 'For Startups',
//         items: [
//             { title: 'MVP Development', desc: 'Launch your product fast with a minimum viable product built to scale.' },
//             { title: 'Product Strategy', desc: 'From idea to execution — we help you plan your digital product roadmap.' },
//         ]
//     },
//     'enterprise': {
//         label: 'For Enterprise',
//         items: [
//             { title: 'Digital Transformation', desc: 'Modernize legacy systems and digitize business operations.' },
//             { title: 'ERP Integration', desc: 'Seamlessly integrate ERP systems for better operational efficiency.' },
//         ]
//     },
//     'ecommerce': {
//         label: 'E-Commerce',
//         items: [
//             { title: 'Online Store Setup', desc: 'Complete e-commerce setup from design to payment integration.' },
//             { title: 'Inventory Management', desc: 'Smart inventory tools to keep your stock always in control.' },
//         ]
//     },
//     'education': {
//         label: 'Education & Training',
//         items: [
//             { title: 'LMS Development', desc: 'Custom learning management systems for online education platforms.' },
//             { title: 'Corporate Training Portal', desc: 'Internal training portals to upskill your workforce.' },
//         ]
//     },
// };

// export default function Navbar() {
//     const [open, setOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [servicesOpen, setServicesOpen] = useState(false);
//     const [solutionsOpen, setSolutionsOpen] = useState(false);
//     const [activeServiceTab, setActiveServiceTab] = useState('it-consultancy');
//     const [activeSolutionTab, setActiveSolutionTab] = useState('startup');
//     const location = useLocation();

//     const servicesTimer = useRef(null);
//     const solutionsTimer = useRef(null);

//     const openServices = () => {
//         clearTimeout(servicesTimer.current);
//         clearTimeout(solutionsTimer.current);
//         setSolutionsOpen(false);
//         setServicesOpen(true);
//     };
//     const closeServices = () => {
//         servicesTimer.current = setTimeout(() => setServicesOpen(false), 150);
//     };
//     const keepServices = () => {
//         clearTimeout(servicesTimer.current);
//     };

//     const openSolutions = () => {
//         clearTimeout(solutionsTimer.current);
//         clearTimeout(servicesTimer.current);
//         setServicesOpen(false);
//         setSolutionsOpen(true);
//     };
//     const closeSolutions = () => {
//         solutionsTimer.current = setTimeout(() => setSolutionsOpen(false), 150);
//     };
//     const keepSolutions = () => {
//         clearTimeout(solutionsTimer.current);
//     };

//     useEffect(() => {
//         const onScroll = () => setScrolled(window.scrollY > 20);
//         window.addEventListener('scroll', onScroll);
//         return () => window.removeEventListener('scroll', onScroll);
//     }, []);

//     useEffect(() => {
//         setOpen(false);
//         setServicesOpen(false);
//         setSolutionsOpen(false);
//     }, [location]);

//     return (
//         <div className="header-wrapper">
//             {/* Top Bar */}
//             <div className="top-bar">
//                 <div className="top-bar-container">
//                     <div className="top-bar-left">
//                         <a href="tel:+8801800000000" className="top-info-link">
//                             <FiPhone className="green-icon" /> +880 1800-000000
//                         </a>
//                         <a href="mailto:info@amanahit.com" className="top-info-link">
//                             <FiMail className="green-icon" /> info@amanahit.com
//                         </a>
//                     </div>
//                     <div className="social-links">
//                         <a href="#" className="social-icon"><FiFacebook /></a>
//                         <a href="#" className="social-icon"><FiInstagram /></a>
//                         <a href="#" className="social-icon"><FiLinkedin /></a>
//                         <a href="#" className="social-icon"><FiTwitter /></a>
//                         <a href="#" className="social-icon"><FiYoutube /></a>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Nav */}
//             <div className="main-nav-container">
//                 <nav className={`navbar-floating ${scrolled ? 'scrolled' : ''}`}>

//                     {/* Logo */}
//                     <Link to="/" className="navbar-logo-text" onClick={() => { setServicesOpen(false); setSolutionsOpen(false); }}>
//                         Amanah<span className="logo-dot">.IT</span>
//                     </Link>

//                     <ul className="nav-menu-links">
//                         <li><Link to="/" className="menu-item">Home</Link></li>
//                         <li><Link to="/explore-us" className="menu-item">Explore Us</Link></li>

//                         {/* Services Mega Menu */}
//                         <li
//                             className="nav-dropdown-wrapper"
//                             onMouseEnter={openServices}
//                             onMouseLeave={closeServices}
//                         >
//                             <Link to="/services" className="menu-item dropdown-trigger">
//                                 Services <FiChevronDown className={`dropdown-arrow ${servicesOpen ? 'rotate' : ''}`} />
//                             </Link>

//                             {servicesOpen && (
//                                 <div
//                                     className="mega-menu-container"
//                                     onMouseEnter={keepServices}
//                                     onMouseLeave={closeServices}
//                                 >
//                                     <div className="mega-menu-inner">
//                                         <div className="mega-menu-sidebar">
//                                             {Object.keys(SERVICES_DATA).map((tabKey) => (
//                                                 <button
//                                                     type="button"
//                                                     key={tabKey}
//                                                     className={`sidebar-item ${activeServiceTab === tabKey ? 'active' : ''}`}
//                                                     onMouseEnter={() => setActiveServiceTab(tabKey)}
//                                                     onClick={() => setActiveServiceTab(tabKey)}
//                                                 >
//                                                     {SERVICES_DATA[tabKey].label}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                         <div className="mega-menu-content">
//                                             <div className="content-grid-wrapper">
//                                                 {SERVICES_DATA[activeServiceTab].items.map((item, index) => (
//                                                     <Link
//                                                         to="/services"
//                                                         key={index}
//                                                         className="content-item-box"
//                                                     >
//                                                         <h4>{item.title}</h4>
//                                                         <p>{item.desc}</p>
//                                                     </Link>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </li>

//                         {/* Solutions Mega Menu */}
//                         <li
//                             className="nav-dropdown-wrapper"
//                             onMouseEnter={openSolutions}
//                             onMouseLeave={closeSolutions}
//                         >
//                             <Link to="/solutions" className="menu-item dropdown-trigger">
//                                 Solutions <FiChevronDown className={`dropdown-arrow ${solutionsOpen ? 'rotate' : ''}`} />
//                             </Link>

//                             {solutionsOpen && (
//                                 <div
//                                     className="mega-menu-container"
//                                     onMouseEnter={keepSolutions}
//                                     onMouseLeave={closeSolutions}
//                                 >
//                                     <div className="mega-menu-inner">
//                                         <div className="mega-menu-sidebar">
//                                             {Object.keys(SOLUTIONS_DATA).map((tabKey) => (
//                                                 <button
//                                                     type="button"
//                                                     key={tabKey}
//                                                     className={`sidebar-item ${activeSolutionTab === tabKey ? 'active' : ''}`}
//                                                     onMouseEnter={() => setActiveSolutionTab(tabKey)}
//                                                     onClick={() => setActiveSolutionTab(tabKey)}
//                                                 >
//                                                     {SOLUTIONS_DATA[tabKey].label}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                         <div className="mega-menu-content">
//                                             <div className="content-grid-wrapper">
//                                                 {SOLUTIONS_DATA[activeSolutionTab].items.map((item, index) => (
//                                                     <Link
//                                                         to="/solutions"
//                                                         key={index}
//                                                         className="content-item-box"
//                                                     >
//                                                         <h4>{item.title}</h4>
//                                                         <p>{item.desc}</p>
//                                                     </Link>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </li>

//                         <li><Link to="/latest-articles" className="menu-item">Latest Articles</Link></li>
                  
//                         <li><Link to="/contact" className="menu-item">Contact</Link></li>
//                     </ul>

//                     <div className="nav-actions">
//                         <Link to="/contact" className="btn-brochure">
//                             Brochure <FiArrowUpRight className="brochure-arrow" />
//                         </Link>
//                         <button className="grid-menu-btn" aria-label="Grid menu">
//                             <span className="grid-dot-icon"></span>
//                         </button>
//                         <button className="mobile-toggle-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
//                             {open ? <FiX /> : <FiMenu />}
//                         </button>
//                     </div>
//                 </nav>
//             </div>
//         </div>
//     );
// }
// import { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//     FiPhone, FiMail, FiFacebook, FiInstagram, FiLinkedin,
//     FiTwitter, FiYoutube, FiChevronDown, FiMenu, FiX, FiDownload
// } from 'react-icons/fi';
// import './Navbar.css';

// const SERVICES_DATA = {
//     'it-consultancy': {
//         label: 'IT Consultancy',
//         items: [
//             { title: 'IT Strategy and Planning', desc: 'Assisting clients in aligning their IT initiatives with their overall business objectives.' },
//             { title: 'IT Project Management', desc: 'Managing and overseeing IT projects from initiation to completion.' },
//             { title: 'Software Development and Integration', desc: 'Assisting clients in developing custom software solutions.' },
//             { title: 'Data Analytics and Business Intelligence', desc: 'Helping clients make data-driven decisions by implementing analytics solutions.' },
//         ]
//     },
//     'managed-it': {
//         label: 'Managed IT',
//         items: [
//             { title: '24/7 Infrastructure Monitoring', desc: 'Round-the-clock monitoring to keep your systems running smoothly.' },
//             { title: 'Network & Server Management', desc: 'Proactive management of your network and server infrastructure.' },
//             { title: 'Helpdesk Support', desc: 'Responsive helpdesk support for your team whenever issues arise.' },
//             { title: 'Backup & Disaster Recovery', desc: 'Reliable backup solutions to protect your business data.' },
//         ]
//     },
//     'digital-marketing': {
//         label: 'Digital Marketing',
//         items: [
//             { title: 'SEO Optimization', desc: 'Rank higher on search engines and attract organic traffic.' },
//             { title: 'Social Media Marketing', desc: 'Engage your audience across platforms with curated content.' },
//             { title: 'PPC & Ad Campaigns', desc: 'Targeted paid campaigns that maximize your return on investment.' },
//             { title: 'Content Marketing', desc: 'Compelling content strategies that build brand authority.' },
//         ]
//     },
//     'brand-promotion': {
//         label: 'Brand & Promotion',
//         items: [
//             { title: 'Brand Identity Design', desc: 'Distinct visual identity that reflects your business values.' },
//             { title: 'Promotional Campaigns', desc: 'Creative campaigns to boost visibility and engagement.' },
//         ]
//     },
//     'domain-hosting': {
//         label: 'Domain & Hosting',
//         items: [
//             { title: 'Domain Registration', desc: 'Secure the perfect domain name for your brand.' },
//             { title: 'Cloud Hosting', desc: 'Secure cloud hosting with 99.9% uptime guarantee.' },
//             { title: 'CI/CD Pipeline', desc: 'Automated deployment pipelines for faster and reliable releases.' },
//         ]
//     },
//     'technology-training': {
//         label: 'Technology Training',
//         items: [
//             { title: 'Corporate IT Training', desc: 'Upskill your team with hands-on technology training programs.' },
//             { title: 'Developer Workshops', desc: 'In-depth workshops on modern frameworks and best practices.' },
//         ]
//     },
//     'offshore-development': {
//         label: 'Offshore Development',
//         items: [
//             { title: 'Dedicated Development Teams', desc: 'Scalable offshore teams working as an extension of your business.' },
//             { title: 'Cost-Effective Outsourcing', desc: 'High-quality development at competitive offshore rates.' },
//         ]
//     },
// };

// const SOLUTIONS_DATA = {
//     'startup': {
//         label: 'For Startups',
//         items: [
//             { title: 'MVP Development', desc: 'Launch your product fast with a minimum viable product built to scale.' },
//             { title: 'Product Strategy', desc: 'From idea to execution — we help you plan your digital product roadmap.' },
//         ]
//     },
//     'enterprise': {
//         label: 'For Enterprise',
//         items: [
//             { title: 'Digital Transformation', desc: 'Modernize legacy systems and digitize business operations.' },
//             { title: 'ERP Integration', desc: 'Seamlessly integrate ERP systems for better operational efficiency.' },
//         ]
//     },
//     'ecommerce': {
//         label: 'E-Commerce',
//         items: [
//             { title: 'Online Store Setup', desc: 'Complete e-commerce setup from design to payment integration.' },
//             { title: 'Inventory Management', desc: 'Smart inventory tools to keep your stock always in control.' },
//         ]
//     },
//     'education': {
//         label: 'Education & Training',
//         items: [
//             { title: 'LMS Development', desc: 'Custom learning management systems for online education platforms.' },
//             { title: 'Corporate Training Portal', desc: 'Internal training portals to upskill your workforce.' },
//         ]
//     },
// };

// // ✅ তোমার company-র real social media links এখানে দাও
// const SOCIAL_LINKS = [
//     { icon: FiFacebook, href: 'https://facebook.com/amanahit', label: 'Facebook' },
//     { icon: FiInstagram, href: 'https://instagram.com/amanahit', label: 'Instagram' },
//     { icon: FiLinkedin, href: 'https://linkedin.com/company/amanahit', label: 'LinkedIn' },
//     { icon: FiTwitter, href: 'https://twitter.com/amanahit', label: 'Twitter' },
//     { icon: FiYoutube, href: 'https://youtube.com/@amanahit', label: 'YouTube' },
// ];

// export default function Navbar() {
//     const [open, setOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [servicesOpen, setServicesOpen] = useState(false);
//     const [solutionsOpen, setSolutionsOpen] = useState(false);
//     const [activeServiceTab, setActiveServiceTab] = useState('it-consultancy');
//     const [activeSolutionTab, setActiveSolutionTab] = useState('startup');
//     const location = useLocation();

//     const servicesTimer = useRef(null);
//     const solutionsTimer = useRef(null);

//     const openServices = () => {
//         clearTimeout(servicesTimer.current);
//         clearTimeout(solutionsTimer.current);
//         setSolutionsOpen(false);
//         setServicesOpen(true);
//     };
//     const closeServices = () => {
//         servicesTimer.current = setTimeout(() => setServicesOpen(false), 150);
//     };
//     const keepServices = () => {
//         clearTimeout(servicesTimer.current);
//     };

//     const openSolutions = () => {
//         clearTimeout(solutionsTimer.current);
//         clearTimeout(servicesTimer.current);
//         setServicesOpen(false);
//         setSolutionsOpen(true);
//     };
//     const closeSolutions = () => {
//         solutionsTimer.current = setTimeout(() => setSolutionsOpen(false), 150);
//     };
//     const keepSolutions = () => {
//         clearTimeout(solutionsTimer.current);
//     };

//     useEffect(() => {
//         const onScroll = () => setScrolled(window.scrollY > 20);
//         window.addEventListener('scroll', onScroll);
//         return () => window.removeEventListener('scroll', onScroll);
//     }, []);

//     useEffect(() => {
//         setOpen(false);
//         setServicesOpen(false);
//         setSolutionsOpen(false);
//     }, [location]);

//     return (
//         <div className="header-wrapper">
//             {/* Top Bar */}
//             <div className="top-bar">
//                 <div className="top-bar-container">
//                     <div className="top-bar-left">
//                         <a href="tel:+8801800000000" className="top-info-link">
//                             <FiPhone className="green-icon" /> +880 1800-000000
//                         </a>
//                         <a href="mailto:info@amanahit.com" className="top-info-link">
//                             <FiMail className="green-icon" /> info@amanahit.com
//                         </a>
//                     </div>

//                     {/* ✅ Social Icons — clickable with real links */}
//                     <div className="social-links">
//                         {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
//                             <a
//                                 key={label}
//                                 href={href}
//                                 className="social-icon"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label={label}
//                             >
//                                 <Icon />
//                             </a>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Main Nav */}
//             <div className="main-nav-container">
//                 <nav className={`navbar-floating ${scrolled ? 'scrolled' : ''}`}>

//                     {/* Logo */}
//                     <Link to="/" className="navbar-logo-text" onClick={() => { setServicesOpen(false); setSolutionsOpen(false); }}>
//                         Amanah<span className="logo-dot">.IT</span>
//                     </Link>

//                     <ul className="nav-menu-links">
//                         <li><Link to="/" className="menu-item">Home</Link></li>
//                         <li><Link to="/explore-us" className="menu-item">Explore Us</Link></li>

//                         {/* Services Mega Menu */}
//                         <li
//                             className="nav-dropdown-wrapper"
//                             onMouseEnter={openServices}
//                             onMouseLeave={closeServices}
//                         >
//                             <Link to="/services" className="menu-item dropdown-trigger">
//                                 Services <FiChevronDown className={`dropdown-arrow ${servicesOpen ? 'rotate' : ''}`} />
//                             </Link>

//                             {servicesOpen && (
//                                 <div
//                                     className="mega-menu-container"
//                                     onMouseEnter={keepServices}
//                                     onMouseLeave={closeServices}
//                                 >
//                                     <div className="mega-menu-inner">
//                                         <div className="mega-menu-sidebar">
//                                             {Object.keys(SERVICES_DATA).map((tabKey) => (
//                                                 <button
//                                                     type="button"
//                                                     key={tabKey}
//                                                     className={`sidebar-item ${activeServiceTab === tabKey ? 'active' : ''}`}
//                                                     onMouseEnter={() => setActiveServiceTab(tabKey)}
//                                                     onClick={() => setActiveServiceTab(tabKey)}
//                                                 >
//                                                     {SERVICES_DATA[tabKey].label}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                         <div className="mega-menu-content">
//                                             <div className="content-grid-wrapper">
//                                                 {SERVICES_DATA[activeServiceTab].items.map((item, index) => (
//                                                     <Link
//                                                         to="/services"
//                                                         key={index}
//                                                         className="content-item-box"
//                                                     >
//                                                         <h4>{item.title}</h4>
//                                                         <p>{item.desc}</p>
//                                                     </Link>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </li>

//                         {/* Solutions Mega Menu */}
//                         <li
//                             className="nav-dropdown-wrapper"
//                             onMouseEnter={openSolutions}
//                             onMouseLeave={closeSolutions}
//                         >
//                             <Link to="/solutions" className="menu-item dropdown-trigger">
//                                 Solutions <FiChevronDown className={`dropdown-arrow ${solutionsOpen ? 'rotate' : ''}`} />
//                             </Link>

//                             {solutionsOpen && (
//                                 <div
//                                     className="mega-menu-container"
//                                     onMouseEnter={keepSolutions}
//                                     onMouseLeave={closeSolutions}
//                                 >
//                                     <div className="mega-menu-inner">
//                                         <div className="mega-menu-sidebar">
//                                             {Object.keys(SOLUTIONS_DATA).map((tabKey) => (
//                                                 <button
//                                                     type="button"
//                                                     key={tabKey}
//                                                     className={`sidebar-item ${activeSolutionTab === tabKey ? 'active' : ''}`}
//                                                     onMouseEnter={() => setActiveSolutionTab(tabKey)}
//                                                     onClick={() => setActiveSolutionTab(tabKey)}
//                                                 >
//                                                     {SOLUTIONS_DATA[tabKey].label}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                         <div className="mega-menu-content">
//                                             <div className="content-grid-wrapper">
//                                                 {SOLUTIONS_DATA[activeSolutionTab].items.map((item, index) => (
//                                                     <Link
//                                                         to="/solutions"
//                                                         key={index}
//                                                         className="content-item-box"
//                                                     >
//                                                         <h4>{item.title}</h4>
//                                                         <p>{item.desc}</p>
//                                                     </Link>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </li>

//                         <li><Link to="/latest-articles" className="menu-item">Latest Articles</Link></li>
//                         <li><Link to="/contact" className="menu-item">Contact</Link></li>
//                     </ul>

//                     <div className="nav-actions">
//                         {/* ✅ Brochure Button — PDF link দাও href-এ */}
//                         <a
//                             href="/brochure.pdf"
//                             className="btn-brochure"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             download
//                         >
//                             Brochure <FiDownload className="brochure-arrow" />
//                         </a>
//                         <button className="grid-menu-btn" aria-label="Grid menu">
//                             <span className="grid-dot-icon"></span>
//                         </button>
//                         <button className="mobile-toggle-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
//                             {open ? <FiX /> : <FiMenu />}
//                         </button>
//                     </div>
//                 </nav>
//             </div>
//         </div>
//     );
// }
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FiPhone, FiMail, FiFacebook, FiInstagram, FiLinkedin,
    FiTwitter, FiYoutube, FiChevronDown, FiMenu, FiX, FiDownload
} from 'react-icons/fi';
import './Navbar.css';

const SERVICES_DATA = {
    'it-consultancy': {
        label: 'IT Consultancy',
        items: [
            { title: 'IT Strategy and Planning', desc: 'Assisting clients in aligning their IT initiatives with their overall business objectives.' },
            { title: 'IT Project Management', desc: 'Managing and overseeing IT projects from initiation to completion.' },
            { title: 'Software Development and Integration', desc: 'Assisting clients in developing custom software solutions.' },
            { title: 'Data Analytics and Business Intelligence', desc: 'Helping clients make data-driven decisions by implementing analytics solutions.' },
        ]
    },
    'managed-it': {
        label: 'Managed IT',
        items: [
            { title: '24/7 Infrastructure Monitoring', desc: 'Round-the-clock monitoring to keep your systems running smoothly.' },
            { title: 'Network & Server Management', desc: 'Proactive management of your network and server infrastructure.' },
            { title: 'Helpdesk Support', desc: 'Responsive helpdesk support for your team whenever issues arise.' },
            { title: 'Backup & Disaster Recovery', desc: 'Reliable backup solutions to protect your business data.' },
        ]
    },
    'digital-marketing': {
        label: 'Digital Marketing',
        items: [
            { title: 'SEO Optimization', desc: 'Rank higher on search engines and attract organic traffic.' },
            { title: 'Social Media Marketing', desc: 'Engage your audience across platforms with curated content.' },
            { title: 'PPC & Ad Campaigns', desc: 'Targeted paid campaigns that maximize your return on investment.' },
            { title: 'Content Marketing', desc: 'Compelling content strategies that build brand authority.' },
        ]
    },
    'brand-promotion': {
        label: 'Brand & Promotion',
        items: [
            { title: 'Brand Identity Design', desc: 'Distinct visual identity that reflects your business values.' },
            { title: 'Promotional Campaigns', desc: 'Creative campaigns to boost visibility and engagement.' },
        ]
    },
    'domain-hosting': {
        label: 'Domain & Hosting',
        items: [
            { title: 'Domain Registration', desc: 'Secure the perfect domain name for your brand.' },
            { title: 'Cloud Hosting', desc: 'Secure cloud hosting with 99.9% uptime guarantee.' },
            { title: 'CI/CD Pipeline', desc: 'Automated deployment pipelines for faster and reliable releases.' },
        ]
    },
    'technology-training': {
        label: 'Technology Training',
        items: [
            { title: 'Corporate IT Training', desc: 'Upskill your team with hands-on technology training programs.' },
            { title: 'Developer Workshops', desc: 'In-depth workshops on modern frameworks and best practices.' },
        ]
    },
    'offshore-development': {
        label: 'Offshore Development',
        items: [
            { title: 'Dedicated Development Teams', desc: 'Scalable offshore teams working as an extension of your business.' },
            { title: 'Cost-Effective Outsourcing', desc: 'High-quality development at competitive offshore rates.' },
        ]
    },
};

const SOLUTIONS_DATA = {
    'startup': {
        label: 'For Startups',
        items: [
            { title: 'MVP Development', desc: 'Launch your product fast with a minimum viable product built to scale.' },
            { title: 'Product Strategy', desc: 'From idea to execution — we help you plan your digital product roadmap.' },
        ]
    },
    'enterprise': {
        label: 'For Enterprise',
        items: [
            { title: 'Digital Transformation', desc: 'Modernize legacy systems and digitize business operations.' },
            { title: 'ERP Integration', desc: 'Seamlessly integrate ERP systems for better operational efficiency.' },
        ]
    },
    'ecommerce': {
        label: 'E-Commerce',
        items: [
            { title: 'Online Store Setup', desc: 'Complete e-commerce setup from design to payment integration.' },
            { title: 'Inventory Management', desc: 'Smart inventory tools to keep your stock always in control.' },
        ]
    },
    'education': {
        label: 'Education & Training',
        items: [
            { title: 'LMS Development', desc: 'Custom learning management systems for online education platforms.' },
            { title: 'Corporate Training Portal', desc: 'Internal training portals to upskill your workforce.' },
        ]
    },
};

// ✅ তোমার company-র real social media links এখানে দাও
const SOCIAL_LINKS = [
    { icon: FiFacebook, href: 'https://facebook.com/amanahit', label: 'Facebook' },
    { icon: FiInstagram, href: 'https://instagram.com/amanahit', label: 'Instagram' },
    { icon: FiLinkedin, href: 'https://linkedin.com/company/amanahit', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/amanahit', label: 'Twitter' },
    { icon: FiYoutube, href: 'https://youtube.com/@amanahit', label: 'YouTube' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [activeServiceTab, setActiveServiceTab] = useState('it-consultancy');
    const [activeSolutionTab, setActiveSolutionTab] = useState('startup');
    const location = useLocation();

    const servicesTimer = useRef(null);
    const solutionsTimer = useRef(null);

    const openServices = () => {
        clearTimeout(servicesTimer.current);
        clearTimeout(solutionsTimer.current);
        setSolutionsOpen(false);
        setServicesOpen(true);
    };
    const closeServices = () => {
        servicesTimer.current = setTimeout(() => setServicesOpen(false), 150);
    };
    const keepServices = () => {
        clearTimeout(servicesTimer.current);
    };

    const openSolutions = () => {
        clearTimeout(solutionsTimer.current);
        clearTimeout(servicesTimer.current);
        setServicesOpen(false);
        setSolutionsOpen(true);
    };
    const closeSolutions = () => {
        solutionsTimer.current = setTimeout(() => setSolutionsOpen(false), 150);
    };
    const keepSolutions = () => {
        clearTimeout(solutionsTimer.current);
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
        setServicesOpen(false);
        setSolutionsOpen(false);
    }, [location]);

    return (
        <div className="header-wrapper">
            {/* Top Bar */}
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="top-bar-left">
                        <a href="tel:+8801800000000" className="top-info-link">
                            <FiPhone className="green-icon" /> +880 1800-000000
                        </a>
                        <a href="mailto:info@amanahit.com" className="top-info-link">
                            <FiMail className="green-icon" /> info@amanahit.com
                        </a>
                    </div>

                    {/* ✅ Social Icons — clickable with real links */}
                    <div className="social-links">
                        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                className="social-icon"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <div className="main-nav-container">
                <nav className={`navbar-floating ${scrolled ? 'scrolled' : ''}`}>

                    {/* Logo */}
                    <Link to="/" className="navbar-logo-text" onClick={() => { setServicesOpen(false); setSolutionsOpen(false); }}>
                        Amanah<span className="logo-dot">.IT</span>
                    </Link>

                    <ul className={`nav-menu-links ${open ? 'mobile-open' : ''}`}>
                        <li><Link to="/" className="menu-item">Home</Link></li>
                        <li><Link to="/explore-us" className="menu-item">Explore Us</Link></li>

                        {/* Services Mega Menu */}
                        <li
                            className="nav-dropdown-wrapper"
                            onMouseEnter={openServices}
                            onMouseLeave={closeServices}
                        >
                            <Link to="/services" className="menu-item dropdown-trigger">
                                Services <FiChevronDown className={`dropdown-arrow ${servicesOpen ? 'rotate' : ''}`} />
                            </Link>

                            {servicesOpen && (
                                <div
                                    className="mega-menu-container"
                                    onMouseEnter={keepServices}
                                    onMouseLeave={closeServices}
                                >
                                    <div className="mega-menu-inner">
                                        <div className="mega-menu-sidebar">
                                            {Object.keys(SERVICES_DATA).map((tabKey) => (
                                                <button
                                                    type="button"
                                                    key={tabKey}
                                                    className={`sidebar-item ${activeServiceTab === tabKey ? 'active' : ''}`}
                                                    onMouseEnter={() => setActiveServiceTab(tabKey)}
                                                    onClick={() => setActiveServiceTab(tabKey)}
                                                >
                                                    {SERVICES_DATA[tabKey].label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mega-menu-content">
                                            <div className="content-grid-wrapper">
                                                {SERVICES_DATA[activeServiceTab].items.map((item, index) => (
                                                    <Link
                                                        to="/services"
                                                        key={index}
                                                        className="content-item-box"
                                                    >
                                                        <h4>{item.title}</h4>
                                                        <p>{item.desc}</p>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* Solutions Mega Menu */}
                        <li
                            className="nav-dropdown-wrapper"
                            onMouseEnter={openSolutions}
                            onMouseLeave={closeSolutions}
                        >
                            <Link to="/solutions" className="menu-item dropdown-trigger">
                                Solutions <FiChevronDown className={`dropdown-arrow ${solutionsOpen ? 'rotate' : ''}`} />
                            </Link>

                            {solutionsOpen && (
                                <div
                                    className="mega-menu-container"
                                    onMouseEnter={keepSolutions}
                                    onMouseLeave={closeSolutions}
                                >
                                    <div className="mega-menu-inner">
                                        <div className="mega-menu-sidebar">
                                            {Object.keys(SOLUTIONS_DATA).map((tabKey) => (
                                                <button
                                                    type="button"
                                                    key={tabKey}
                                                    className={`sidebar-item ${activeSolutionTab === tabKey ? 'active' : ''}`}
                                                    onMouseEnter={() => setActiveSolutionTab(tabKey)}
                                                    onClick={() => setActiveSolutionTab(tabKey)}
                                                >
                                                    {SOLUTIONS_DATA[tabKey].label}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mega-menu-content">
                                            <div className="content-grid-wrapper">
                                                {SOLUTIONS_DATA[activeSolutionTab].items.map((item, index) => (
                                                    <Link
                                                        to="/solutions"
                                                        key={index}
                                                        className="content-item-box"
                                                    >
                                                        <h4>{item.title}</h4>
                                                        <p>{item.desc}</p>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        <li><Link to="/latest-articles" className="menu-item">Latest Articles</Link></li>
                        <li><Link to="/contact" className="menu-item">Contact</Link></li>
                    </ul>

                    <div className="nav-actions">
                        {/* ✅ Brochure Button — PDF link দাও href-এ */}
                        <a
                            href="/brochure.pdf"
                            className="btn-brochure"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            Brochure <FiDownload className="brochure-arrow" />
                        </a>
                        <button className="grid-menu-btn" aria-label="Grid menu">
                            <span className="grid-dot-icon"></span>
                        </button>
                        <button className="mobile-toggle-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                            {open ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
}