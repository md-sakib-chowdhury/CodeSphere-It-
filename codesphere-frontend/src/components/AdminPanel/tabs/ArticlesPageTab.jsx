import { useState, useEffect } from 'react';
import { FiSave, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export default function ArticlesPageTab() {
    const [data, setData] = useState({
        bannerTitle: '',
        breadcrumbCurrent: '',
        cta: { label: '', title: '', text: '', btnText: '', btnLink: '' },
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/articles-page').then(r => setData(r.data)).catch(() => { });
    }, []);

    const updateCta = (field, value) => setData({ ...data, cta: { ...data.cta, [field]: value } });

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/articles-page', data);
            setData(res.data);
            toast.success('Latest Articles page updated!');
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

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Latest Articles Page</h2>
                    <p>Edit the banner and bottom call-to-action section. Blog posts are managed in the "Blog / Articles" tab.</p>
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
                        <input value={data.bannerTitle || ''} onChange={e => setData({ ...data, bannerTitle: e.target.value })} placeholder="Latest Articles" />
                    </div>
                    <div className="admin-form-group">
                        <label>Breadcrumb Text</label>
                        <input value={data.breadcrumbCurrent || ''} onChange={e => setData({ ...data, breadcrumbCurrent: e.target.value })} placeholder="Blog" />
                    </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                    <label>Banner Background Image</label>
                    {data.bannerImage && <img src={data.bannerImage} alt="" style={{ width: 200, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
                    <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                        <FiUpload size={14} /> Upload Image
                        <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                    </label>
                </div>
            </div>

            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Bottom Call-To-Action
                </h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.cta?.label || ''} onChange={e => updateCta('label', e.target.value)} placeholder="Our Recent Activities" />
                    </div>
                    <div className="admin-form-group">
                        <label>Title</label>
                        <input value={data.cta?.title || ''} onChange={e => updateCta('title', e.target.value)} placeholder="Latest Activities From Our Team" />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Text</label>
                    <input value={data.cta?.text || ''} onChange={e => updateCta('text', e.target.value)} placeholder="Want to work with us on your next project?" />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.cta?.btnText || ''} onChange={e => updateCta('btnText', e.target.value)} placeholder="Get In Touch" />
                    </div>
                    <div className="admin-form-group">
                        <label>Button Link</label>
                        <input value={data.cta?.btnLink || ''} onChange={e => updateCta('btnLink', e.target.value)} placeholder="/contact" />
                    </div>
                </div>
            </div>
        </div>
    );
}