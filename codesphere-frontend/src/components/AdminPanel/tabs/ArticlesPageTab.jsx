import { useState, useEffect } from 'react';
import { FiSave, FiUpload, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

// The banner image is stored as base64 text, so keep it reasonably small.
const MAX_IMAGE_MB = 3;

const EMPTY_CTA = { label: '', title: '', text: '', btnText: '', btnLink: '' };

const EMPTY_DATA = {
    bannerTitle: '',
    breadcrumbCurrent: '',
    bannerImage: '',
    cta: EMPTY_CTA,
};

const cardTitleStyle = { fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' };

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export default function ArticlesPageTab() {
    const [data, setData] = useState(EMPTY_DATA);
    const [loaded, setLoaded] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);

    // merge with defaults so a missing field (or the nested cta) never becomes undefined
    const withDefaults = (incoming) => ({
        ...EMPTY_DATA,
        ...incoming,
        cta: { ...EMPTY_CTA, ...(incoming?.cta || {}) },
    });

    useEffect(() => {
        api.get('/articles-page')
            .then((r) => {
                setData(withDefaults(r.data));
                setLoaded(true);
            })
            .catch(() => toast.error('Could not load articles page settings'));
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

    // ---- state helpers: every change is immutable and marks the form as edited ----
    const patch = (changes) => {
        setData((d) => ({ ...d, ...changes }));
        setDirty(true);
    };
    const updateCta = (field, value) => {
        setData((d) => ({ ...d, cta: { ...d.cta, [field]: value } }));
        setDirty(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/articles-page', data);
            setData(withDefaults(res.data));
            setDirty(false);
            toast.success('Latest Articles page updated!');
        } catch {
            toast.error('Failed to update');
        } finally {
            setSaving(false);
        }
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

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Latest Articles Page</h2>
                    <p>Edit the banner and bottom call-to-action section. Blog posts are managed in the "Blog / Articles" tab.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {dirty && <span style={{ fontSize: '12px', color: 'var(--blue-600)' }}>Unsaved changes</span>}
                    {/* disabled until the saved settings have loaded, so a failed load can never overwrite them with blanks */}
                    <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving || !loaded}>
                        <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={cardTitleStyle}>Page Banner</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Banner Title</label>
                        <input value={data.bannerTitle || ''} onChange={(e) => patch({ bannerTitle: e.target.value })} placeholder="Latest Articles" />
                    </div>
                    <div className="admin-form-group">
                        <label>Breadcrumb Text</label>
                        <input value={data.breadcrumbCurrent || ''} onChange={(e) => patch({ breadcrumbCurrent: e.target.value })} placeholder="Blog" />
                    </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                    <label>Banner Background Image</label>
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
                                <FiTrash2 size={14} /> Remove Image
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="admin-card">
                <h3 style={cardTitleStyle}>Bottom Call-To-Action</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.cta.label} onChange={(e) => updateCta('label', e.target.value)} placeholder="Our Recent Activities" />
                    </div>
                    <div className="admin-form-group">
                        <label>Title</label>
                        <input value={data.cta.title} onChange={(e) => updateCta('title', e.target.value)} placeholder="Latest Activities From Our Team" />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Text</label>
                    <input value={data.cta.text} onChange={(e) => updateCta('text', e.target.value)} placeholder="Want to work with us on your next project?" />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.cta.btnText} onChange={(e) => updateCta('btnText', e.target.value)} placeholder="Get In Touch" />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Link</label>
                        <input value={data.cta.btnLink} onChange={(e) => updateCta('btnLink', e.target.value)} placeholder="/contact" />
                    </div>
                </div>
            </div>
        </div>
    );
}