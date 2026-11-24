import { useState, useEffect } from 'react';
import { FiSave, FiUpload, FiPlus, FiX, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

// The banner image is stored as base64 text, so keep it reasonably small.
const MAX_IMAGE_MB = 3;

const EMPTY_LABELS = {
    email: '', companyName: '', fullName: '', companyAddress: '', phone: '',
    officialWebsite: '', numberOfEmployee: '', communicationPreference: '',
    serviceType: '', iAm: '', message: '', submitBtn: '', submittingBtn: '', successMessage: '',
};

const EMPTY_DATA = {
    bannerTitle: '', breadcrumbCurrent: '', bannerImage: '', introHeading: '', introText: '',
    phone: '', email: '', addressLine1: '', addressLine2: '', mapEmbedUrl: '',
    serviceTypes: [],
    formLabels: EMPTY_LABELS,
};

// Every contact-form label input, in display order (two per row).
// The inputs below are built from this list instead of 14 copy-pasted blocks.
const FORM_LABEL_FIELDS = [
    { key: 'email', label: 'Email Label' },
    { key: 'companyName', label: 'Company Name Label' },
    { key: 'fullName', label: 'Full Name Label' },
    { key: 'companyAddress', label: 'Company Address Label' },
    { key: 'phone', label: 'Phone Number Label' },
    { key: 'officialWebsite', label: 'Official Website Label' },
    { key: 'numberOfEmployee', label: 'Numbers of Employee Label' },
    { key: 'communicationPreference', label: 'Communication Preference Label' },
    { key: 'serviceType', label: 'Service Type Label' },
    { key: 'iAm', label: '"I am..." Label' },
    { key: 'message', label: 'Message Label' },
    { key: 'submitBtn', label: 'Submit Button Text' },
    { key: 'submittingBtn', label: 'Submitting Button Text' },
    { key: 'successMessage', label: 'Success Message' },
];

const cardTitleStyle = { fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' };
const hintStyle = { fontSize: '12px', color: 'var(--gray-500)' };

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

// If someone pastes the whole <iframe ...> code from Google Maps, keep only the src URL
const extractMapSrc = (value) => {
    const match = value.match(/src\s*=\s*["']([^"']+)["']/i);
    return match ? match[1] : value;
};

function Card({ title, children, style }) {
    return (
        <div className="admin-card" style={style}>
            <h3 style={cardTitleStyle}>{title}</h3>
            {children}
        </div>
    );
}

export default function ContactPageTab() {
    const [data, setData] = useState(EMPTY_DATA);
    const [loaded, setLoaded] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);
    const [typeInput, setTypeInput] = useState('');

    // merge with defaults so a missing field (or the nested formLabels) never becomes undefined
    const withDefaults = (incoming) => ({
        ...EMPTY_DATA,
        ...incoming,
        formLabels: { ...EMPTY_LABELS, ...(incoming?.formLabels || {}) },
    });

    useEffect(() => {
        api.get('/contact-page')
            .then((r) => {
                setData(withDefaults(r.data));
                setLoaded(true);
            })
            .catch(() => toast.error('Could not load contact page settings'));
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
            const res = await api.put('/contact-page', data);
            setData(withDefaults(res.data));
            setDirty(false);
            toast.success('Contact page updated!');
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
    const updateLabel = (field, value) => {
        setData((d) => ({ ...d, formLabels: { ...d.formLabels, [field]: value } }));
        setDirty(true);
    };

    const handleImage = async (e) => {
        const input = e.target;
        const file = input.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
            toast.error(`Image must be under ${MAX_IMAGE_MB} MB`);
            input.value = '';
            return;
        }

        try {
            patch({ bannerImage: await fileToBase64(file) });
        } catch {
            toast.error('Could not read the image');
        }
        input.value = ''; // lets the same file be picked again later
    };

    const addServiceType = () => {
        const value = typeInput.trim();
        if (!value) return;

        // skip duplicates (case-insensitive)
        const exists = (data.serviceTypes || []).some((t) => t.toLowerCase() === value.toLowerCase());
        if (!exists) patch({ serviceTypes: [...(data.serviceTypes || []), value] });
        setTypeInput('');
    };
    const removeServiceType = (idx) => patch({ serviceTypes: data.serviceTypes.filter((_, i) => i !== idx) });

    // group the label fields two per row
    const labelRows = [];
    for (let i = 0; i < FORM_LABEL_FIELDS.length; i += 2) labelRows.push(FORM_LABEL_FIELDS.slice(i, i + 2));

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Contact Page</h2>
                    <p>Edit the banner, intro text, contact info cards, and map. Messages are managed in the "Messages" tab.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {dirty && <span style={{ ...hintStyle, color: 'var(--blue-600)' }}>Unsaved changes</span>}
                    {/* disabled until the saved settings have loaded, so a failed load can never overwrite them with blanks */}
                    <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving || !loaded}>
                        <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <Card title="Page Banner" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Banner Title</label>
                        <input value={data.bannerTitle || ''} onChange={(e) => patch({ bannerTitle: e.target.value })} placeholder="Contact" />
                    </div>
                    <div className="admin-form-group">
                        <label>Breadcrumb Text</label>
                        <input value={data.breadcrumbCurrent || ''} onChange={(e) => patch({ breadcrumbCurrent: e.target.value })} placeholder="Contact" />
                    </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                    <label>Banner Background Image (optional)</label>
                    {data.bannerImage && (
                        <img src={data.bannerImage} alt="Banner preview" style={{ width: 200, borderRadius: 8, marginBottom: 8, display: 'block' }} />
                    )}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                            <FiUpload size={14} /> {data.bannerImage ? 'Change Image' : 'Upload Image'}
                            <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                        </label>
                        {data.bannerImage && (
                            <button
                                type="button"
                                className="admin-btn admin-btn-outline admin-btn-sm"
                                style={{ width: 'fit-content' }}
                                onClick={() => patch({ bannerImage: '' })}
                            >
                                <FiTrash2 size={14} /> Remove (use default design)
                            </button>
                        )}
                    </div>
                    <p style={{ ...hintStyle, marginTop: '6px' }}>
                        Image na dile default color/design dekhabe (jemon age chilo).
                    </p>
                </div>
            </Card>

            <Card title="Intro Text" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-form-group">
                    <label>Heading (Enter chapo notun line er jonno)</label>
                    <textarea rows="2" value={data.introHeading || ''} onChange={(e) => patch({ introHeading: e.target.value })} />
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea rows="2" value={data.introText || ''} onChange={(e) => patch({ introText: e.target.value })} />
                </div>
            </Card>

            <Card title="Info Cards (Phone / Email / Address)" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Phone</label>
                        <input type="tel" value={data.phone || ''} onChange={(e) => patch({ phone: e.target.value })} placeholder="+880 18 4418 5480" />
                    </div>
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input type="email" value={data.email || ''} onChange={(e) => patch({ email: e.target.value })} placeholder="info@amanahit.com" />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Address Line 1</label>
                        <input value={data.addressLine1 || ''} onChange={(e) => patch({ addressLine1: e.target.value })} placeholder="House-774, Road-11, Avenue-02" />
                    </div>
                    <div className="admin-form-group">
                        <label>Address Line 2</label>
                        <input value={data.addressLine2 || ''} onChange={(e) => patch({ addressLine2: e.target.value })} placeholder="Mirpur DOHS, Dhaka-1216" />
                    </div>
                </div>
            </Card>

            <Card title="Google Map">
                <div className="admin-form-group">
                    <label>Map Embed URL</label>
                    <textarea
                        rows="3"
                        value={data.mapEmbedUrl || ''}
                        onChange={(e) => patch({ mapEmbedUrl: extractMapSrc(e.target.value) })}
                        placeholder="https://www.google.com/maps/embed?..."
                    />
                </div>
                <p style={hintStyle}>
                    Google Maps e giye tomar location search koro → Share → Embed a map → HTML code copy kore ekhane paste koro.
                    Poora <code>&lt;iframe ...&gt;</code> paste korle-o cholbe, shudhu <code>src</code> er URL ta nijei rekhe dibe.
                </p>
            </Card>

            {/* SERVICE TYPES */}
            <Card title="Service Type Dropdown Options" style={{ marginTop: '1.5rem' }}>
                <p style={{ ...hintStyle, marginBottom: '0.75rem' }}>
                    Contact form er "Service Type" dropdown e ei list dekhabe. Jotota khushi option add/remove korte paro.
                </p>
                <div className="admin-form-inline-edit" style={{ marginBottom: '0.75rem' }}>
                    <input
                        value={typeInput}
                        onChange={(e) => setTypeInput(e.target.value)}
                        placeholder="e.g. Others"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addServiceType())}
                    />
                    <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addServiceType}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                <div className="admin-tags-input">
                    {(data.serviceTypes || []).map((s, i) => (
                        <span key={s} className="admin-tag-chip">
                            {s}
                            <button type="button" onClick={() => removeServiceType(i)} aria-label={`Remove ${s}`}>
                                <FiX size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            </Card>

            {/* FORM FIELD LABELS */}
            <Card title="Contact Form Field Labels" style={{ marginTop: '1.5rem' }}>
                <p style={{ ...hintStyle, marginBottom: '0.75rem' }}>
                    Form er protik field er label text ekhane change korte paro (field structure/order fixed thakbe, shudhu text change hobe).
                </p>
                {labelRows.map((row) => (
                    <div className="admin-form-row" key={row[0].key}>
                        {row.map(({ key, label }) => (
                            <div className="admin-form-group" key={key}>
                                <label htmlFor={`contact-label-${key}`}>{label}</label>
                                <input
                                    id={`contact-label-${key}`}
                                    value={data.formLabels[key] || ''}
                                    onChange={(e) => updateLabel(key, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </Card>
        </div>
    );
}