import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export default function HomeSectionsTab() {
    const [data, setData] = useState({
        whatWeOffer: { label: '', title: '', subtext: '', image: '', btnText: '' },
        keyCompetency: { label: '', title: '', subtext: '', image: '', caption: '', skills: [] },
        whyChooseUs: { label: '', title: '', subtext: '', btnText: '', images: [] },
        latestActivities: { label: '', title: '', btnText: '' },
        testimonialsHeader: { label: '', titlePrefix: '', titleHighlight: '', titleSuffix: '' },
        teamHeader: { label: '', title: '', subtext: '', executiveGroupTitle: '', coreGroupTitle: '' },
        servicesHeader: { label: '', titlePrefix: '', titleHighlight: '', subtext: '' },
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/home-sections').then(r => setData(r.data)).catch(() => { });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/home-sections', data);
            setData(res.data); // uploaded image URLs diye refresh koro
            toast.success('Homepage sections updated!');
        } catch {
            toast.error('Failed to update');
        } finally {
            setSaving(false);
        }
    };

    // ---------- WhatWeOffer ----------
    const updateWWO = (field, value) => setData({ ...data, whatWeOffer: { ...data.whatWeOffer, [field]: value } });
    const handleWWOImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        updateWWO('image', base64);
    };

    // ---------- KeyCompetency ----------
    const updateKC = (field, value) => setData({ ...data, keyCompetency: { ...data.keyCompetency, [field]: value } });
    const handleKCImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        updateKC('image', base64);
    };
    const updateSkill = (idx, field, value) => {
        const skills = [...data.keyCompetency.skills];
        skills[idx][field] = field === 'value' ? Number(value) : value;
        updateKC('skills', skills);
    };
    const addSkill = () => updateKC('skills', [...(data.keyCompetency.skills || []), { label: '', value: 90 }]);
    const removeSkill = (idx) => updateKC('skills', data.keyCompetency.skills.filter((_, i) => i !== idx));

    // ---------- WhyChooseUs ----------
    const updateWCU = (field, value) => setData({ ...data, whyChooseUs: { ...data.whyChooseUs, [field]: value } });
    const updateWCUImage = (idx, field, value) => {
        const images = [...data.whyChooseUs.images];
        images[idx][field] = value;
        updateWCU('images', images);
    };
    const handleWCUImageFile = async (idx, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        updateWCUImage(idx, 'url', base64);
    };

    // ---------- LatestActivities ----------
    const updateLA = (field, value) => setData({ ...data, latestActivities: { ...data.latestActivities, [field]: value } });

    // ---------- Testimonials Header ----------
    const updateTH = (field, value) => setData({ ...data, testimonialsHeader: { ...data.testimonialsHeader, [field]: value } });

    // ---------- Team Header ----------
    const updateTeamH = (field, value) => setData({ ...data, teamHeader: { ...data.teamHeader, [field]: value } });

    // ---------- Services Header ----------
    const updateSH = (field, value) => setData({ ...data, servicesHeader: { ...data.servicesHeader, [field]: value } });

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Homepage Sections</h2>
                    <p>Edit What We Offer, Key Competency, Why Choose Us, and Latest Activities header content.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* WHAT WE OFFER */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    What We Offer Section
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Note: er 4 ta service item "Services" tab theke ashe automatically — alada edit korar dorkar nei.
                </p>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.whatWeOffer?.label || ''} onChange={e => updateWWO('label', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.whatWeOffer?.btnText || ''} onChange={e => updateWWO('btnText', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Title</label>
                    <input value={data.whatWeOffer?.title || ''} onChange={e => updateWWO('title', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea rows="2" value={data.whatWeOffer?.subtext || ''} onChange={e => updateWWO('subtext', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Image</label>
                    {data.whatWeOffer?.image && <img src={data.whatWeOffer.image} alt="" style={{ width: 120, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
                    <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                        <FiUpload size={14} /> Upload Image
                        <input type="file" accept="image/*" onChange={handleWWOImage} style={{ display: 'none' }} />
                    </label>
                </div>
            </div>

            {/* KEY COMPETENCY */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Key Competency Section
                </h3>
                <div className="admin-form-group">
                    <label>Label</label>
                    <input value={data.keyCompetency?.label || ''} onChange={e => updateKC('label', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Title</label>
                    <input value={data.keyCompetency?.title || ''} onChange={e => updateKC('title', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea rows="2" value={data.keyCompetency?.subtext || ''} onChange={e => updateKC('subtext', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Image Caption</label>
                    <input value={data.keyCompetency?.caption || ''} onChange={e => updateKC('caption', e.target.value)} placeholder="2+ years of combined experience in this field" />
                </div>
                <div className="admin-form-group">
                    <label>Image</label>
                    {data.keyCompetency?.image && <img src={data.keyCompetency.image} alt="" style={{ width: 120, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
                    <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                        <FiUpload size={14} /> Upload Image
                        <input type="file" accept="image/*" onChange={handleKCImage} style={{ display: 'none' }} />
                    </label>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Skill Circles</label>
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addSkill}>
                            <FiPlus size={14} /> Add
                        </button>
                    </div>
                    {(data.keyCompetency?.skills || []).map((s, i) => (
                        <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
                            <div className="admin-form-group">
                                <label>Skill Name</label>
                                <input value={s.label} onChange={e => updateSkill(i, 'label', e.target.value)} placeholder="Web Development" />
                            </div>
                            <div className="admin-form-group">
                                <label>Percentage (%)</label>
                                <input type="number" min="0" max="100" value={s.value} onChange={e => updateSkill(i, 'value', e.target.value)} />
                            </div>
                            <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeSkill(i)}>
                                <FiTrash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* WHY CHOOSE US */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Why Choose Us Section
                </h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.whyChooseUs?.label || ''} onChange={e => updateWCU('label', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.whyChooseUs?.btnText || ''} onChange={e => updateWCU('btnText', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Title</label>
                    <input value={data.whyChooseUs?.title || ''} onChange={e => updateWCU('title', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea rows="2" value={data.whyChooseUs?.subtext || ''} onChange={e => updateWCU('subtext', e.target.value)} />
                </div>

                <label style={{ fontWeight: 600, display: 'block', marginTop: '1rem', marginBottom: '0.5rem' }}>Two Images</label>
                {(data.whyChooseUs?.images || []).map((img, i) => (
                    <div key={i} className="admin-card" style={{ marginBottom: '0.75rem', background: 'var(--gray-50)' }}>
                        {img.url && <img src={img.url} alt="" style={{ width: 120, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
                        <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer', marginBottom: 8 }}>
                            <FiUpload size={14} /> Upload Image
                            <input type="file" accept="image/*" onChange={e => handleWCUImageFile(i, e)} style={{ display: 'none' }} />
                        </label>
                        <div className="admin-form-group">
                            <label>Caption</label>
                            <input value={img.caption} onChange={e => updateWCUImage(i, 'caption', e.target.value)} placeholder="Professional Strategy" />
                        </div>
                    </div>
                ))}
            </div>

            {/* LATEST ACTIVITIES */}
            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Latest Activities Header
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Note: actual blog posts "Blog / Articles" tab theke manage hoy — eikhane shudhu header text.
                </p>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.latestActivities?.label || ''} onChange={e => updateLA('label', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.latestActivities?.btnText || ''} onChange={e => updateLA('btnText', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Title</label>
                    <input value={data.latestActivities?.title || ''} onChange={e => updateLA('title', e.target.value)} />
                </div>
            </div>

            {/* TESTIMONIALS HEADER */}
            <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Testimonials Header
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Note: actual reviews "Testimonials" tab theke manage hoy — eikhane shudhu header text. Title tin ta part e bhaga (highlight part-ta gradient color e dekhabe).
                </p>
                <div className="admin-form-group">
                    <label>Label</label>
                    <input value={data.testimonialsHeader?.label || ''} onChange={e => updateTH('label', e.target.value)} />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Title — Prefix</label>
                        <input value={data.testimonialsHeader?.titlePrefix || ''} onChange={e => updateTH('titlePrefix', e.target.value)} placeholder="What Our " />
                    </div>
                    <div className="admin-form-group">
                        <label>Title — Highlighted Part</label>
                        <input value={data.testimonialsHeader?.titleHighlight || ''} onChange={e => updateTH('titleHighlight', e.target.value)} placeholder="Clients Say" />
                    </div>
                    <div className="admin-form-group">
                        <label>Title — Suffix</label>
                        <input value={data.testimonialsHeader?.titleSuffix || ''} onChange={e => updateTH('titleSuffix', e.target.value)} placeholder=" About Us" />
                    </div>
                </div>
            </div>

            {/* TEAM HEADER */}
            <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Team Section Header
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Note: actual team members "Team" tab theke manage hoy — eikhane shudhu header text ar group titles.
                </p>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.teamHeader?.label || ''} onChange={e => updateTeamH('label', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Title</label>
                        <input value={data.teamHeader?.title || ''} onChange={e => updateTeamH('title', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea rows="2" value={data.teamHeader?.subtext || ''} onChange={e => updateTeamH('subtext', e.target.value)} />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Executive Group Title</label>
                        <input value={data.teamHeader?.executiveGroupTitle || ''} onChange={e => updateTeamH('executiveGroupTitle', e.target.value)} placeholder="Executive Leader" />
                    </div>
                    <div className="admin-form-group">
                        <label>Core Team Group Title</label>
                        <input value={data.teamHeader?.coreGroupTitle || ''} onChange={e => updateTeamH('coreGroupTitle', e.target.value)} placeholder="Core Team" />
                    </div>
                </div>
            </div>

            {/* SERVICES HEADER */}
            <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Services Section Header
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Note: actual services list "Services" tab theke manage hoy — eikhane shudhu header text.
                </p>
                <div className="admin-form-group">
                    <label>Label</label>
                    <input value={data.servicesHeader?.label || ''} onChange={e => updateSH('label', e.target.value)} />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Title — Prefix</label>
                        <input value={data.servicesHeader?.titlePrefix || ''} onChange={e => updateSH('titlePrefix', e.target.value)} placeholder="Services That " />
                    </div>
                    <div className="admin-form-group">
                        <label>Title — Highlighted Part</label>
                        <input value={data.servicesHeader?.titleHighlight || ''} onChange={e => updateSH('titleHighlight', e.target.value)} placeholder="Drive Results" />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea rows="2" value={data.servicesHeader?.subtext || ''} onChange={e => updateSH('subtext', e.target.value)} />
                </div>
            </div>
        </div>
    );
}