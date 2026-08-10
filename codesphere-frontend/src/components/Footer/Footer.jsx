// // import { Link } from 'react-router-dom';
// // import { FiFacebook, FiLinkedin, FiGithub, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
// // import logo from '../../assets/Mywebsitelogo.png';
// // import './Footer.css';

// // export default function Footer() {
// //     const year = new Date().getFullYear();

// //     const scrollTo = (e, href) => {
// //         e.preventDefault();
// //         document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
// //     };

// //     return (
// //         <footer className="footer">
// //             <div className="container footer-top">
// //                 <div className="footer-col footer-brand">
// //                     <img src={logo} alt="AMANAH IT" className="footer-logo" />
// //                     <p>AMANAH IT delivers modern MERN Stack web applications, e-commerce platforms, and custom digital solutions for businesses worldwide.</p>
// //                     <div className="footer-socials">
// //                         <a href="#" aria-label="Facebook"><FiFacebook /></a>
// //                         <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
// //                         <a href="https://github.com/md-sakib-chowdhury" target="_blank" rel="noopener" aria-label="GitHub"><FiGithub /></a>
// //                     </div>
// //                 </div>

// //                 <div className="footer-col">
// //                     <h4>Quick Links</h4>
// //                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Services</a>
// //                     <a href="#portfolio" onClick={(e) => scrollTo(e, '#portfolio')}>Portfolio</a>
// //                     <a href="#team" onClick={(e) => scrollTo(e, '#team')}>Team</a>
// //                     <a href="#testimonials" onClick={(e) => scrollTo(e, '#testimonials')}>Testimonials</a>
// //                 </div>

// //                 <div className="footer-col">
// //                     <h4>Services</h4>
// //                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Web Development</a>
// //                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>E-commerce Solutions</a>
// //                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>UI/UX Design</a>
// //                     <a href="#services" onClick={(e) => scrollTo(e, '#services')}>Digital Marketing</a>
// //                 </div>

// //                 <div className="footer-col">
// //                     <h4>Contact Info</h4>
// //                     <p className="footer-contact-item"><FiMail size={14} /> hello@amanahit.com</p>
// //                     <p className="footer-contact-item"><FiPhone size={14} /> +880 1XXX-XXXXXX</p>
// //                     <p className="footer-contact-item"><FiMapPin size={14} /> Dhaka, Bangladesh</p>
// //                 </div>
// //             </div>

// //             <div className="footer-bottom">
// //                 <div className="container footer-bottom-inner">
// //                     <p>© {year} AMANAH IT. All rights reserved.</p>
// //                     <div className="footer-bottom-links">
// //                         <Link to="/admin">Admin</Link>
// //                     </div>
// //                 </div>
// //             </div>
// //         </footer>
// //     );
// // }
// import { Link } from 'react-router-dom';
// import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube, FiMapPin, FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
// import './Footer.css';

// export default function Footer() {
//     const year = new Date().getFullYear();

//     return (
//         <>
//             {/* CTA banner */}
//             <section className="footer-cta">
//                 <div className="footer-cta-box">
//                     <div className="footer-cta-inner">
//                         <div>
//                             <span className="section-label footer-cta-label">Request Consultation</span>
//                             <h2>Need Any IT Service or Consultations<br />Next Projects</h2>
//                         </div>
//                         <div className="footer-cta-right">
//                             <p>We Are Always With Your Business</p>
//                             <Link to="/contact" className="footer-cta-btn">Request Consultation</Link>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <footer className="footer">
//                 <div className="container footer-top">
//                     <div className="footer-col footer-brand">
//                         <div className="footer-logo-text">
//                             <span className="fl-amanah">Amanah</span>
//                             <span className="fl-dot"></span>
//                             <span className="fl-it">IT</span>
//                         </div>
//                         <p>
//                             AMANAH IT has adopted the highest standards of software development and
//                             consultancy quality, enabling its clients across a wide range of industries
//                             to transform into a truly digital, data-driven business.
//                         </p>
//                         <div className="footer-socials">
//                             <a href="#" aria-label="Facebook"><FiFacebook /></a>
//                             <a href="#" aria-label="Instagram"><FiInstagram /></a>
//                             <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
//                             <a href="#" aria-label="Twitter"><FiTwitter /></a>
//                             <a href="#" aria-label="YouTube"><FiYoutube /></a>
//                         </div>
//                     </div>

