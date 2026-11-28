import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const SOCIAL_PLATFORMS = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'];

const EMPTY_DATA = {
    cta: { label: '', title: '', subtitle: '', btnText: '', btnLink: '' },
    logoText: '', logoAccent: '', description: '',
    socialLinks: [], serviceLinks: [], quickLinks: [],
    address: '', email: '', phone: '', copyrightText: '',
    developedByText: '', developedByName: '', developedByLink: '',
};

const cardTitleStyle = { fontSize: '1rem', fontWeight: 600, color: 'var(--gray-900)' };
const hintStyle = { fontSize: '12px', color: 'var(--gray-500)' };

/* ------------------------------------------------------------------
   Small presentational helpers (they only remove repeated markup)
   ------------------------------------------------------------------ */

function Card({ title, children, last }) {
    return (
        <div className="admin-card" style={last ? undefined : { marginBottom: '1.5rem' }}>
            <h3 style={{ ...cardTitleStyle, marginBottom: '0.75rem' }}>{title}</h3>
            {children}
        </div>
    );
}

// Card with a title and an "Add" button, used for every editable list
function ListCard({ title, onAdd, children }) {
    return (
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
                <h3 style={{ ...cardTitleStyle, margin: 0 }}>{title}</h3>
                <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={onAdd}>
                    <FiPlus size={14} /> Add
                </button>
            </div>
            {children}
        </div>
    );
}

function RemoveButton({ onClick, label }) {
    return (
        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={onClick} aria-label={label}>
            <FiTrash2 size={14} />
        </button>
    );
}

// Label + Path rows (Services column and Quick Links column are identical)
function LinkRows({ items, onUpdate, onRemove }) {
    return (items || []).map((item, i) => (
        <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
            <div className="admin-form-group">
                <label>Label</label>
                <input value={item.label} onChange={(e) => onUpdate(i, 'label', e.target.value)} />
            </div>
            <div className="admin-form-group">
                <label>Path</label>
                <input value={item.path} onChange={(e) => onUpdate(i, 'path', e.target.value)} />
            </div>
            <RemoveButton onClick={() => onRemove(i)} label={`Remove ${item.label || 'link'}`} />
        </div>
    ));
}

