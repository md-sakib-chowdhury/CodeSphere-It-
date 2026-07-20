import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const SOCIAL_PLATFORMS = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'];

export default function FooterTab() {
    const [data, setData] = useState({
        cta: { label: '', title: '', subtitle: '', btnText: '', btnLink: '' },
        logoText: '', logoAccent: '', description: '',
        socialLinks: [], serviceLinks: [], quickLinks: [],
        address: '', email: '', phone: '', copyrightText: '',
        developedByText: '', developedByName: '', developedByLink: '',
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/footer').then(r => setData(r.data)).catch(() => { });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/footer', data);
            setData(res.data);
            toast.success('Footer updated!');
        } catch {
            toast.error('Failed to update');
        } finally {
            setSaving(false);
        }
    };

    const updateCta = (field, value) => setData({ ...data, cta: { ...data.cta, [field]: value } });

    // Social links
    const updateSocial = (i, field, value) => {
        const links = [...data.socialLinks];
        links[i][field] = value;
        setData({ ...data, socialLinks: links });
    };
    const addSocial = () => setData({ ...data, socialLinks: [...(data.socialLinks || []), { platform: 'Facebook', url: '' }] });
    const removeSocial = (i) => setData({ ...data, socialLinks: data.socialLinks.filter((_, idx) => idx !== i) });

    // Service links
    const updateService = (i, field, value) => {
        const links = [...data.serviceLinks];
        links[i][field] = value;
        setData({ ...data, serviceLinks: links });
    };
    const addService = () => setData({ ...data, serviceLinks: [...(data.serviceLinks || []), { label: '', path: '/services' }] });
    const removeService = (i) => setData({ ...data, serviceLinks: data.serviceLinks.filter((_, idx) => idx !== i) });

    // Quick links
    const updateQuick = (i, field, value) => {
        const links = [...data.quickLinks];
        links[i][field] = value;
        setData({ ...data, quickLinks: links });
    };
    const addQuick = () => setData({ ...data, quickLinks: [...(data.quickLinks || []), { label: '', path: '' }] });
    const removeQuick = (i) => setData({ ...data, quickLinks: data.quickLinks.filter((_, idx) => idx !== i) });

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Footer</h2>
                    <p>Edit the CTA banner, brand info, links, and contact details in the site footer.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* CTA */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>CTA Banner (green box)</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.cta?.label || ''} onChange={e => updateCta('label', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.cta?.btnText || ''} onChange={e => updateCta('btnText', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Title (Enter chapo notun line er jonno)</label>
                    <textarea rows="2" value={data.cta?.title || ''} onChange={e => updateCta('title', e.target.value)} />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Subtitle</label>
                        <input value={data.cta?.subtitle || ''} onChange={e => updateCta('subtitle', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Link</label>
                        <input value={data.cta?.btnLink || ''} onChange={e => updateCta('btnLink', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Brand */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Brand</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Logo Text</label>
                        <input value={data.logoText || ''} onChange={e => setData({ ...data, logoText: e.target.value })} placeholder="Amanah" />
                    </div>
                    <div className="admin-form-group">
                        <label>Logo Accent</label>
                        <input value={data.logoAccent || ''} onChange={e => setData({ ...data, logoAccent: e.target.value })} placeholder="IT" />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Description</label>
                    <textarea rows="3" value={data.description || ''} onChange={e => setData({ ...data, description: e.target.value })} />
                </div>
            </div>

            {/* Social Links */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--gray-900)' }}>Social Links</h3>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addSocial}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                {(data.socialLinks || []).map((s, i) => (
                    <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
                        <div className="admin-form-group">
                            <label>Platform</label>
                            <select value={s.platform} onChange={e => updateSocial(i, 'platform', e.target.value)}>
                                {SOCIAL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="admin-form-group">
                            <label>URL</label>
                            <input value={s.url} onChange={e => updateSocial(i, 'url', e.target.value)} />
                        </div>
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeSocial(i)}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Service Links */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--gray-900)' }}>Services Column</h3>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addService}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                {(data.serviceLinks || []).map((s, i) => (
                    <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
                        <div className="admin-form-group">
                            <label>Label</label>
                            <input value={s.label} onChange={e => updateService(i, 'label', e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label>Path</label>
                            <input value={s.path} onChange={e => updateService(i, 'path', e.target.value)} />
                        </div>
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeService(i)}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Quick Links */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--gray-900)' }}>Quick Links Column</h3>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addQuick}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                {(data.quickLinks || []).map((s, i) => (
                    <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
                        <div className="admin-form-group">
                            <label>Label</label>
                            <input value={s.label} onChange={e => updateQuick(i, 'label', e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label>Path</label>
                            <input value={s.path} onChange={e => updateQuick(i, 'path', e.target.value)} />
                        </div>
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeQuick(i)}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Contact info */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Get In Touch</h3>
                <div className="admin-form-group">
                    <label>Address</label>
                    <input value={data.address || ''} onChange={e => setData({ ...data, address: e.target.value })} />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input value={data.email || ''} onChange={e => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Phone</label>
                        <input value={data.phone || ''} onChange={e => setData({ ...data, phone: e.target.value })} />
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Copyright Text</h3>
                <div className="admin-form-group">
                    <label>Text (© year automatically age theke jog hoy)</label>
                    <input value={data.copyrightText || ''} onChange={e => setData({ ...data, copyrightText: e.target.value })} placeholder="AMANAH IT. All rights reserved." />
                </div>
            </div>

            {/* Developed By */}
            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    "Design & Developed By" Line (footer er sobcheye niche)
                </h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Text</label>
                        <input value={data.developedByText || ''} onChange={e => setData({ ...data, developedByText: e.target.value })} placeholder="Design & Developed By" />
                    </div>
                    <div className="admin-form-group">
                        <label>Company/Name (green color e dekhabe)</label>
                        <input value={data.developedByName || ''} onChange={e => setData({ ...data, developedByName: e.target.value })} placeholder="AMANAH IT" />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Link (optional — click korle kothay jabe)</label>
                    <input value={data.developedByLink || ''} onChange={e => setData({ ...data, developedByLink: e.target.value })} placeholder="https://amanahit.com" />
                </div>
            </div>
        </div>
    );
}