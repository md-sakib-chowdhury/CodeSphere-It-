// import { useState, useEffect } from 'react';
// import { FiSave, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';
// import { toast } from 'react-toastify';
// import api from '../../../utils/api';

// const fileToBase64 = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
// });

// const ImageField = ({ image, onChange }) => (
//     <div className="admin-form-group">
//         <label>Image</label>
//         {image && <img src={image} alt="" style={{ width: 120, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
//         <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
//             <FiUpload size={14} /> Upload Image
//             <input type="file" accept="image/*" onChange={async e => {
//                 const file = e.target.files[0];
//                 if (!file) return;
//                 onChange(await fileToBase64(file));
//             }} style={{ display: 'none' }} />
//         </label>
//     </div>
// );

// export default function ExploreUsTab() {
//     const [data, setData] = useState({
//         bannerTitle: '',
//         aboutUs: { heading: '', paragraph1: '', paragraph2: '', image: '' },
//         mission: { heading: '', intro: '', bullets: [], image: '' },
//         vision: { heading: '', paragraph1: '', paragraph2: '', image: '' },
//         workplace: { label: '', title: '', paragraph1: '', paragraph2: '', image: '' },
//     });
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         api.get('/explore-page').then(r => setData(r.data)).catch(() => { });
//     }, []);

//     const handleSave = async () => {
//         setSaving(true);
//         try {
//             const res = await api.put('/explore-page', data);
//             setData(res.data);
//             toast.success('Explore Us page updated!');
//         } catch {
//             toast.error('Failed to update');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const update = (section, field, value) => setData({ ...data, [section]: { ...data[section], [field]: value } });

//     const updateBullet = (idx, value) => {
//         const bullets = [...data.mission.bullets];
//         bullets[idx] = value;
//         update('mission', 'bullets', bullets);
//     };
//     const addBullet = () => update('mission', 'bullets', [...(data.mission.bullets || []), '']);
//     const removeBullet = (idx) => update('mission', 'bullets', data.mission.bullets.filter((_, i) => i !== idx));

//     return (
//         <div>
//             <div className="admin-page-header">
//                 <div>
//                     <h2>Explore Us Page</h2>
//                     <p>Edit About Us, Mission, Vision, and Innovative Workplace sections.</p>
//                 </div>
//                 <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
//                     <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
//                 </button>
//             </div>

//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <div className="admin-form-group">
//                     <label>Page Banner Title</label>
//                     <input value={data.bannerTitle || ''} onChange={e => setData({ ...data, bannerTitle: e.target.value })} placeholder="Explore Us" />
//                 </div>
//             </div>

//             {/* ABOUT US */}
//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>About Us</h3>
//                 <div className="admin-form-group">
//                     <label>Heading</label>
//                     <input value={data.aboutUs?.heading || ''} onChange={e => update('aboutUs', 'heading', e.target.value)} />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Paragraph 1</label>
//                     <textarea rows="3" value={data.aboutUs?.paragraph1 || ''} onChange={e => update('aboutUs', 'paragraph1', e.target.value)} />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Paragraph 2</label>
//                     <textarea rows="3" value={data.aboutUs?.paragraph2 || ''} onChange={e => update('aboutUs', 'paragraph2', e.target.value)} />
//                 </div>
//                 <ImageField image={data.aboutUs?.image} onChange={v => update('aboutUs', 'image', v)} />
//             </div>

//             {/* MISSION */}
//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Our Mission</h3>
//                 <div className="admin-form-group">
//                     <label>Heading</label>
//                     <input value={data.mission?.heading || ''} onChange={e => update('mission', 'heading', e.target.value)} />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Intro Text</label>
//                     <textarea rows="2" value={data.mission?.intro || ''} onChange={e => update('mission', 'intro', e.target.value)} />
//                 </div>

