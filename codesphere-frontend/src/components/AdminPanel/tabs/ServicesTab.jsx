import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const ICON_OPTIONS = ['FiCode', 'FiShoppingCart', 'FiLayout', 'FiServer', 'FiCloud', 'FiSmartphone'];
const BENEFIT_ICON_OPTIONS = ['FiZap', 'FiShield', 'FiHeadphones', 'FiCheckCircle', 'FiTrendingUp', 'FiClock'];

const EMPTY = {
    title: '', slug: '', icon: 'FiCode', color: '#2563eb', image: '',
    description: '', body: '', features: [], stack: [], order: 0, isActive: true,
};

const DEFAULT_PAGE_HEADER = {
    heroTitle: 'Our Services',
    heroSubtitle: 'MERN stack development, e-commerce, and custom software — built by a team that ships and stays around to support it.',
    introHeading: 'Software That Fits the Way You Actually Work',
    introText: "AMANAH IT builds full-stack web applications, e-commerce platforms, and custom software using the MERN stack — React, Node.js, Express, and MongoDB. Every project is scoped around a real business problem, not a template. Below is what we handle end-to-end, from the first wireframe to production deployment.",
};

const DEFAULT_BENEFITS = {
    heading: 'Why Work With AMANAH IT',
    subtext: 'Three things clients consistently point to when they come back for a second project.',
    items: [
        { icon: 'FiZap', title: 'Built for Speed', text: 'We ship working software in weeks, not quarters — with clear milestones you can track.' },
        { icon: 'FiShield', title: 'Transparent Process', text: 'Fixed scope, fixed price where possible, and no surprise revisions hidden in the fine print.' },
        { icon: 'FiHeadphones', title: 'Support After Launch', text: "A project isn't done at deployment. We stay reachable for fixes, updates, and questions." },
    ],
};

const DEFAULT_CTA_STRIP = {
    title: 'Have a project in mind?',
    buttonText: 'Talk to Us',
    buttonLink: '/contact',
};

const DEFAULT_SERVICES_BOTTOM_CTA = {
    eyebrow: 'Request a Quote',
    heading: 'Need a Custom Solution for Your Business?',
    buttonText: 'Start a Project',
    buttonLink: '/contact',
};

const DEFAULT_PROCESS = {
    heading: 'How We Work',
    steps: [
        { step: '01', title: 'Discovery', text: 'We map out your workflow, users, and constraints before any design or code.' },
        { step: '02', title: 'Design & Build', text: 'Wireframes, then a working build in short, reviewable milestones.' },
        { step: '03', title: 'Test & Launch', text: 'QA across devices, then deployment to production with monitoring in place.' },
        { step: '04', title: 'Support', text: 'We stay reachable after launch for fixes and new features.' },
    ],
};

// Detail-page Benefits — shows right after "How We Work" on /services/:slug.
// Same on every service detail page (like Process above), with an optional
// banner image at the bottom.
const DEFAULT_DETAIL_BENEFITS = {
    heading: 'Benefits',
    intro: "In today's fast-paced corporate landscape, modern enterprises must remain agile, responsive, and seamlessly interconnected. Our comprehensive IT Management Services empower you to take absolute control of your technological infrastructure, driving operational efficiency and keeping you ahead of the competition. Discover the strategic advantages of implementing our IT Management Services:",
    items: [
        { icon: 'FiClock', title: 'Proactive Maintenance', text: 'We utilize advanced proactive monitoring to continuously track your systems, resolving potential infrastructure issues before they cause costly downtime.' },
        { icon: 'FiTrendingUp', title: 'Cost Optimization', text: 'Outsourcing your technology management is significantly more cost-effective than hiring, training, and maintaining a full-time, in-house IT department.' },
        { icon: 'FiZap', title: 'Seamless Scalability', text: 'Our flexible IT solutions adapt instantly to your operational needs, helping you effortlessly scale your technology infrastructure as your business grows.' },
    ],
    image: '',
    closingText: "At Amanah IT, we're dedicated to providing top-notch technology solutions that help businesses thrive in today's fast-paced digital world. With tailored solutions and an expert team behind you, you can focus on growing your business while we handle your technology needs. Don't let IT challenges hold you back — contact us today and let's build something great together.",
};

