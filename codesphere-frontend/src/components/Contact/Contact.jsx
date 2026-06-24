import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import './Contact.css';

export default function Contact() {
    const [form, setForm] = useState({
        email: '', fullName: '', phone: '', numberOfEmployee: '',
        serviceType: 'Product', companyName: '', companyAddress: '',
        officialWebsite: '', communicationPreference: 'Email',
        iAm: 'Customer', message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setForm({
                email: '', fullName: '', phone: '', numberOfEmployee: '',
                serviceType: 'Product', companyName: '', companyAddress: '',
                officialWebsite: '', communicationPreference: 'Email',
                iAm: 'Customer', message: ''
            });
        }, 1000);
    };

    return (
        <div className="contact-page">
            {/* Hero Banner */}
            <div className="contact-hero">
                <div className="contact-hero-inner">
                    <p className="contact-breadcrumb"><span>Home</span> » Contact</p>
                    <h1>Contact</h1>
                </div>
            </div>

            {/* Intro */}
            <div className="contact-intro">
                <h2>Best IT Services Company in BD.<br />Feel Free Contact Us Today and Get Your Solution.</h2>
                <p>Reach out to us for personalized solutions tailored to your needs. Our expert team is here to help you achieve your goals.</p>
            </div>

            {/* Info Cards */}
            <div className="contact-info-cards">
                <div className="contact-info-card">
                    <div className="contact-info-icon"><FiPhone size={28} /></div>
                    <div>
                        <h4>Call Us.</h4>
                        <p>+880 18 4418 5480</p>
                    </div>
                </div>
                <div className="contact-info-card">
                    <div className="contact-info-icon"><FiMail size={28} /></div>
                    <div>
                        <h4>Email Us.</h4>
                        <p>info@amanahit.com</p>
                    </div>
                </div>
                <div className="contact-info-card">
                    <div className="contact-info-icon"><FiMapPin size={28} /></div>
                    <div>
                        <h4>Address</h4>
                        <p>House-774, Road-11, Avenue-02<br />Mirpur DOHS, Dhaka-1216</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="contact-form-section">
                {success && (
                    <div className="contact-success">✅ Message sent! We will get back to you soon.</div>
                )}
                <form className="contact-form-grid" onSubmit={handleSubmit}>
                    <div className="cf-group">
                        <label>Email <span className="req">*</span></label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="cf-group">
                        <label>Company Name</label>
                        <input type="text" name="companyName" value={form.companyName} onChange={handleChange} />
                    </div>
                    <div className="cf-group">
                        <label>Full Name <span className="req">*</span></label>
                        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
                    </div>
                    <div className="cf-group">
                        <label>Company Address</label>
                        <input type="text" name="companyAddress" value={form.companyAddress} onChange={handleChange} />
                    </div>
                    <div className="cf-group">
                        <label>Phone Number <span className="req">*</span></label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                    </div>
                    <div className="cf-group">
                        <label>Official Website</label>
                        <input type="url" name="officialWebsite" value={form.officialWebsite} onChange={handleChange} />
                    </div>
                    <div className="cf-group">
                        <label>Numbers of Employee</label>
                        <input type="number" name="numberOfEmployee" value={form.numberOfEmployee} onChange={handleChange} />
                    </div>
                    <div className="cf-group">
                        <label>Communication Preference</label>
                        <select name="communicationPreference" value={form.communicationPreference} onChange={handleChange}>
                            <option>Email</option>
                            <option>Phone</option>
                            <option>WhatsApp</option>
                        </select>
                    </div>
                    <div className="cf-group">
                        <label>Service Type</label>
                        <select name="serviceType" value={form.serviceType} onChange={handleChange}>
                            <option>Product</option>
                            <option>IT Consultancy</option>
                            <option>Managed IT</option>
                            <option>Digital Marketing</option>
                            <option>Brand & Promotion</option>
                            <option>Domain & Hosting</option>
                            <option>Technology Training</option>
                            <option>Offshore Development</option>
                        </select>
                    </div>
                    <div className="cf-group">
                        <label>I am...</label>
                        <select name="iAm" value={form.iAm} onChange={handleChange}>
                            <option>Customer</option>
                            <option>Business Owner</option>
                            <option>Partner</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="cf-group cf-full">
                        <label>Message</label>
                        <textarea name="message" rows="5" value={form.message} onChange={handleChange} />
                    </div>
                    <div className="cf-full cf-submit-row">
                        <button type="submit" className="cf-submit-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Google Map */}
            <div className="contact-map">
                <iframe
                    title="Amanah IT Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3!2d90.3667!3d23.8245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzI4LjIiTiA5MMKwMjInMDAuMSJF!5e0!3m2!1sen!2sbd!4v1234567890"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
}