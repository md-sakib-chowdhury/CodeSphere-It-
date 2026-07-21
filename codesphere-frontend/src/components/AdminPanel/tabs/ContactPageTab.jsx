import { useState, useEffect } from 'react';
import { FiSave, FiUpload, FiPlus, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export default function ContactPageTab() {
    const [data, setData] = useState({
        bannerTitle: '', breadcrumbCurrent: '', introHeading: '', introText: '',
        phone: '', email: '', addressLine1: '', addressLine2: '', mapEmbedUrl: '',
        serviceTypes: [],
        formLabels: {
            email: '', companyName: '', fullName: '', companyAddress: '', phone: '',
            officialWebsite: '', numberOfEmployee: '', communicationPreference: '',
            serviceType: '', iAm: '', message: '', submitBtn: '', submittingBtn: '', successMessage: '',
        },
    });
    const [saving, setSaving] = useState(false);
    const [typeInput, setTypeInput] = useState('');

    useEffect(() => {
        api.get('/contact-page').then(r => setData(r.data)).catch(() => { });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/contact-page', data);
            setData(res.data);
            toast.success('Contact page updated!');
        } catch {
            toast.error('Failed to update');
        } finally {
            setSaving(false);
        }
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        setData({ ...data, bannerImage: base64 });
    };

    const addServiceType = () => {
        if (!typeInput.trim()) return;
        setData({ ...data, serviceTypes: [...(data.serviceTypes || []), typeInput.trim()] });
        setTypeInput('');
    };
    const removeServiceType = (idx) => {
        setData({ ...data, serviceTypes: data.serviceTypes.filter((_, i) => i !== idx) });
    };

    const updateLabel = (field, value) => setData({ ...data, formLabels: { ...data.formLabels, [field]: value } });

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Contact Page</h2>
                    <p>Edit the banner, intro text, contact info cards, and map. Messages are managed in the "Messages" tab.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Page Banner
                </h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Banner Title</label>
                        <input value={data.bannerTitle || ''} onChange={e => setData({ ...data, bannerTitle: e.target.value })} placeholder="Contact" />
                    </div>
                    <div className="admin-form-group">
                        <label>Breadcrumb Text</label>
                        <input value={data.breadcrumbCurrent || ''} onChange={e => setData({ ...data, breadcrumbCurrent: e.target.value })} placeholder="Contact" />
                    </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                    <label>Banner Background Image (optional)</label>
                    {data.bannerImage && <img src={data.bannerImage} alt="" style={{ width: 200, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
                    <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                        <FiUpload size={14} /> Upload Image
                        <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                    </label>
                    <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '6px' }}>
                        Image na dile default color/design dekhabe (jemon age chilo)।
                    </p>
                </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Intro Text
                </h3>
                <div className="admin-form-group">
                    <label>Heading (Enter chapo notun line er jonno)</label>
                    <textarea rows="2" value={data.introHeading || ''} onChange={e => setData({ ...data, introHeading: e.target.value })} />
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea rows="2" value={data.introText || ''} onChange={e => setData({ ...data, introText: e.target.value })} />
                </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Info Cards (Phone / Email / Address)
                </h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Phone</label>
                        <input value={data.phone || ''} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+880 18 4418 5480" />
                    </div>
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input value={data.email || ''} onChange={e => setData({ ...data, email: e.target.value })} placeholder="info@amanahit.com" />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Address Line 1</label>
                        <input value={data.addressLine1 || ''} onChange={e => setData({ ...data, addressLine1: e.target.value })} placeholder="House-774, Road-11, Avenue-02" />
                    </div>
                    <div className="admin-form-group">
                        <label>Address Line 2</label>
                        <input value={data.addressLine2 || ''} onChange={e => setData({ ...data, addressLine2: e.target.value })} placeholder="Mirpur DOHS, Dhaka-1216" />
                    </div>
                </div>
            </div>

            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Google Map
                </h3>
                <div className="admin-form-group">
                    <label>Map Embed URL</label>
                    <textarea rows="3" value={data.mapEmbedUrl || ''} onChange={e => setData({ ...data, mapEmbedUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?..." />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                    Google Maps e giye tomar location search koro → Share → Embed a map → HTML code theke shudhu <code>src="..."</code> er ভিতরের URL ta copy kore ekhane paste koro।
                </p>
            </div>

            {/* SERVICE TYPES */}
            <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Service Type Dropdown Options
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Contact form er "Service Type" dropdown e ei list dekhabe। Jotota khushi option add/remove korte paro।
                </p>
                <div className="admin-form-inline-edit" style={{ marginBottom: '0.75rem' }}>
                    <input
                        value={typeInput}
                        onChange={e => setTypeInput(e.target.value)}
                        placeholder="e.g. Others"
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addServiceType())}
                    />
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addServiceType}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                <div className="admin-tags-input">
                    {(data.serviceTypes || []).map((s, i) => (
                        <span key={i} className="admin-tag-chip">
                            {s}
                            <button onClick={() => removeServiceType(i)}><FiX size={12} /></button>
                        </span>
                    ))}
                </div>
            </div>

            {/* FORM FIELD LABELS */}
            <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Contact Form Field Labels
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Form er protik field er label text ekhane change korte paro (field structure/order fixed thakbe, shudhu text change hobe)।
                </p>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Email Label</label>
                        <input value={data.formLabels?.email || ''} onChange={e => updateLabel('email', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Company Name Label</label>
                        <input value={data.formLabels?.companyName || ''} onChange={e => updateLabel('companyName', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Full Name Label</label>
                        <input value={data.formLabels?.fullName || ''} onChange={e => updateLabel('fullName', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Company Address Label</label>
                        <input value={data.formLabels?.companyAddress || ''} onChange={e => updateLabel('companyAddress', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Phone Number Label</label>
                        <input value={data.formLabels?.phone || ''} onChange={e => updateLabel('phone', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Official Website Label</label>
                        <input value={data.formLabels?.officialWebsite || ''} onChange={e => updateLabel('officialWebsite', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Numbers of Employee Label</label>
                        <input value={data.formLabels?.numberOfEmployee || ''} onChange={e => updateLabel('numberOfEmployee', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Communication Preference Label</label>
                        <input value={data.formLabels?.communicationPreference || ''} onChange={e => updateLabel('communicationPreference', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Service Type Label</label>
                        <input value={data.formLabels?.serviceType || ''} onChange={e => updateLabel('serviceType', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>"I am..." Label</label>
                        <input value={data.formLabels?.iAm || ''} onChange={e => updateLabel('iAm', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Message Label</label>
                        <input value={data.formLabels?.message || ''} onChange={e => updateLabel('message', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Submit Button Text</label>
                        <input value={data.formLabels?.submitBtn || ''} onChange={e => updateLabel('submitBtn', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Submitting Button Text</label>
                        <input value={data.formLabels?.submittingBtn || ''} onChange={e => updateLabel('submittingBtn', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Success Message</label>
                        <input value={data.formLabels?.successMessage || ''} onChange={e => updateLabel('successMessage', e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
}