export default function FooterTab() {
    const [data, setData] = useState(EMPTY_DATA);
    const [loaded, setLoaded] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);

    // merge with defaults so a missing list (or the nested cta) never becomes undefined
    const withDefaults = (incoming) => ({
        ...EMPTY_DATA,
        ...incoming,
        cta: { ...EMPTY_DATA.cta, ...(incoming?.cta || {}) },
    });

    useEffect(() => {
        api.get('/footer')
            .then((r) => {
                setData(withDefaults(r.data));
                setLoaded(true);
            })
            .catch(() => toast.error('Could not load footer settings'));
    }, []);

    // warn before leaving the page with unsaved edits
    useEffect(() => {
        if (!dirty) return;
        const onBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }, [dirty]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/footer', data);
            setData(withDefaults(res.data));
            setDirty(false);
            toast.success('Footer updated!');
        } catch {
            toast.error('Failed to update');
        } finally {
            setSaving(false);
        }
    };

    // ---- state helpers: every change is immutable and marks the form as edited ----
    const patch = (changes) => {
        setData((d) => ({ ...d, ...changes }));
        setDirty(true);
    };
    const updateCta = (field, value) => {
        setData((d) => ({ ...d, cta: { ...d.cta, [field]: value } }));
        setDirty(true);
    };
    const updateList = (key, fn) => {
        setData((d) => ({ ...d, [key]: fn(d[key] || []) }));
        setDirty(true);
    };
    const setAt = (list, idx, change) => list.map((item, i) => (i === idx ? { ...item, ...change } : item));

    // ---- Social links ----
    const updateSocial = (i, field, value) => updateList('socialLinks', (l) => setAt(l, i, { [field]: value }));
    const addSocial = () => updateList('socialLinks', (l) => [...l, { platform: 'Facebook', url: '' }]);
    const removeSocial = (i) => updateList('socialLinks', (l) => l.filter((_, idx) => idx !== i));

    // ---- Service links ----
    const updateService = (i, field, value) => updateList('serviceLinks', (l) => setAt(l, i, { [field]: value }));
    const addService = () => updateList('serviceLinks', (l) => [...l, { label: '', path: '/services' }]);
    const removeService = (i) => updateList('serviceLinks', (l) => l.filter((_, idx) => idx !== i));

    // ---- Quick links ----
    const updateQuick = (i, field, value) => updateList('quickLinks', (l) => setAt(l, i, { [field]: value }));
    const addQuick = () => updateList('quickLinks', (l) => [...l, { label: '', path: '' }]);
    const removeQuick = (i) => updateList('quickLinks', (l) => l.filter((_, idx) => idx !== i));

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Footer</h2>
                    <p>Edit the CTA banner, brand info, links, and contact details in the site footer.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {dirty && <span style={{ ...hintStyle, color: 'var(--blue-600)' }}>Unsaved changes</span>}
                    {/* disabled until the saved settings have loaded, so a failed load can never overwrite them with blanks */}
                    <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving || !loaded}>
                        <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* CTA */}
            <Card title="CTA Banner (green box)">
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.cta.label} onChange={(e) => updateCta('label', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.cta.btnText} onChange={(e) => updateCta('btnText', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Title (Enter chapo notun line er jonno)</label>
                    <textarea rows="2" value={data.cta.title} onChange={(e) => updateCta('title', e.target.value)} />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Subtitle</label>
                        <input value={data.cta.subtitle} onChange={(e) => updateCta('subtitle', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Link</label>
                        <input value={data.cta.btnLink} onChange={(e) => updateCta('btnLink', e.target.value)} placeholder="/contact" />
                    </div>
                </div>
            </Card>

            {/* Brand */}
            <Card title="Brand">
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Logo Text</label>
                        <input value={data.logoText || ''} onChange={(e) => patch({ logoText: e.target.value })} placeholder="Amanah" />
                    </div>
                    <div className="admin-form-group">
                        <label>Logo Accent</label>
                        <input value={data.logoAccent || ''} onChange={(e) => patch({ logoAccent: e.target.value })} placeholder="IT" />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Description</label>
                    <textarea rows="3" value={data.description || ''} onChange={(e) => patch({ description: e.target.value })} />
                </div>
            </Card>

            {/* Social Links */}
            <ListCard title="Social Links" onAdd={addSocial}>
                {(data.socialLinks || []).map((s, i) => (
                    <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
                        <div className="admin-form-group">
                            <label>Platform</label>
                            <select value={s.platform} onChange={(e) => updateSocial(i, 'platform', e.target.value)}>
                                {SOCIAL_PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="admin-form-group">
                            <label>URL</label>
                            <input type="url" value={s.url} onChange={(e) => updateSocial(i, 'url', e.target.value)} placeholder="https://facebook.com/amanahit" />
                        </div>
                        <RemoveButton onClick={() => removeSocial(i)} label={`Remove ${s.platform} link`} />
                    </div>
                ))}
            </ListCard>

            {/* Service Links */}
            <ListCard title="Services Column" onAdd={addService}>
                <LinkRows items={data.serviceLinks} onUpdate={updateService} onRemove={removeService} />
            </ListCard>

            {/* Quick Links */}
            <ListCard title="Quick Links Column" onAdd={addQuick}>
                <LinkRows items={data.quickLinks} onUpdate={updateQuick} onRemove={removeQuick} />
            </ListCard>

            {/* Contact info */}
            <Card title="Get In Touch">
                <div className="admin-form-group">
                    <label>Address</label>
                    <input value={data.address || ''} onChange={(e) => patch({ address: e.target.value })} />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input type="email" value={data.email || ''} onChange={(e) => patch({ email: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Phone</label>
                        <input type="tel" value={data.phone || ''} onChange={(e) => patch({ phone: e.target.value })} />
                    </div>
                </div>
            </Card>

            {/* Copyright */}
            <Card title="Copyright Text">
                <div className="admin-form-group">
                    <label>Text (© year automatically age theke jog hoy)</label>
                    <input value={data.copyrightText || ''} onChange={(e) => patch({ copyrightText: e.target.value })} placeholder="AMANAH IT. All rights reserved." />
                </div>
            </Card>

            {/* Developed By */}
            <Card title={'"Design & Developed By" Line (footer er sobcheye niche)'} last>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Text</label>
                        <input value={data.developedByText || ''} onChange={(e) => patch({ developedByText: e.target.value })} placeholder="Design & Developed By" />
                    </div>
                    <div className="admin-form-group">
                        <label>Company/Name (green color e dekhabe)</label>
                        <input value={data.developedByName || ''} onChange={(e) => patch({ developedByName: e.target.value })} placeholder="AMANAH IT" />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Link (optional — click korle kothay jabe)</label>
                    <input type="url" value={data.developedByLink || ''} onChange={(e) => patch({ developedByLink: e.target.value })} placeholder="https://amanahit.com" />
                </div>
            </Card>
        </div>
    );
}