//                     <div className="footer-col">
//                         <h4>Services</h4>
//                         <Link to="/services">Web Development</Link>
//                         <Link to="/services">E-commerce Solutions</Link>
//                         <Link to="/services">UI/UX Design</Link>
//                         <Link to="/services">Digital Marketing</Link>
//                         <Link to="/services">Mobile App Development</Link>
//                         <Link to="/services">Cloud & Deployment</Link>
//                     </div>

//                     <div className="footer-col">
//                         <h4>Quick Links</h4>
//                         <Link to="/explore-us">Explore Us</Link>
//                         <a href="/#portfolio">Portfolio</a>
//                         <a href="/#team">Team</a>
//                         <a href="/#testimonials">Testimonials</a>
//                         <Link to="/latest-articles">Latest Articles</Link>
//                     </div>

//                     <div className="footer-col">
//                         <h4>Get In Touch</h4>
//                         <p className="footer-contact-item"><FiMapPin size={14} /> Dhaka, Bangladesh</p>
//                         <p className="footer-contact-item"><FiMail size={14} /> hello@amanahit.com</p>
//                         <p className="footer-contact-item"><FiPhone size={14} /> +880 1XXX-XXXXXX</p>
//                     </div>
//                 </div>

//                 <div className="footer-bottom">
//                     <div className="container footer-bottom-inner">
//                         <p>© {year} AMANAH IT. All rights reserved.</p>
//                         <div className="footer-bottom-links">
//                             <Link to="/admin">Admin</Link>
//                         </div>
//                     </div>
//                 </div>
//             </footer>

//             <a href="#hero" className="footer-scroll-top" aria-label="Scroll to top">
//                 <FiArrowUp size={18} />
//             </a>
//         </>
//     );
// }
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube, FiMapPin, FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Footer.css';

// const SOCIAL_ICONS = {
//     Facebook: FiFacebook,
//     Instagram: FiInstagram,
//     LinkedIn: FiLinkedin,
//     Twitter: FiTwitter,
//     YouTube: FiYoutube,
// };

// const DEFAULT_FOOTER = {
//     cta: {
//         label: 'Request Consultation',
//         title: 'Need Any IT Service or Consultations\nNext Projects',
//         subtitle: 'We Are Always With Your Business',
//         btnText: 'Request Consultation',
//         btnLink: '/contact',
//     },
//     logoText: 'Amanah',
//     logoAccent: 'IT',
//     description: 'AMANAH IT has adopted the highest standards of software development and consultancy quality, enabling its clients across a wide range of industries to transform into a truly digital, data-driven business.',
//     socialLinks: [
//         { platform: 'Facebook', url: '#' },
//         { platform: 'Instagram', url: '#' },
//         { platform: 'LinkedIn', url: '#' },
//         { platform: 'Twitter', url: '#' },
//         { platform: 'YouTube', url: '#' },
//     ],
//     serviceLinks: [
//         { label: 'Web Development', path: '/services' },
//         { label: 'E-commerce Solutions', path: '/services' },
//         { label: 'UI/UX Design', path: '/services' },
//         { label: 'Digital Marketing', path: '/services' },
//         { label: 'Mobile App Development', path: '/services' },
//         { label: 'Cloud & Deployment', path: '/services' },
//     ],
//     quickLinks: [
//         { label: 'Explore Us', path: '/explore-us' },
//         { label: 'Portfolio', path: '/#portfolio' },
//         { label: 'Team', path: '/#team' },
//         { label: 'Testimonials', path: '/#testimonials' },
//         { label: 'Latest Articles', path: '/latest-articles' },
//     ],
//     address: 'Dhaka, Bangladesh',
//     email: 'hello@amanahit.com',
//     phone: '+880 1XXX-XXXXXX',
//     copyrightText: 'AMANAH IT. All rights reserved.',
//     developedByText: 'Design & Developed By',
//     developedByName: 'Amanah.IT',
//     developedByLink: '',
// };

