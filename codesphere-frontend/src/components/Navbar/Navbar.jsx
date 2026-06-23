// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FiMenu, FiX } from 'react-icons/fi';
// import logo from '../../assets/Mywebsitelogo.png';
// import './Navbar.css';

// const navLinks = [
//     { label: 'Services', href: '#services' },
//     { label: 'Portfolio', href: '#portfolio' },
//     { label: 'Team', href: '#team' },
//     { label: 'Testimonials', href: '#testimonials' },
//     { label: 'Contact', href: '#contact' },
// ];

// export default function Navbar() {
//     const [open, setOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const location = useLocation();

//     useEffect(() => {
//         const onScroll = () => setScrolled(window.scrollY > 20);
//         window.addEventListener('scroll', onScroll);
//         return () => window.removeEventListener('scroll', onScroll);
//     }, []);

//     useEffect(() => { setOpen(false); }, [location]);

//     const handleScroll = (e, href) => {
//         e.preventDefault();
//         setOpen(false);
//         const el = document.querySelector(href);
//         if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     };

//     return (
//         <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//             <div className="container navbar-inner">
//                 <Link to="/" className="navbar-logo">
//                     <img src={logo} alt="AMANAH IT" className="logo-img" />
//                 </Link>

//                 <ul className="navbar-links">
//                     {navLinks.map(l => (
//                         <li key={l.label}>
//                             <a href={l.href} onClick={(e) => handleScroll(e, l.href)}>
//                                 {l.label}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>

//                 <div className="navbar-cta">
//                     <Link to="/admin" className="btn btn-outline navbar-admin-btn">Admin</Link>
//                     <a href="#contact" className="btn btn-primary" onClick={(e) => handleScroll(e, '#contact')}>
//                         Get a Quote
//                     </a>
//                 </div>

//                 <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
//                     {open ? <FiX size={24} /> : <FiMenu size={24} />}
//                 </button>
//             </div>

//             <div className={`mobile-menu ${open ? 'open' : ''}`}>
//                 <ul>
//                     {navLinks.map(l => (
//                         <li key={l.label}>
//                             <a href={l.href} onClick={(e) => handleScroll(e, l.href)}>
//                                 {l.label}
//                             </a>
//                         </li>
//                     ))}
//                     <li>
//                         <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
//                     </li>
//                     <li>
//                         <a href="#contact" className="mobile-cta" onClick={(e) => handleScroll(e, '#contact')}>
//                             Get a Quote
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// }
// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FiMenu, FiX, FiPhone, FiMail, FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';
// import logo from '../../assets/Mywebsitelogo.png';
// import './Navbar.css';

// const navLinks = [
//     { label: 'Services', href: '#services' },
//     { label: 'Portfolio', href: '#portfolio' },
//     { label: 'Team', href: '#team' },
//     { label: 'Testimonials', href: '#testimonials' },
//     { label: 'Contact', href: '#contact' },
// ];

// export default function Navbar() {
//     const [open, setOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const location = useLocation();

//     useEffect(() => {
//         const onScroll = () => setScrolled(window.scrollY > 20);
//         window.addEventListener('scroll', onScroll);
//         return () => window.removeEventListener('scroll', onScroll);
//     }, []);

//     useEffect(() => { setOpen(false); }, [location]);

//     const handleScroll = (e, href) => {
//         e.preventDefault();
//         setOpen(false);
//         const el = document.querySelector(href);
//         if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     };

//     return (
//         <div className={`navbar-wrap ${scrolled ? 'scrolled' : ''}`}>
//             <div className="topbar">
//                 <div className="container topbar-inner">
//                     <div className="topbar-contact">
//                         <a href="tel:+8801XXXXXXXXX"><FiPhone size={13} /> +880 1XXX-XXXXXX</a>
//                         <a href="mailto:hello@amanahit.com"><FiMail size={13} /> hello@amanahit.com</a>
//                     </div>
//                     <div className="topbar-socials">
//                         <a href="#" aria-label="Facebook"><FiFacebook size={13} /></a>
//                         <a href="#" aria-label="Instagram"><FiInstagram size={13} /></a>
//                         <a href="#" aria-label="LinkedIn"><FiLinkedin size={13} /></a>
//                         <a href="#" aria-label="Twitter"><FiTwitter size={13} /></a>
//                         <a href="#" aria-label="YouTube"><FiYoutube size={13} /></a>
//                     </div>
//                 </div>
//             </div>

//             <nav className="navbar">
//                 <div className="container navbar-inner">
//                     <Link to="/" className="navbar-logo">
//                         <img src={logo} alt="AMANAH IT" className="logo-img" />
//                     </Link>

