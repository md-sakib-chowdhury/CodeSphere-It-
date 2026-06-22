import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/Mywebsitelogo.png';
import './Navbar.css';

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Team', href: '#team' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setOpen(false); }, [location]);

    const handleScroll = (e, href) => {
        e.preventDefault();
        setOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-inner">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="AMANAH IT" className="logo-img" />
                </Link>

                <ul className="navbar-links">
                    {navLinks.map(l => (
                        <li key={l.label}>
                            <a href={l.href} onClick={(e) => handleScroll(e, l.href)}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="navbar-cta">
                    <Link to="/admin" className="btn btn-outline navbar-admin-btn">Admin</Link>
                    <a href="#contact" className="btn btn-primary" onClick={(e) => handleScroll(e, '#contact')}>
                        Get a Quote
                    </a>
                </div>

                <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                    {open ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            <div className={`mobile-menu ${open ? 'open' : ''}`}>
                <ul>
                    {navLinks.map(l => (
                        <li key={l.label}>
                            <a href={l.href} onClick={(e) => handleScroll(e, l.href)}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
                    </li>
                    <li>
                        <a href="#contact" className="mobile-cta" onClick={(e) => handleScroll(e, '#contact')}>
                            Get a Quote
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}