// export default function Footer() {
//     const [f, setF] = useState(DEFAULT_FOOTER);
//     const year = new Date().getFullYear();

//     useEffect(() => {
//         api.get('/footer').then(r => setF({ ...DEFAULT_FOOTER, ...r.data })).catch(() => { });
//     }, []);

//     return (
//         <>
//             {/* CTA banner */}
//             <section className="footer-cta">
//                 <div className="footer-cta-box">
//                     <div className="footer-cta-inner">
//                         <div>
//                             <span className="section-label footer-cta-label">{f.cta.label}</span>
//                             <h2>
//                                 {f.cta.title.split('\n').map((line, i, arr) => (
//                                     <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
//                                 ))}
//                             </h2>
//                         </div>
//                         <div className="footer-cta-right">
//                             <p>{f.cta.subtitle}</p>
//                             <Link to={f.cta.btnLink} className="footer-cta-btn">{f.cta.btnText}</Link>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <footer className="footer">
//                 <div className="container footer-top">
//                     <div className="footer-col footer-brand">
//                         <div className="footer-logo-text">
//                             <span className="fl-amanah">{f.logoText}</span>
//                             <span className="fl-dot"></span>
//                             <span className="fl-it">{f.logoAccent}</span>
//                         </div>
//                         <p>{f.description}</p>
//                         <div className="footer-socials">
//                             {(f.socialLinks || []).map(({ platform, url }) => {
//                                 const Icon = SOCIAL_ICONS[platform] || FiFacebook;
//                                 return (
//                                     <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}>
//                                         <Icon />
//                                     </a>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     <div className="footer-col">
//                         <h4>Services</h4>
//                         {(f.serviceLinks || []).map((link, i) => (
//                             <Link key={i} to={link.path}>{link.label}</Link>
//                         ))}
//                     </div>

//                     <div className="footer-col">
//                         <h4>Quick Links</h4>
//                         {(f.quickLinks || []).map((link, i) => (
//                             link.path.startsWith('/#')
//                                 ? <a key={i} href={link.path}>{link.label}</a>
//                                 : <Link key={i} to={link.path}>{link.label}</Link>
//                         ))}
//                     </div>

//                     <div className="footer-col">
//                         <h4>Get In Touch</h4>
//                         <p className="footer-contact-item"><FiMapPin size={14} /> {f.address}</p>
//                         <p className="footer-contact-item"><FiMail size={14} /> {f.email}</p>
//                         <p className="footer-contact-item"><FiPhone size={14} /> {f.phone}</p>
//                     </div>
//                 </div>

//                 <div style={{ textAlign: 'center', padding: '18px 0', fontSize: '13px', color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
//                     © {year} {f.developedByText}{' '}
//                     {f.developedByLink ? (
//                         <a href={f.developedByLink} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>
//                             {f.developedByName}
//                         </a>
//                     ) : (
//                         <span style={{ color: '#22c55e', fontWeight: 600 }}>{f.developedByName}</span>
//                     )}
//                 </div>
//             </footer>