//                 <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
//                     <label style={{ fontWeight: 600 }}>Mission Bullet Points</label>
//                     <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addBullet}>
//                         <FiPlus size={14} /> Add
//                     </button>
//                 </div>
//                 {(data.mission?.bullets || []).map((b, i) => (
//                     <div key={i} className="admin-form-inline-edit" style={{ marginBottom: '0.5rem' }}>
//                         <input value={b} onChange={e => updateBullet(i, e.target.value)} />
//                         <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeBullet(i)}>
//                             <FiTrash2 size={14} />
//                         </button>
//                     </div>
//                 ))}

//                 <div style={{ marginTop: '1rem' }}>
//                     <ImageField image={data.mission?.image} onChange={v => update('mission', 'image', v)} />
//                 </div>
//             </div>

//             {/* VISION */}
//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Our Vision</h3>
//                 <div className="admin-form-group">
//                     <label>Heading</label>
//                     <input value={data.vision?.heading || ''} onChange={e => update('vision', 'heading', e.target.value)} />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Paragraph 1</label>
//                     <textarea rows="3" value={data.vision?.paragraph1 || ''} onChange={e => update('vision', 'paragraph1', e.target.value)} />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Paragraph 2</label>
//                     <textarea rows="3" value={data.vision?.paragraph2 || ''} onChange={e => update('vision', 'paragraph2', e.target.value)} />
//                 </div>
//                 <ImageField image={data.vision?.image} onChange={v => update('vision', 'image', v)} />
//             </div>

//             {/* WORKPLACE */}
//             <div className="admin-card">
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Innovative Workplace</h3>
//                 <div className="admin-form-row">
//                     <div className="admin-form-group">
//                         <label>Label</label>
//                         <input value={data.workplace?.label || ''} onChange={e => update('workplace', 'label', e.target.value)} />
//                     </div>
//                     <div className="admin-form-group">
//                         <label>Title</label>
//                         <input value={data.workplace?.title || ''} onChange={e => update('workplace', 'title', e.target.value)} />
//                     </div>
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Paragraph 1</label>
//                     <textarea rows="3" value={data.workplace?.paragraph1 || ''} onChange={e => update('workplace', 'paragraph1', e.target.value)} />
//                 </div>
//                 <div className="admin-form-group">
//                     <label>Paragraph 2</label>
//                     <textarea rows="3" value={data.workplace?.paragraph2 || ''} onChange={e => update('workplace', 'paragraph2', e.target.value)} />
//                 </div>
//                 <ImageField image={data.workplace?.image} onChange={v => update('workplace', 'image', v)} />
//             </div>
//         </div>
//     );
// }
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

