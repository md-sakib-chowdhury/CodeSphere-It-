import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import './Contact.css';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/contact', form);
            toast.success('Message sent! We will get back to you soon.');
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Get In Touch</span>
                    <h2 className="section-title">Let's Build Something <span className="grad-text">Great Together</span></h2>
                    <p className="section-sub">Have a project in mind? Send us a message and we'll respond within 24 hours.</p>
                </div>

                <div className="contact-grid">
                    {/* Info side */}
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-icon"><FiMail size={20} /></div>
                            <div>
                                <h4>Email Us</h4>
                                <p>hello@amanahit.com</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon"><FiPhone size={20} /></div>
                            <div>
                                <h4>Call Us</h4>
                                <p>+880 1XXX-XXXXXX</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon"><FiMapPin size={20} /></div>
                            <div>
                                <h4>Visit Us</h4>
                                <p>Dhaka, Bangladesh</p>
                            </div>
                        </div>

                        <div className="contact-cta-box">
                            <h4>Ready to start your project?</h4>
                            <p>We respond to all inquiries within 24 hours, guaranteed.</p>
                        </div>
                    </div>

                    {/* Form side */}
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+880 1XXX-XXXXXX" />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Message *</label>
                            <textarea name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Tell us about your project..." required />
                        </div>
                        <button type="submit" className="btn btn-primary contact-submit" disabled={loading}>
                            {loading ? 'Sending...' : <>Send Message <FiSend /></>}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}