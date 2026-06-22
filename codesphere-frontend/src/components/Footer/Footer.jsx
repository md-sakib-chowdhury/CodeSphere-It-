import { Link } from 'react-router-dom';
import { FiFacebook, FiLinkedin, FiGithub, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import logo from '../../assets/Mywebsitelogo.png';
import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    const scrollTo = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container footer-top">
                <div className="footer-col footer-brand">
                    <img src={logo} alt="AMANAH IT" className="footer-logo" />
                    <p>AMANAH IT delivers modern MERN Stack web applications, e-commerce platforms, and custom digital solutions for businesses worldwide.</p>
                    <div className="footer-socials">
                        <a href="#" aria-label="Facebook"><FiFacebook /></a>
                        <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
                        <a href="https://github.com/md-sakib-chowdhury" target="_blank" rel="noopener" aria-label="GitHub"><FiGithub /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Services</a>
                    <a href="#portfolio" onClick={(e) => scrollTo(e, '#portfolio')}>Portfolio</a>
                    <a href="#team" onClick={(e) => scrollTo(e, '#team')}>Team</a>
                    <a href="#testimonials" onClick={(e) => scrollTo(e, '#testimonials')}>Testimonials</a>
                </div>

                <div className="footer-col">
                    <h4>Services</h4>
                    <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Web Development</a>
                    <a href="#services" onClick={(e) => scrollTo(e, '#services')}>E-commerce Solutions</a>
                    <a href="#services" onClick={(e) => scrollTo(e, '#services')}>UI/UX Design</a>
                    <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Digital Marketing</a>
                </div>

                <div className="footer-col">
                    <h4>Contact Info</h4>
                    <p className="footer-contact-item"><FiMail size={14} /> hello@amanahit.com</p>
                    <p className="footer-contact-item"><FiPhone size={14} /> +880 1XXX-XXXXXX</p>
                    <p className="footer-contact-item"><FiMapPin size={14} /> Dhaka, Bangladesh</p>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>© {year} AMANAH IT. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/admin">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}