const ImageField = ({ image, onChange, label = 'Image' }) => (
    <div className="admin-form-group">
        <label>{label}</label>
        {image && <img src={image} alt="" style={{ width: 120, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
        <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
            <FiUpload size={14} /> Upload Image
            <input type="file" accept="image/*" onChange={async e => {
                const file = e.target.files[0];
                if (!file) return;
                onChange(await fileToBase64(file));
            }} style={{ display: 'none' }} />
        </label>
    </div>
);

export default function ExploreUsTab() {
    const [data, setData] = useState({
        bannerTitle: '',
        bannerImage: '',
        aboutUs: { heading: '', paragraph1: '', paragraph2: '', image: '' },
        mission: { heading: '', intro: '', bullets: [], image: '' },
        vision: { heading: '', paragraph1: '', paragraph2: '', image: '' },
        workplace: { label: '', title: '', paragraph1: '', paragraph2: '', image: '' },
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/explore-page').then(r => setData(r.data)).catch(() => { });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/explore-page', data);
            setData(res.data);
            toast.success('Explore Us page updated!');
        } catch {
            toast.error('Failed to update');
        } finally {
            setSaving(false);
        }
    };

    const update = (section, field, value) => setData({ ...data, [section]: { ...data[section], [field]: value } });

    const updateBullet = (idx, value) => {
        const bullets = [...data.mission.bullets];
        bullets[idx] = value;
        update('mission', 'bullets', bullets);
    };
    const addBullet = () => update('mission', 'bullets', [...(data.mission.bullets || []), '']);
    const removeBullet = (idx) => update('mission', 'bullets', data.mission.bullets.filter((_, i) => i !== idx));

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Explore Us Page</h2>
                    <p>Edit About Us, Mission, Vision, and Innovative Workplace sections.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-form-group">
                    <label>Page Banner Title</label>
                    <input value={data.bannerTitle || ''} onChange={e => setData({ ...data, bannerTitle: e.target.value })} placeholder="Explore Us" />
                </div>
                <ImageField
                    label="Page Banner Background Image"
                    image={data.bannerImage}
                    onChange={v => setData({ ...data, bannerImage: v })}
                />
            </div>

            {/* ABOUT US */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>About Us</h3>
                <div className="admin-form-group">
                    <label>Heading</label>
                    <input value={data.aboutUs?.heading || ''} onChange={e => update('aboutUs', 'heading', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Paragraph 1</label>
                    <textarea rows="3" value={data.aboutUs?.paragraph1 || ''} onChange={e => update('aboutUs', 'paragraph1', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Paragraph 2</label>
                    <textarea rows="3" value={data.aboutUs?.paragraph2 || ''} onChange={e => update('aboutUs', 'paragraph2', e.target.value)} />
                </div>
                <ImageField image={data.aboutUs?.image} onChange={v => update('aboutUs', 'image', v)} />
            </div>

            {/* MISSION */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Our Mission</h3>
                <div className="admin-form-group">
                    <label>Heading</label>
                    <input value={data.mission?.heading || ''} onChange={e => update('mission', 'heading', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Intro Text</label>
                    <textarea rows="2" value={data.mission?.intro || ''} onChange={e => update('mission', 'intro', e.target.value)} />
                </div>

                <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
                    <label style={{ fontWeight: 600 }}>Mission Bullet Points</label>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addBullet}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                {(data.mission?.bullets || []).map((b, i) => (
                    <div key={i} className="admin-form-inline-edit" style={{ marginBottom: '0.5rem' }}>
                        <input value={b} onChange={e => updateBullet(i, e.target.value)} />
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeBullet(i)}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}

                <div style={{ marginTop: '1rem' }}>
                    <ImageField image={data.mission?.image} onChange={v => update('mission', 'image', v)} />
                </div>
            </div>

            {/* VISION */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Our Vision</h3>
                <div className="admin-form-group">
                    <label>Heading</label>
                    <input value={data.vision?.heading || ''} onChange={e => update('vision', 'heading', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Paragraph 1</label>
                    <textarea rows="3" value={data.vision?.paragraph1 || ''} onChange={e => update('vision', 'paragraph1', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Paragraph 2</label>
                    <textarea rows="3" value={data.vision?.paragraph2 || ''} onChange={e => update('vision', 'paragraph2', e.target.value)} />
                </div>
                <ImageField image={data.vision?.image} onChange={v => update('vision', 'image', v)} />
            </div>

            {/* WORKPLACE */}
            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Innovative Workplace</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Label</label>
                        <input value={data.workplace?.label || ''} onChange={e => update('workplace', 'label', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label>Title</label>
                        <input value={data.workplace?.title || ''} onChange={e => update('workplace', 'title', e.target.value)} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Paragraph 1</label>
                    <textarea rows="3" value={data.workplace?.paragraph1 || ''} onChange={e => update('workplace', 'paragraph1', e.target.value)} />
                </div>
                <div className="admin-form-group">
                    <label>Paragraph 2</label>
                    <textarea rows="3" value={data.workplace?.paragraph2 || ''} onChange={e => update('workplace', 'paragraph2', e.target.value)} />
                </div>
                <ImageField image={data.workplace?.image} onChange={v => update('workplace', 'image', v)} />
            </div>
        </div>
    );
}