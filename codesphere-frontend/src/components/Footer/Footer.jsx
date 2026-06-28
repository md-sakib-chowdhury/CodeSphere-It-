// import { Link } from 'react-router-dom';
// import { FiFacebook, FiLinkedin, FiGithub, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
// import logo from '../../assets/Mywebsitelogo.png';
// import './Footer.css';

// export default function Footer() {
//     const year = new Date().getFullYear();

//     const scrollTo = (e, href) => {
//         e.preventDefault();
//         document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
//     };

//     return (
//         <footer className="footer">
//             <div className="container footer-top">
//                 <div className="footer-col footer-brand">
//                     <img src={logo} alt="AMANAH IT" className="footer-logo" />
//                     <p>AMANAH IT delivers modern MERN Stack web applications, e-commerce platforms, and custom digital solutions for businesses worldwide.</p>
//                     <div className="footer-socials">
//                         <a href="#" aria-label="Facebook"><FiFacebook /></a>
//                         <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
//                         <a href="https://github.com/md-sakib-chowdhury" target="_blank" rel="noopener" aria-label="GitHub"><FiGithub /></a>
//                     </div>
//                 </div>

//                 <div className="footer-col">
//                     <h4>Quick Links</h4>
//                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Services</a>
//                     <a href="#portfolio" onClick={(e) => scrollTo(e, '#portfolio')}>Portfolio</a>
//                     <a href="#team" onClick={(e) => scrollTo(e, '#team')}>Team</a>
//                     <a href="#testimonials" onClick={(e) => scrollTo(e, '#testimonials')}>Testimonials</a>
//                 </div>

//                 <div className="footer-col">
//                     <h4>Services</h4>
//                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Web Development</a>
//                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>E-commerce Solutions</a>
//                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>UI/UX Design</a>
//                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Digital Marketing</a>
//                 </div>

//                 <div className="footer-col">
//                     <h4>Contact Info</h4>
//                     <p className="footer-contact-item"><FiMail size={14} /> hello@amanahit.com</p>
//                     <p className="footer-contact-item"><FiPhone size={14} /> +880 1XXX-XXXXXX</p>
//                     <p className="footer-contact-item"><FiMapPin size={14} /> Dhaka, Bangladesh</p>
//                 </div>
//             </div>

//             <div className="footer-bottom">
//                 <div className="container footer-bottom-inner">
//                     <p>© {year} AMANAH IT. All rights reserved.</p>
//                     <div className="footer-bottom-links">
//                         <Link to="/admin">Admin</Link>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube, FiMapPin, FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <>
            {/* CTA banner */}
            <section className="footer-cta">
                <div className="footer-cta-box">
                    <div className="footer-cta-inner">
                        <div>
                            <span className="section-label footer-cta-label">Request Consultation</span>
                            <h2>Need Any IT Service or Consultations<br />Next Projects</h2>
                        </div>
                        <div className="footer-cta-right">
                            <p>We Are Always With Your Business</p>
                            <a href="#contact" className="footer-cta-btn">Request Consultation</a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container footer-top">
                    <div className="footer-col footer-brand">
                        <div className="footer-logo-text">
                            <span className="fl-amanah">Amanah</span>
                            <span className="fl-dot"></span>
                            <span className="fl-it">IT</span>
                        </div>
                        <p>
                            AMANAH IT has adopted the highest standards of software development and
                            consultancy quality, enabling its clients across a wide range of industries
                            to transform into a truly digital, data-driven business.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Facebook"><FiFacebook /></a>
                            <a href="#" aria-label="Instagram"><FiInstagram /></a>
                            <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
                            <a href="#" aria-label="Twitter"><FiTwitter /></a>
                            <a href="#" aria-label="YouTube"><FiYoutube /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Services</h4>
                        <Link to="/services">Web Development</Link>
                        <Link to="/services">E-commerce Solutions</Link>
                        <Link to="/services">UI/UX Design</Link>
                        <Link to="/services">Digital Marketing</Link>
                        <Link to="/services">Mobile App Development</Link>
                        <Link to="/services">Cloud & Deployment</Link>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <Link to="/explore-us">Explore Us</Link>
                        <a href="/#portfolio">Portfolio</a>
                        <a href="/#team">Team</a>
                        <a href="/#testimonials">Testimonials</a>
                        <Link to="/latest-articles">Latest Articles</Link>
                    </div>

                    <div className="footer-col">
                        <h4>Get In Touch</h4>
                        <p className="footer-contact-item"><FiMapPin size={14} /> Dhaka, Bangladesh</p>
                        <p className="footer-contact-item"><FiMail size={14} /> hello@amanahit.com</p>
                        <p className="footer-contact-item"><FiPhone size={14} /> +880 1XXX-XXXXXX</p>
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

            <a href="#hero" className="footer-scroll-top" aria-label="Scroll to top">
                <FiArrowUp size={18} />
            </a>
        </>
    );
}