const DEFAULT_SIDEBAR_CTA = {
    heading: 'Need this for your business?',
    text: "Tell us what you're building and we'll get back within a day.",
    buttonText: 'Request a Quote',
    buttonLink: '/contact',
};

const DEFAULT_DETAIL_BOTTOM_CTA = {
    eyebrow: 'Get Started',
    headingPrefix: 'Ready to Build ',
    buttonText: 'Start a Project',
    buttonLink: '/contact',
};

export default function ServicesTab() {
    // ---- Services CRUD state ----
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [featureInput, setFeatureInput] = useState('');
    const [stackInput, setStackInput] = useState('');
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(true);

    // ---- Static section content state ----
    const [pageHeader, setPageHeader] = useState(DEFAULT_PAGE_HEADER);
    const [benefits, setBenefits] = useState(DEFAULT_BENEFITS);
    const [ctaStrip, setCtaStrip] = useState(DEFAULT_CTA_STRIP);
    const [servicesBottomCta, setServicesBottomCta] = useState(DEFAULT_SERVICES_BOTTOM_CTA);
    const [processData, setProcessData] = useState(DEFAULT_PROCESS);
    const [detailBenefits, setDetailBenefits] = useState(DEFAULT_DETAIL_BENEFITS);
    const [detailBenefitsPreview, setDetailBenefitsPreview] = useState('');
    const [sidebarCta, setSidebarCta] = useState(DEFAULT_SIDEBAR_CTA);
    const [detailBottomCta, setDetailBottomCta] = useState(DEFAULT_DETAIL_BOTTOM_CTA);
    const [savingKey, setSavingKey] = useState('');

    const load = () => api.get('/services/all').then(r => setServices(r.data)).catch(() => { }).finally(() => setLoading(false));

    const loadSections = () => {
        api.get('/home-sections').then(r => {
            const d = r.data || {};
            if (d.servicesPageHeader) setPageHeader({ ...DEFAULT_PAGE_HEADER, ...d.servicesPageHeader });
            if (d.servicesPageBenefits?.items?.length) setBenefits({ ...DEFAULT_BENEFITS, ...d.servicesPageBenefits });
            if (d.servicesPageCtaStrip) setCtaStrip({ ...DEFAULT_CTA_STRIP, ...d.servicesPageCtaStrip });
            if (d.servicesPageBottomCta) setServicesBottomCta({ ...DEFAULT_SERVICES_BOTTOM_CTA, ...d.servicesPageBottomCta });
            if (d.serviceDetailProcess?.steps?.length) setProcessData({ ...DEFAULT_PROCESS, ...d.serviceDetailProcess });
            if (d.serviceDetailBenefits?.items?.length) {
                const merged = { ...DEFAULT_DETAIL_BENEFITS, ...d.serviceDetailBenefits };
                setDetailBenefits(merged);
                setDetailBenefitsPreview(merged.image || '');
            }
            if (d.serviceDetailSidebarCta) setSidebarCta({ ...DEFAULT_SIDEBAR_CTA, ...d.serviceDetailSidebarCta });
            if (d.serviceDetailBottomCta) setDetailBottomCta({ ...DEFAULT_DETAIL_BOTTOM_CTA, ...d.serviceDetailBottomCta });
        }).catch(() => { });
    };

    useEffect(() => { load(); loadSections(); }, []);

    // ---- Generic save-one-key helper for /home-sections ----
    const saveSection = async (key, value, label) => {
        setSavingKey(key);
        try {
            await api.put('/home-sections', { [key]: value });
            toast.success(`${label} updated!`);
        } catch {
            toast.error(`Failed to update ${label}`);
        } finally {
            setSavingKey('');
        }
    };

    // ---- Services CRUD handlers (unchanged) ----
    const openCreate = () => { setEditing(null); setForm(EMPTY); setPreview(''); setShowModal(true); };
    const openEdit = (s) => { setEditing(s); setForm({ ...EMPTY, ...s }); setPreview(s.image || ''); setShowModal(true); };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            setForm({ ...form, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    // ---- Detail Benefits banner image upload ----
    const handleDetailBenefitsImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setDetailBenefitsPreview(reader.result);
            setDetailBenefits({ ...detailBenefits, image: reader.result });
        };
        reader.readAsDataURL(file);
    };
    const removeDetailBenefitsImage = () => {
        setDetailBenefitsPreview('');
        setDetailBenefits({ ...detailBenefits, image: '' });
    };

    const addFeature = () => {
        if (!featureInput.trim()) return;
        setForm({ ...form, features: [...(form.features || []), featureInput.trim()] });
        setFeatureInput('');
    };
    const removeFeature = (i) => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });

    const addStack = () => {
        if (!stackInput.trim()) return;
        setForm({ ...form, stack: [...(form.stack || []), stackInput.trim()] });
        setStackInput('');
    };
    const removeStack = (i) => setForm({ ...form, stack: form.stack.filter((_, idx) => idx !== i) });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await api.put(`/services/${editing._id}`, form);
                toast.success('Service updated!');
            } else {
                await api.post('/services', form);
                toast.success('Service added!');
            }
            setShowModal(false);
            load();
        } catch {
            toast.error('Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Remove this service?')) return;
        try {
            await api.delete(`/services/${id}`);
            toast.success('Service removed');
            load();
        } catch {
            toast.error('Failed to delete');
        }
    };

    // ---- Benefits items add/remove/update (/services page) ----
    const updateBenefitItem = (i, field, value) => {
        const items = [...benefits.items];
        items[i] = { ...items[i], [field]: value };
        setBenefits({ ...benefits, items });
    };
    const addBenefitItem = () => {
        setBenefits({ ...benefits, items: [...(benefits.items || []), { icon: 'FiZap', title: '', text: '' }] });
    };
    const removeBenefitItem = (i) => {
        setBenefits({ ...benefits, items: benefits.items.filter((_, idx) => idx !== i) });
    };

    // ---- Process steps add/remove/update ----
    const updateProcessStep = (i, field, value) => {
        const steps = [...processData.steps];
        steps[i] = { ...steps[i], [field]: value };
        setProcessData({ ...processData, steps });
    };
    const addProcessStep = () => {
        const nextNum = String((processData.steps?.length || 0) + 1).padStart(2, '0');
        setProcessData({ ...processData, steps: [...(processData.steps || []), { step: nextNum, title: '', text: '' }] });
    };
    const removeProcessStep = (i) => {
        setProcessData({ ...processData, steps: processData.steps.filter((_, idx) => idx !== i) });
    };

    // ---- Detail-page Benefit items add/remove/update ----
    const updateDetailBenefitItem = (i, field, value) => {
        const items = [...detailBenefits.items];
        items[i] = { ...items[i], [field]: value };
        setDetailBenefits({ ...detailBenefits, items });
    };
    const addDetailBenefitItem = () => {
        setDetailBenefits({ ...detailBenefits, items: [...(detailBenefits.items || []), { icon: 'FiCheckCircle', title: '', text: '' }] });
    };
    const removeDetailBenefitItem = (i) => {
        setDetailBenefits({ ...detailBenefits, items: detailBenefits.items.filter((_, idx) => idx !== i) });
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Services</h2>
                    <p>Manage services shown on homepage, /services listing, and each service's detail page.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openCreate}>
                    <FiPlus size={15} /> Add Service
                </button>
            </div>

            {/* ================= SERVICES LIST ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem' }}>
                {loading ? (
                    <p className="admin-empty">Loading...</p>
                ) : services.length === 0 ? (
                    <p className="admin-empty">No services yet. Add your first one!</p>
                ) : (
                    services.map(s => (
                        <div key={s._id} className="admin-list-item">
                            <div
                                className="admin-list-thumb"
                                style={{ background: `${s.color}20`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}
                            >
                                {s.icon?.replace('Fi', '') || 'Icon'}
                            </div>
                            <div className="admin-list-info">
                                <div className="admin-list-title">
                                    {s.title} {!s.isActive && <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>(hidden)</span>}
                                </div>
                                <div className="admin-list-sub">/{s.slug} · {s.description}</div>
                            </div>
                            <div className="admin-list-actions">
                                <button className="admin-icon-btn" onClick={() => openEdit(s)}><FiEdit2 size={15} /></button>
                                <button className="admin-icon-btn danger" onClick={() => handleDelete(s._id)}><FiTrash2 size={15} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ================= SERVICES PAGE HEADER (hero + intro) ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Services Page Header (/services)</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: 13, marginTop: -8 }}>
                    Hero banner ar intro text — /services page e dekhay.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); saveSection('servicesPageHeader', pageHeader, 'Page header'); }}>
                    <div className="admin-form-group">
                        <label>Hero Title</label>
                        <input value={pageHeader.heroTitle} onChange={e => setPageHeader({ ...pageHeader, heroTitle: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Hero Subtitle</label>
                        <textarea rows="2" value={pageHeader.heroSubtitle} onChange={e => setPageHeader({ ...pageHeader, heroSubtitle: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Intro Heading</label>
                        <input value={pageHeader.introHeading} onChange={e => setPageHeader({ ...pageHeader, introHeading: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Intro Paragraph</label>
                        <textarea rows="4" value={pageHeader.introText} onChange={e => setPageHeader({ ...pageHeader, introText: e.target.value })} />
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary" disabled={savingKey === 'servicesPageHeader'}>
                        {savingKey === 'servicesPageHeader' ? 'Saving...' : 'Save Header'}
                    </button>
                </form>
            </div>

            {/* ================= MID CTA STRIP (/services) ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Mid CTA Strip (/services)</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: 13, marginTop: -8 }}>
                    "Have a project in mind?" strip — services grid ar Benefits er majhkhane.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); saveSection('servicesPageCtaStrip', ctaStrip, 'CTA strip'); }}>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>Title</label>
                            <input value={ctaStrip.title} onChange={e => setCtaStrip({ ...ctaStrip, title: e.target.value })} />
                        </div>
                        <div className="admin-form-group">
                            <label>Button Text</label>
                            <input value={ctaStrip.buttonText} onChange={e => setCtaStrip({ ...ctaStrip, buttonText: e.target.value })} />
                        </div>
                    </div>
                    <div className="admin-form-group">
                        <label>Button Link</label>
                        <input value={ctaStrip.buttonLink} onChange={e => setCtaStrip({ ...ctaStrip, buttonLink: e.target.value })} placeholder="/contact" />
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary" disabled={savingKey === 'servicesPageCtaStrip'}>
                        {savingKey === 'servicesPageCtaStrip' ? 'Saving...' : 'Save CTA Strip'}
                    </button>
                </form>
            </div>

            {/* ================= BENEFITS (/services) ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>"Why Work With Us" Benefits (/services)</h3>
                <form onSubmit={(e) => { e.preventDefault(); saveSection('servicesPageBenefits', benefits, 'Benefits section'); }}>
                    <div className="admin-form-group">
                        <label>Heading</label>
                        <input value={benefits.heading} onChange={e => setBenefits({ ...benefits, heading: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Subtext</label>
                        <textarea rows="2" value={benefits.subtext} onChange={e => setBenefits({ ...benefits, subtext: e.target.value })} />
                    </div>

                    <div className="admin-form-group">
                        <label>Benefit Cards</label>
                        {(benefits.items || []).map((item, i) => (
                            <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: '0.75rem', marginBottom: '0.75rem' }}>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Icon</label>
                                        <select value={item.icon} onChange={e => updateBenefitItem(i, 'icon', e.target.value)} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 8, border: '1px solid var(--gray-200)' }}>
                                            {BENEFIT_ICON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Title</label>
                                        <input value={item.title} onChange={e => updateBenefitItem(i, 'title', e.target.value)} />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label>Text</label>
                                    <textarea rows="2" value={item.text} onChange={e => updateBenefitItem(i, 'text', e.target.value)} />
                                </div>
                                <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeBenefitItem(i)}>
                                    <FiTrash2 size={13} /> Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addBenefitItem}>
                            <FiPlus size={14} /> Add Benefit Card
                        </button>
                    </div>

                    <button type="submit" className="admin-btn admin-btn-primary" disabled={savingKey === 'servicesPageBenefits'} style={{ marginTop: '1rem' }}>
                        {savingKey === 'servicesPageBenefits' ? 'Saving...' : 'Save Benefits'}
                    </button>
                </form>
            </div>

            {/* ================= BOTTOM CTA (/services) ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Bottom CTA (/services)</h3>
                <form onSubmit={(e) => { e.preventDefault(); saveSection('servicesPageBottomCta', servicesBottomCta, 'Bottom CTA'); }}>
                    <div className="admin-form-group">
                        <label>Eyebrow Text</label>
                        <input value={servicesBottomCta.eyebrow} onChange={e => setServicesBottomCta({ ...servicesBottomCta, eyebrow: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Heading</label>
                        <input value={servicesBottomCta.heading} onChange={e => setServicesBottomCta({ ...servicesBottomCta, heading: e.target.value })} />
                    </div>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>Button Text</label>
                            <input value={servicesBottomCta.buttonText} onChange={e => setServicesBottomCta({ ...servicesBottomCta, buttonText: e.target.value })} />
                        </div>
                        <div className="admin-form-group">
                            <label>Button Link</label>
                            <input value={servicesBottomCta.buttonLink} onChange={e => setServicesBottomCta({ ...servicesBottomCta, buttonLink: e.target.value })} placeholder="/contact" />
                        </div>
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary" disabled={savingKey === 'servicesPageBottomCta'}>
                        {savingKey === 'servicesPageBottomCta' ? 'Saving...' : 'Save Bottom CTA'}
                    </button>
                </form>
            </div>

            {/* ================= PROCESS STEPS (/services/:slug) ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>"How We Work" Process (service detail page)</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: 13, marginTop: -8 }}>
                    Shob service detail page e common — proti service alada na, ekbar edit korle shob jaigay change hobe.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); saveSection('serviceDetailProcess', processData, 'Process section'); }}>
                    <div className="admin-form-group">
                        <label>Section Heading</label>
                        <input value={processData.heading} onChange={e => setProcessData({ ...processData, heading: e.target.value })} />
                    </div>

                    <div className="admin-form-group">
                        <label>Steps</label>
                        {(processData.steps || []).map((step, i) => (
                            <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: '0.75rem', marginBottom: '0.75rem' }}>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Step Number</label>
                                        <input value={step.step} onChange={e => updateProcessStep(i, 'step', e.target.value)} placeholder="01" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Title</label>
                                        <input value={step.title} onChange={e => updateProcessStep(i, 'title', e.target.value)} />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label>Text</label>
                                    <textarea rows="2" value={step.text} onChange={e => updateProcessStep(i, 'text', e.target.value)} />
                                </div>
                                <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeProcessStep(i)}>
                                    <FiTrash2 size={13} /> Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addProcessStep}>
                            <FiPlus size={14} /> Add Step
                        </button>
                    </div>

                    <button type="submit" className="admin-btn admin-btn-primary" disabled={savingKey === 'serviceDetailProcess'} style={{ marginTop: '1rem' }}>
                        {savingKey === 'serviceDetailProcess' ? 'Saving...' : 'Save Process'}
                    </button>
                </form>
            </div>

            {/* ================= BENEFITS (service detail page) — sits right after "How We Work" ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Benefits (service detail page)</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: 13, marginTop: -8 }}>
                    "How We Work" er por, ar bottom CTA er age dekhay — shob detail page e common. Heading + intro + card grid + niche ekta optional banner image.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); saveSection('serviceDetailBenefits', detailBenefits, 'Benefits section'); }}>
                    <div className="admin-form-group">
                        <label>Heading</label>
                        <input value={detailBenefits.heading} onChange={e => setDetailBenefits({ ...detailBenefits, heading: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Intro Paragraph</label>
                        <textarea rows="3" value={detailBenefits.intro} onChange={e => setDetailBenefits({ ...detailBenefits, intro: e.target.value })} />
                    </div>

                    <div className="admin-form-group">
                        <label>Benefit Cards</label>
                        {(detailBenefits.items || []).map((item, i) => (
                            <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: '0.75rem', marginBottom: '0.75rem' }}>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Icon</label>
                                        <select value={item.icon} onChange={e => updateDetailBenefitItem(i, 'icon', e.target.value)} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 8, border: '1px solid var(--gray-200)' }}>
                                            {BENEFIT_ICON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Title</label>
                                        <input value={item.title} onChange={e => updateDetailBenefitItem(i, 'title', e.target.value)} />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label>Text</label>
                                    <textarea rows="2" value={item.text} onChange={e => updateDetailBenefitItem(i, 'text', e.target.value)} />
                                </div>
                                <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeDetailBenefitItem(i)}>
                                    <FiTrash2 size={13} /> Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addDetailBenefitItem}>
                            <FiPlus size={14} /> Add Benefit Card
                        </button>
                    </div>

                    <div className="admin-form-group">
                        <label>Bottom Banner Image (optional)</label>
                        {detailBenefitsPreview && (
                            <div style={{ marginBottom: 8 }}>
                                <img src={detailBenefitsPreview} alt="preview" style={{ width: '100%', maxWidth: 400, borderRadius: 8, display: 'block', marginBottom: 6 }} />
                                <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={removeDetailBenefitsImage}>
                                    <FiX size={13} /> Remove Image
                                </button>
                            </div>
                        )}
                        <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                            <FiUpload size={14} /> Upload Image
                            <input type="file" accept="image/*" onChange={handleDetailBenefitsImage} style={{ display: 'none' }} />
                        </label>
                    </div>

                    <div className="admin-form-group">
                        <label>Closing Text (shows right under the banner image, optional)</label>
                        <textarea rows="3" value={detailBenefits.closingText} onChange={e => setDetailBenefits({ ...detailBenefits, closingText: e.target.value })} placeholder="At Amanah IT, we're dedicated to..." />
                    </div>

                    <button type="submit" className="admin-btn admin-btn-primary" disabled={savingKey === 'serviceDetailBenefits'} style={{ marginTop: '1rem' }}>
                        {savingKey === 'serviceDetailBenefits' ? 'Saving...' : 'Save Benefits'}
                    </button>
                </form>
            </div>

            {/* ================= SIDEBAR CTA (/services/:slug) ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Sidebar CTA (service detail page)</h3>
                <form onSubmit={(e) => { e.preventDefault(); saveSection('serviceDetailSidebarCta', sidebarCta, 'Sidebar CTA'); }}>
                    <div className="admin-form-group">
                        <label>Heading</label>
                        <input value={sidebarCta.heading} onChange={e => setSidebarCta({ ...sidebarCta, heading: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Text</label>
                        <textarea rows="2" value={sidebarCta.text} onChange={e => setSidebarCta({ ...sidebarCta, text: e.target.value })} />
                    </div>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>Button Text</label>
                            <input value={sidebarCta.buttonText} onChange={e => setSidebarCta({ ...sidebarCta, buttonText: e.target.value })} />
                        </div>
                        <div className="admin-form-group">
                            <label>Button Link</label>
                            <input value={sidebarCta.buttonLink} onChange={e => setSidebarCta({ ...sidebarCta, buttonLink: e.target.value })} placeholder="/contact" />
                        </div>
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary" disabled={savingKey === 'serviceDetailSidebarCta'}>
                        {savingKey === 'serviceDetailSidebarCta' ? 'Saving...' : 'Save Sidebar CTA'}
                    </button>
                </form>
            </div>

            {/* ================= BOTTOM CTA (/services/:slug) ================= */}
            <div className="admin-table-wrap" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Bottom CTA (service detail page)</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: 13, marginTop: -8 }}>
                    Heading Prefix er por service title auto add hoy (jemon "Ready to Build " + "Web Application Development" + "?")
                </p>
                <form onSubmit={(e) => { e.preventDefault(); saveSection('serviceDetailBottomCta', detailBottomCta, 'Bottom CTA'); }}>
                    <div className="admin-form-group">
                        <label>Eyebrow Text</label>
                        <input value={detailBottomCta.eyebrow} onChange={e => setDetailBottomCta({ ...detailBottomCta, eyebrow: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Heading Prefix</label>
                        <input value={detailBottomCta.headingPrefix} onChange={e => setDetailBottomCta({ ...detailBottomCta, headingPrefix: e.target.value })} placeholder="Ready to Build " />
                    </div>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>Button Text</label>
                            <input value={detailBottomCta.buttonText} onChange={e => setDetailBottomCta({ ...detailBottomCta, buttonText: e.target.value })} />
                        </div>
                        <div className="admin-form-group">
                            <label>Button Link</label>
                            <input value={detailBottomCta.buttonLink} onChange={e => setDetailBottomCta({ ...detailBottomCta, buttonLink: e.target.value })} placeholder="/contact" />
                        </div>
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary" disabled={savingKey === 'serviceDetailBottomCta'}>
                        {savingKey === 'serviceDetailBottomCta' ? 'Saving...' : 'Save Bottom CTA'}
                    </button>
                </form>
            </div>

            {/* ================= ADD/EDIT SERVICE MODAL (unchanged) ================= */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Edit Service' : 'Add Service'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}><FiX size={16} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Title</label>
                                    <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Web Application Development" />
                                </div>
                                <div className="admin-form-group">
                                    <label>Slug (URL) — khali rakhle title theke auto toiri hobe</label>
                                    <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="web-application-development" />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Icon</label>
                                    <select
                                        value={form.icon}
                                        onChange={e => setForm({ ...form, icon: e.target.value })}
                                        style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 8, border: '1px solid var(--gray-200)', fontSize: '14px' }}
                                    >
                                        {ICON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label>Accent Color</label>
                                    <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ width: '100%', height: 40, padding: 2, borderRadius: 8, border: '1px solid var(--gray-200)' }} />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Detail Page Hero Image</label>
                                {preview && <img src={preview} alt="preview" style={{ width: '100%', maxWidth: 300, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
                                <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                                    <FiUpload size={14} /> Upload Image
                                    <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                                </label>
                            </div>

                            <div className="admin-form-group">
                                <label>Description (short — homepage card, listing card, details hero e dekhay)</label>
                                <textarea rows="2" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Custom, full-stack web apps built on the MERN stack." />
                            </div>

                            <div className="admin-form-group">
                                <label>Body (long — shudhu detail page e dekhay)</label>
                                <textarea rows="4" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Full paragraph describing the service in detail..." />
                            </div>

                            <div className="admin-form-group">
                                <label>Features (homepage card + listing + "What's Included")</label>
                                <div className="admin-form-inline-edit" style={{ marginBottom: '0.5rem' }}>
                                    <input
                                        value={featureInput}
                                        onChange={e => setFeatureInput(e.target.value)}
                                        placeholder="e.g. React front-ends with fast interfaces"
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                    />
                                    <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addFeature}>
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <div className="admin-tags-input">
                                    {(form.features || []).map((f, i) => (
                                        <span key={i} className="admin-tag-chip">
                                            {f}<button type="button" onClick={() => removeFeature(i)}><FiX size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Tech Stack Tags (shudhu detail page "Built With")</label>
                                <div className="admin-form-inline-edit" style={{ marginBottom: '0.5rem' }}>
                                    <input
                                        value={stackInput}
                                        onChange={e => setStackInput(e.target.value)}
                                        placeholder="e.g. React"
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addStack())}
                                    />
                                    <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addStack}>
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <div className="admin-tags-input">
                                    {(form.stack || []).map((t, i) => (
                                        <span key={i} className="admin-tag-chip">
                                            {t}<button type="button" onClick={() => removeStack(i)}><FiX size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Order (choto number age dekhabe)</label>
                                    <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
                                </div>
                                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 24 }}>
                                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} id="svc-active" />
                                    <label htmlFor="svc-active" style={{ margin: 0 }}>Visible on website</label>
                                </div>
                            </div>

                            <div className="admin-modal-actions">
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">{editing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}