//             <a href="#hero" className="footer-scroll-top" aria-label="Scroll to top">
//                 <FiArrowUp size={18} />
//             </a>
//         </>
//     );
// }
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { FiMapPin, FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Footer.css';

// const SOCIAL_ICONS = {
//     Facebook: FaFacebookF,
//     Instagram: FaInstagram,
//     LinkedIn: FaLinkedinIn,
//     Twitter: FaTwitter,
//     YouTube: FaYoutube,
// };

// const DEFAULT_FOOTER = {
//     cta: {
//         label: 'Request Consultation',
//         title: 'Need Any IT Service or Consultations\nNext Projects',
//         subtitle: 'We Are Always With Your Business',
//         btnText: 'Request Consultation',
//         btnLink: '/contact',
//     },
//     logoText: 'Amanah',
//     logoAccent: 'IT',
//     description: 'AMANAH IT has adopted the highest standards of software development and consultancy quality, enabling its clients across a wide range of industries to transform into a truly digital, data-driven business.',
//     socialLinks: [
//         { platform: 'Facebook', url: '#' },
//         { platform: 'Instagram', url: '#' },
//         { platform: 'LinkedIn', url: '#' },
//         { platform: 'Twitter', url: '#' },
//         { platform: 'YouTube', url: '#' },
//     ],
//     serviceLinks: [
//         { label: 'Web Development', path: '/services' },
//         { label: 'E-commerce Solutions', path: '/services' },
//         { label: 'UI/UX Design', path: '/services' },
//         { label: 'Digital Marketing', path: '/services' },
//         { label: 'Mobile App Development', path: '/services' },
//         { label: 'Cloud & Deployment', path: '/services' },
//     ],
//     quickLinks: [
//         { label: 'Explore Us', path: '/explore-us' },
//         { label: 'Portfolio', path: '/#portfolio' },
//         { label: 'Team', path: '/#team' },
//         { label: 'Testimonials', path: '/#testimonials' },
//         { label: 'Latest Articles', path: '/latest-articles' },
//     ],
//     address: 'Dhaka, Bangladesh',
//     email: 'hello@amanahit.com',
//     phone: '+880 1XXX-XXXXXX',
//     copyrightText: 'AMANAH IT. All rights reserved.',
//     developedByText: 'Design & Developed By',
//     developedByName: 'Amanah.IT',
//     developedByLink: '',
// };

// export default function Footer() {
//     const [f, setF] = useState(DEFAULT_FOOTER);
//     const year = new Date().getFullYear();

//     useEffect(() => {
//         api.get('/footer').then(r => setF({ ...DEFAULT_FOOTER, ...r.data })).catch(() => { });
//     }, []);

//     return (
//         <>
//             {/* CTA banner */}
//             <section className="footer-cta">
//                 <div className="footer-cta-box">
//                     <div className="footer-cta-inner">
//                         <div>
//                             <span className="section-label footer-cta-label">{f.cta.label}</span>
//                             <h2>
//                                 {f.cta.title.split('\n').map((line, i, arr) => (
//                                     <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
//                                 ))}
//                             </h2>
//                         </div>
//                         <div className="footer-cta-right">
//                             <p>{f.cta.subtitle}</p>
//                             <Link to={f.cta.btnLink} className="footer-cta-btn">{f.cta.btnText}</Link>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <footer className="footer">
//                 <div className="container footer-top">
//                     <div className="footer-col footer-brand">
//                         <div className="footer-logo-text">
//                             <span className="fl-amanah">{f.logoText}</span>
//                             <span className="fl-dot"></span>
//                             <span className="fl-it">{f.logoAccent}</span>
//                         </div>
//                         <p>{f.description}</p>
//                         <div className="footer-socials">
//                             {(f.socialLinks || []).map(({ platform, url }) => {
//                                 const Icon = SOCIAL_ICONS[platform] || FiFacebook;
//                                 return (
//                                     <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}>
//                                         <Icon />
//                                     </a>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     <div className="footer-col">
//                         <h4>Services</h4>
//                         {(f.serviceLinks || []).map((link, i) => (
//                             <Link key={i} to={link.path}>{link.label}</Link>
//                         ))}
//                     </div>

//                     <div className="footer-col">
//                         <h4>Quick Links</h4>
//                         {(f.quickLinks || []).map((link, i) => (
//                             link.path.startsWith('/#')
//                                 ? <a key={i} href={link.path}>{link.label}</a>
//                                 : <Link key={i} to={link.path}>{link.label}</Link>
//                         ))}
//                     </div>

//                     <div className="footer-col">
//                         <h4>Get In Touch</h4>
//                         <p className="footer-contact-item"><FiMapPin size={14} /> {f.address}</p>
//                         <p className="footer-contact-item"><FiMail size={14} /> {f.email}</p>
//                         <p className="footer-contact-item"><FiPhone size={14} /> {f.phone}</p>
//                     </div>
//                 </div>

//                 <div style={{ textAlign: 'center', padding: '18px 0', fontSize: '13px', color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
//                     © {year} {f.developedByText}{' '}
//                     {f.developedByLink ? (
//                         <a href={f.developedByLink} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>
//                             {f.developedByName}
//                         </a>
//                     ) : (
//                         <span style={{ color: '#22c55e', fontWeight: 600 }}>{f.developedByName}</span>
//                     )}
//                 </div>
//             </footer>

//             {/* Scroll-to-top: window.scrollTo() use kora hocche, #hero anchor link na —
//                 tai shob page-e (jekhane #hero element nai) kaj korbe */}
//             <button
//                 onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
//                 className="footer-scroll-top"
//                 aria-label="Scroll to top"
//             >
//                 <FiArrowUp size={18} />
//             </button>
//         </>
//     );
// }
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { FiMapPin, FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Footer.css';

// const SOCIAL_ICONS = {
//     Facebook: FaFacebookF,
//     Instagram: FaInstagram,
//     LinkedIn: FaLinkedinIn,
//     Twitter: FaTwitter,
//     YouTube: FaYoutube,
// };

// const DEFAULT_FOOTER = {
//     cta: {
//         label: 'Request Consultation',
//         title: 'Need Any IT Service or Consultations\nNext Projects',
//         subtitle: 'We Are Always With Your Business',
//         btnText: 'Request Consultation',
//         btnLink: '/contact',
//     },
//     logoText: 'Amanah',
//     logoAccent: 'IT',
//     description: 'AMANAH IT has adopted the highest standards of software development and consultancy quality, enabling its clients across a wide range of industries to transform into a truly digital, data-driven business.',
//     socialLinks: [
//         { platform: 'Facebook', url: '#' },
//         { platform: 'Instagram', url: '#' },
//         { platform: 'LinkedIn', url: '#' },
//         { platform: 'Twitter', url: '#' },
//         { platform: 'YouTube', url: '#' },
//     ],
//     serviceLinks: [
//         { label: 'Web Development', path: '/services' },
//         { label: 'E-commerce Solutions', path: '/services' },
//         { label: 'UI/UX Design', path: '/services' },
//         { label: 'Digital Marketing', path: '/services' },
//         { label: 'Mobile App Development', path: '/services' },
//         { label: 'Cloud & Deployment', path: '/services' },
//         { label: 'Domain & Hosting', path: '/services' },
//     ],
//     quickLinks: [
//         { label: 'Explore Us', path: '/explore-us' },
//         { label: 'Portfolio', path: '/#portfolio' },
//         { label: 'Team', path: '/#team' },
//         { label: 'Testimonials', path: '/#testimonials' },
//         { label: 'Latest Articles', path: '/latest-articles' },
//     ],
//     address: 'Dhaka, Bangladesh',
//     email: 'hello@amanahit.com',
//     phone: '+880 1XXX-XXXXXX',
//     copyrightText: 'AMANAH IT. All rights reserved.',
//     developedByText: 'Design & Developed By',
//     developedByName: 'Amanah.IT',
//     developedByLink: '',
// };

// export default function Footer() {
//     const [f, setF] = useState(DEFAULT_FOOTER);
//     const year = new Date().getFullYear();

//     useEffect(() => {
//         api.get('/footer').then(r => setF({ ...DEFAULT_FOOTER, ...r.data })).catch(() => { });
//     }, []);

//     return (
//         <>
//             {/* CTA banner */}
//             <section className="footer-cta">
//                 <div className="footer-cta-box">
//                     <div className="footer-cta-inner">
//                         <div>
//                             <span className="section-label footer-cta-label">{f.cta.label}</span>
//                             <h2>
//                                 {f.cta.title.split('\n').map((line, i, arr) => (
//                                     <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
//                                 ))}
//                             </h2>
//                         </div>
//                         <div className="footer-cta-right">
//                             <p>{f.cta.subtitle}</p>
//                             <Link to={f.cta.btnLink} className="footer-cta-btn">{f.cta.btnText}</Link>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <footer className="footer">
//                 <div className="container footer-top">
//                     <div className="footer-col footer-brand">
//                         <div className="footer-logo-text">
//                             <span className="fl-amanah">{f.logoText}</span>
//                             <span className="fl-dot"></span>
//                             <span className="fl-it">{f.logoAccent}</span>
//                         </div>
//                         <p>{f.description}</p>
//                         <div className="footer-socials">
//                             {(f.socialLinks || []).map(({ platform, url }) => {
//                                 const Icon = SOCIAL_ICONS[platform] || FaFacebookF;
//                                 return (
//                                     <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}>
//                                         <Icon />
//                                     </a>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     <div className="footer-col">
//                         <h4>Services</h4>
//                         {(f.serviceLinks || []).map((link, i) => (
//                             <Link key={i} to={link.path}>{link.label}</Link>
//                         ))}
//                     </div>

//                     <div className="footer-col">
//                         <h4>Quick Links</h4>
//                         {(f.quickLinks || []).map((link, i) => (
//                             link.path.startsWith('/#')
//                                 ? <a key={i} href={link.path}>{link.label}</a>
//                                 : <Link key={i} to={link.path}>{link.label}</Link>
//                         ))}
//                     </div>

//                     <div className="footer-col">
//                         <h4>Get In Touch</h4>
//                         <p className="footer-contact-item"><FiMapPin size={14} /> {f.address}</p>
//                         <p className="footer-contact-item"><FiMail size={14} /> {f.email}</p>
//                         <p className="footer-contact-item"><FiPhone size={14} /> {f.phone}</p>
//                     </div>
//                 </div>

//                 <div style={{ textAlign: 'center', padding: '18px 0', fontSize: '13px', color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
//                     © {year} {f.developedByText}{' '}
//                     {f.developedByLink ? (
//                         <a href={f.developedByLink} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>
//                             {f.developedByName}
//                         </a>
//                     ) : (
//                         <span style={{ color: '#22c55e', fontWeight: 600 }}>{f.developedByName}</span>
//                     )}
//                 </div>
//             </footer>

//             {/* Scroll-to-top: window.scrollTo() use kora hocche, #hero anchor link na —
//                 tai shob page-e (jekhane #hero element nai) kaj korbe */}
//             <button
//                 onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
//                 className="footer-scroll-top"
//                 aria-label="Scroll to top"
//             >
//                 <FiArrowUp size={18} />
//             </button>
//         </>
//     );
// }
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiMapPin, FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
import api from '../../utils/api';
import './Footer.css';

const SOCIAL_ICONS = {
    Facebook: FaFacebookF,
    Instagram: FaInstagram,
    LinkedIn: FaLinkedinIn,
    Twitter: FaTwitter,
    YouTube: FaYoutube,
};

const DEFAULT_FOOTER = {
    cta: {
        label: 'Request Consultation',
        title: 'Need Any IT Service or Consultations\nNext Projects',
        subtitle: 'We Are Always With Your Business',
        btnText: 'Request Consultation',
        btnLink: '/contact',
    },
    logoText: 'Amanah',
    logoAccent: 'IT',
    description: 'AMANAH IT has adopted the highest standards of software development and consultancy quality, enabling its clients across a wide range of industries to transform into a truly digital, data-driven business.',
    socialLinks: [
        { platform: 'Facebook', url: '#' },
        { platform: 'Instagram', url: '#' },
        { platform: 'LinkedIn', url: '#' },
        { platform: 'Twitter', url: '#' },
        { platform: 'YouTube', url: '#' },
    ],
    serviceLinks: [
        { label: 'Web Development', path: '/services' },
        { label: 'E-commerce Solutions', path: '/services' },
        { label: 'UI/UX Design', path: '/services' },
        { label: 'Digital Marketing', path: '/services' },
        { label: 'Mobile App Development', path: '/services' },
        { label: 'Cloud & Deployment', path: '/services' },
        { label: 'Domain & Hosting', path: '/services' },
    ],
    quickLinks: [
        { label: 'Explore Us', path: '/explore-us' },
        { label: 'Portfolio', path: '/#portfolio' },
        { label: 'Team', path: '/#team' },
        { label: 'Testimonials', path: '/#testimonials' },
        { label: 'Latest Articles', path: '/latest-articles' },
    ],
    address: 'Dhaka, Bangladesh',
    email: 'hello@amanahit.com',
    phone: '+880 1XXX-XXXXXX',
    copyrightText: 'AMANAH IT. All rights reserved.',
    developedByText: 'Design & Developed By',
    developedByName: 'Amanah.IT',
    developedByLink: '',
};

export default function Footer() {
    const [f, setF] = useState(DEFAULT_FOOTER);
    const year = new Date().getFullYear();

    useEffect(() => {
        api.get('/footer').then(r => setF({ ...DEFAULT_FOOTER, ...r.data })).catch(() => { });
    }, []);

    return (
        <>
            {/* CTA banner */}
            <section className="footer-cta">
                <div className="footer-cta-box">
                    <div className="footer-cta-inner">
                        <div>
                            <span className="section-label footer-cta-label">{f.cta.label}</span>
                            <h2>
                                {f.cta.title.split('\n').map((line, i, arr) => (
                                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                                ))}
                            </h2>
                        </div>
                        <div className="footer-cta-right">
                            <p>{f.cta.subtitle}</p>
                            <Link to={f.cta.btnLink} className="footer-cta-btn">{f.cta.btnText}</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container footer-top">
                    <div className="footer-col footer-brand">
                        <div className="footer-logo-text">
                            <span className="fl-amanah">{f.logoText}</span>
                            <span className="fl-dot"></span>
                            <span className="fl-it">{f.logoAccent}</span>
                        </div>
                        <p>{f.description}</p>
                        <div className="footer-socials">
                            {(f.socialLinks || []).map(({ platform, url }) => {
                                const Icon = SOCIAL_ICONS[platform] || FaFacebookF;
                                return (
                                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}>
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Services</h4>
                        {(f.serviceLinks || []).map((link, i) => (
                            <Link key={i} to={link.path}>{link.label}</Link>
                        ))}
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        {(f.quickLinks || []).map((link, i) => (
                            link.path.startsWith('/#')
                                ? <a key={i} href={link.path}>{link.label}</a>
                                : <Link key={i} to={link.path}>{link.label}</Link>
                        ))}
                    </div>

                    <div className="footer-col">
                        <h4>Get In Touch</h4>
                        <p className="footer-contact-item"><FiMapPin size={14} /> {f.address}</p>
                        <p className="footer-contact-item"><FiMail size={14} /> {f.email}</p>
                        <p className="footer-contact-item"><FiPhone size={14} /> {f.phone}</p>
                    </div>
                </div>

                <div style={{ textAlign: 'center', padding: '18px 0', fontSize: '13px', color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    © {year} {f.developedByText}{' '}
                    {f.developedByLink ? (
                        <a href={f.developedByLink} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>
                            {f.developedByName}
                        </a>
                    ) : (
                        <span style={{ color: '#22c55e', fontWeight: 600 }}>{f.developedByName}</span>
                    )}
                </div>
            </footer>

            {/* Scroll-to-top: window.scrollTo() use kora hocche, #hero anchor link na —
                tai shob page-e (jekhane #hero element nai) kaj korbe */}
            <button
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                className="footer-scroll-top"
                aria-label="Scroll to top"
            >
                <FiArrowUp size={18} />
            </button>
        </>
    );
}