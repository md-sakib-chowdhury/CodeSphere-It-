import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const SOCIAL_PLATFORMS = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'];

export default function NavbarTab() {
    const [data, setData] = useState({
        logoText: '', logoAccent: '', phone: '', email: '',
        socialLinks: [], menuLinks: [], brochureText: '', brochureLink: '',
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/navbar').then(r => setData(r.data)).catch(() => { });
    }, []);

    const updateSocial = (idx, field, value) => {
        const links = [...data.socialLinks];
        links[idx][field] = value;
        setData({ ...data, socialLinks: links });
    };

    const addSocial = () => {
        setData({ ...data, socialLinks: [...(data.socialLinks || []), { platform: 'Facebook', url: '' }] });
    };

    const removeSocial = (idx) => {
        setData({ ...data, socialLinks: data.socialLinks.filter((_, i) => i !== idx) });
    };

    const updateMenu = (idx, field, value) => {
        const links = [...data.menuLinks];
        links[idx][field] = value;
        setData({ ...data, menuLinks: links });
    };

    const addMenu = () => {
        setData({ ...data, menuLinks: [...(data.menuLinks || []), { label: '', path: '' }] });
    };

    const removeMenu = (idx) => {
        setData({ ...data, menuLinks: data.menuLinks.filter((_, i) => i !== idx) });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/navbar', data);
            toast.success('Navbar updated!');
        } catch {
            toast.error('Failed to update navbar');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Navbar / Header</h2>
                    <p>Edit logo, contact info, social links, menu, and brochure button.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Logo */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Logo</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Logo Text (main part)</label>
                        <input
                            value={data.logoText || ''}
                            onChange={e => setData({ ...data, logoText: e.target.value })}
                            placeholder="Amanah"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Logo Accent (colored part)</label>
                        <input
                            value={data.logoAccent || ''}
                            onChange={e => setData({ ...data, logoAccent: e.target.value })}
                            placeholder=".IT"
                        />
                    </div>
                </div>
            </div>

            {/* Contact info */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Top Bar Contact Info</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Phone</label>
                        <input
                            value={data.phone || ''}
                            onChange={e => setData({ ...data, phone: e.target.value })}
                            placeholder="+880 1800-000000"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input
                            value={data.email || ''}
                            onChange={e => setData({ ...data, email: e.target.value })}
                            placeholder="info@amanahit.com"
                        />
                    </div>
                </div>
            </div>

            {/* Social links */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-page-header" style={{ marginBottom: '0.75rem' }}>
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
                            <input
                                value={s.url}
                                onChange={e => updateSocial(i, 'url', e.target.value)}
                                placeholder="https://facebook.com/amanahit"
                            />
                        </div>
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeSocial(i)}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Menu links */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-page-header" style={{ marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--gray-900)' }}>Menu Links</h3>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addMenu}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Note: path <code>/services</code> ba <code>/solutions</code> dile mega dropdown menu automatically dekhabe.
                </p>
                {(data.menuLinks || []).map((m, i) => (
                    <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
                        <div className="admin-form-group">
                            <label>Label</label>
                            <input
                                value={m.label}
                                onChange={e => updateMenu(i, 'label', e.target.value)}
                                placeholder="Home"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Path</label>
                            <input
                                value={m.path}
                                onChange={e => updateMenu(i, 'path', e.target.value)}
                                placeholder="/"
                            />
                        </div>
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeMenu(i)}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Brochure */}
            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Brochure Button</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input
                            value={data.brochureText || ''}
                            onChange={e => setData({ ...data, brochureText: e.target.value })}
                            placeholder="Brochure"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>PDF Link</label>
                        <input
                            value={data.brochureLink || ''}
                            onChange={e => setData({ ...data, brochureLink: e.target.value })}
                            placeholder="/brochure.pdf"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}