//                     <ul className="navbar-links">
//                         {navLinks.map(l => (
//                             <li key={l.label}>
//                                 <a href={l.href} onClick={(e) => handleScroll(e, l.href)}>
//                                     {l.label}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>

//                     <div className="navbar-cta">
//                         <Link to="/admin" className="btn btn-outline navbar-admin-btn">Admin</Link>
//                         <a href="#contact" className="btn btn-primary" onClick={(e) => handleScroll(e, '#contact')}>
//                             Get a Quote
//                         </a>
//                     </div>

//                     <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
//                         {open ? <FiX size={22} /> : <FiMenu size={22} />}
//                     </button>
//                 </div>

//                 <div className={`mobile-menu ${open ? 'open' : ''}`}>
//                     <ul>
//                         {navLinks.map(l => (
//                             <li key={l.label}>
//                                 <a href={l.href} onClick={(e) => handleScroll(e, l.href)}>
//                                     {l.label}
//                                 </a>
//                             </li>
//                         ))}
//                         <li>
//                             <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
//                         </li>
//                         <li>
//                             <a href="#contact" className="mobile-cta" onClick={(e) => handleScroll(e, '#contact')}>
//                                 Get a Quote
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         </div>
//     );
// }
import React, { useState } from 'react';
import {
    FiPhone,
    FiMail,
    FiChevronDown,
    FiDownload,
    FiMenu
} from 'react-icons/fi';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import './Navbar.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="header-wrapper">
            {/* ১. TOP BAR (কালো ব্যাকগ্রাউন্ড) */}
            <div className="top-bar">
                <div className="container top-bar-container">
                    <div className="top-bar-left">
                        <a href="tel:+8801844185480" className="top-info-link">
                            <FiPhone className="top-icon green-icon" /> +880 18 4418 5480
                        </a>
                        <a href="mailto:info@goinnovior.com" className="top-info-link">
                            <FiMail className="top-icon green-icon" /> info@goinnovior.com
                        </a>
                    </div>
                    <div className="top-bar-right">
                        <div className="social-links">
                            <a href="#" className="social-icon fb"><FaFacebookF /></a>
                            <a href="#" className="social-icon insta"><FaInstagram /></a>
                            <a href="#" className="social-icon linkin"><FaLinkedinIn /></a>
                            <a href="#" className="social-icon twitter"><FaXTwitter /></a>
                            <a href="#" className="social-icon yt"><FaYoutube /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ২. MAIN NAVIGATION BAR (সাদা ফ্লোটিং বার - পজিশন উপরে নেওয়া হয়েছে) */}
            <div className="container main-nav-container">
                <nav className="navbar-floating">
                    {/* লোগো সেকশন */}
                    <div className="nav-logo">
                        <a href="/" className="text-logo">
                            <span className="logo-amanah">Amanah</span>
                            <span className="logo-icon-dot"></span>
                            <span className="logo-it">IT</span>
                        </a>
                    </div>
                    {/* মেনু আইটেমসমূহ */}
                    <div className={`nav-menu-links ${isMenuOpen ? 'active' : ''}`}>
                        <a href="#explore" className="menu-item">Explore Us</a>

                        <div className="menu-item has-dropdown">
                            Services <FiChevronDown className="dropdown-arrow" />
                            <div className="dropdown-menu">
                                <a href="#it-infra">IT Infrastructure</a>
                                <a href="#cyber">CyberSecurity</a>
                                <a href="#automation">Business Automation</a>
                            </div>
                        </div>

                        <div className="menu-item has-dropdown">
                            Solutions <FiChevronDown className="dropdown-arrow" />
                            <div className="dropdown-menu">
                                <a href="#enterprise">Enterprise ERP</a>
                                <a href="#cloud">Cloud Solutions</a>
                            </div>
                        </div>

                        <div className="menu-item has-dropdown">
                            Latest Articles <FiChevronDown className="dropdown-arrow" />
                            <div className="dropdown-menu">
                                <a href="#blogs">Tech Blogs</a>
                                <a href="#news">Company News</a>
                            </div>
                        </div>

                        <a href="#career" className="menu-item">Career</a>
                        <a href="#contact" className="menu-item">Contact</a>
                    </div>

                    {/* রাইট সাইড অ্যাকশন বাটন গ্রপ */}
                    <div className="nav-actions">
                        <a href="/brochure.pdf" download className="btn-brochure">
                            Brochure <FiDownload className="download-icon" />
                        </a>
                        <button className="grid-menu-btn">
                            <span className="grid-dot-icon"></span>
                        </button>
                        {/* মোবাইল মেনু টগল বাটন */}
                        <button className="mobile-toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <FiMenu />
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
