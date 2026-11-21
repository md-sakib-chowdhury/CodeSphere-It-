// import { useState, useEffect } from 'react';
// import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
// import { toast } from 'react-toastify';
// import api from '../../../utils/api';

// const SOCIAL_PLATFORMS = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'];

// export default function NavbarTab() {
//     const [data, setData] = useState({
//         logoText: '', logoAccent: '', phone: '', email: '',
//         socialLinks: [], menuLinks: [], brochureText: '', brochureLink: '',
//     });
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         api.get('/navbar').then(r => setData(r.data)).catch(() => { });
//     }, []);

//     const updateSocial = (idx, field, value) => {
//         const links = [...data.socialLinks];
//         links[idx][field] = value;
//         setData({ ...data, socialLinks: links });
//     };

//     const addSocial = () => {
//         setData({ ...data, socialLinks: [...(data.socialLinks || []), { platform: 'Facebook', url: '' }] });
//     };

//     const removeSocial = (idx) => {
//         setData({ ...data, socialLinks: data.socialLinks.filter((_, i) => i !== idx) });
//     };

//     const updateMenu = (idx, field, value) => {
//         const links = [...data.menuLinks];
//         links[idx][field] = value;
//         setData({ ...data, menuLinks: links });
//     };

//     const addMenu = () => {
//         setData({ ...data, menuLinks: [...(data.menuLinks || []), { label: '', path: '' }] });
//     };

//     const removeMenu = (idx) => {
//         setData({ ...data, menuLinks: data.menuLinks.filter((_, i) => i !== idx) });
//     };

//     const handleSave = async () => {
//         setSaving(true);
//         try {
//             await api.put('/navbar', data);
//             toast.success('Navbar updated!');
//         } catch {
//             toast.error('Failed to update navbar');
//         } finally {
//             setSaving(false);
//         }
//     };

//     return (
//         <div>
//             <div className="admin-page-header">
//                 <div>
//                     <h2>Navbar / Header</h2>
//                     <p>Edit logo, contact info, social links, menu, and brochure button.</p>
//                 </div>
//                 <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
//                     <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
//                 </button>
//             </div>

//             {/* Logo */}
//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Logo</h3>
//                 <div className="admin-form-row">
//                     <div className="admin-form-group">
//                         <label>Logo Text (main part)</label>
//                         <input
//                             value={data.logoText || ''}
//                             onChange={e => setData({ ...data, logoText: e.target.value })}
//                             placeholder="Amanah"
//                         />
//                     </div>
//                     <div className="admin-form-group">
//                         <label>Logo Accent (colored part)</label>
//                         <input
//                             value={data.logoAccent || ''}
//                             onChange={e => setData({ ...data, logoAccent: e.target.value })}
//                             placeholder=".IT"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Contact info */}
//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Top Bar Contact Info</h3>
//                 <div className="admin-form-row">
//                     <div className="admin-form-group">
//                         <label>Phone</label>
//                         <input
//                             value={data.phone || ''}
//                             onChange={e => setData({ ...data, phone: e.target.value })}
//                             placeholder="+880 1800-000000"
//                         />
//                     </div>
//                     <div className="admin-form-group">
//                         <label>Email</label>
//                         <input
//                             value={data.email || ''}
//                             onChange={e => setData({ ...data, email: e.target.value })}
//                             placeholder="info@amanahit.com"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Social links */}
//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <div className="admin-page-header" style={{ marginBottom: '0.75rem' }}>
//                     <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--gray-900)' }}>Social Links</h3>
//                     <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addSocial}>
//                         <FiPlus size={14} /> Add
//                     </button>
//                 </div>
//                 {(data.socialLinks || []).map((s, i) => (
//                     <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
//                         <div className="admin-form-group">
//                             <label>Platform</label>
//                             <select value={s.platform} onChange={e => updateSocial(i, 'platform', e.target.value)}>
//                                 {SOCIAL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
//                             </select>
//                         </div>
//                         <div className="admin-form-group">
//                             <label>URL</label>
//                             <input
//                                 value={s.url}
//                                 onChange={e => updateSocial(i, 'url', e.target.value)}
//                                 placeholder="https://facebook.com/amanahit"
//                             />
//                         </div>
//                         <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeSocial(i)}>
//                             <FiTrash2 size={14} />
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* Menu links */}
//             <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
//                 <div className="admin-page-header" style={{ marginBottom: '0.75rem' }}>
//                     <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--gray-900)' }}>Menu Links</h3>
//                     <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addMenu}>
//                         <FiPlus size={14} /> Add
//                     </button>
//                 </div>
//                 <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
//                     Note: path <code>/services</code> ba <code>/solutions</code> dile mega dropdown menu automatically dekhabe.
//                 </p>
//                 {(data.menuLinks || []).map((m, i) => (
//                     <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
//                         <div className="admin-form-group">
//                             <label>Label</label>
//                             <input
//                                 value={m.label}
//                                 onChange={e => updateMenu(i, 'label', e.target.value)}
//                                 placeholder="Home"
//                             />
//                         </div>
//                         <div className="admin-form-group">
//                             <label>Path</label>
//                             <input
//                                 value={m.path}
//                                 onChange={e => updateMenu(i, 'path', e.target.value)}
//                                 placeholder="/"
//                             />
//                         </div>
//                         <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeMenu(i)}>
//                             <FiTrash2 size={14} />
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* Brochure */}
//             <div className="admin-card">
//                 <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Brochure Button</h3>
//                 <div className="admin-form-row">
//                     <div className="admin-form-group">
//                         <label>Button Text</label>
//                         <input
//                             value={data.brochureText || ''}
//                             onChange={e => setData({ ...data, brochureText: e.target.value })}
//                             placeholder="Brochure"
//                         />
//                     </div>
//                     <div className="admin-form-group">
//                         <label>PDF Link</label>
//                         <input
//                             value={data.brochureLink || ''}
//                             onChange={e => setData({ ...data, brochureLink: e.target.value })}
//                             placeholder="/brochure.pdf"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const SOCIAL_PLATFORMS = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'];

// The logo is stored as base64 text, so keep it small.
const MAX_IMAGE_MB = 2;

const EMPTY_DATA = {
    logoText: '', logoAccent: '', logoImage: '', phone: '', email: '',
    socialLinks: [], menuLinks: [], servicesMenu: [], solutionsMenu: [],
    brochureText: '', brochureLink: '',
};

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

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

function CardHeader({ title, hint, actionLabel, onAction }) {
    return (
        <div className="admin-page-header" style={{ marginBottom: hint ? '0.5rem' : '0.75rem' }}>
            <div>
                <h3 style={{ ...cardTitleStyle, margin: 0 }}>{title}</h3>
                {hint && <p style={{ ...hintStyle, margin: '4px 0 0' }}>{hint}</p>}
            </div>
            <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={onAction}>
                <FiPlus size={14} /> {actionLabel}
            </button>
        </div>
    );
}

// Services and Solutions mega menus have the exact same shape, so one editor serves both.
function MegaMenuEditor({ title, hint, categories, actions, catPlaceholder, itemPlaceholder }) {
    return (
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <CardHeader title={title} hint={hint} actionLabel="Add Category" onAction={actions.addCat} />

            {(categories || []).map((cat, catIdx) => (
                <div key={catIdx} className="admin-card" style={{ marginBottom: '1rem', background: 'var(--gray-50)' }}>
                    <div className="admin-form-row" style={{ alignItems: 'end' }}>
                        <div className="admin-form-group">
                            <label>Category Label</label>
                            <input
                                value={cat.label}
                                onChange={(e) => actions.updateCat(catIdx, 'label', e.target.value)}
                                placeholder={catPlaceholder}
                            />
                        </div>
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => actions.removeCat(catIdx)}>
                            <FiTrash2 size={14} /> Remove Category
                        </button>
                    </div>

                    <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--gray-200)' }}>
                        {(cat.items || []).map((item, itemIdx) => (
                            <div key={itemIdx} style={{ marginBottom: '0.5rem' }}>
                                <div className="admin-form-group">
                                    <label>Item Title</label>
                                    <input
                                        value={item.title}
                                        onChange={(e) => actions.updateItem(catIdx, itemIdx, 'title', e.target.value)}
                                        placeholder={itemPlaceholder}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Item Description</label>
                                    <input
                                        value={item.desc}
                                        onChange={(e) => actions.updateItem(catIdx, itemIdx, 'desc', e.target.value)}
                                        placeholder="Short description..."
                                    />
                                </div>
                                <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => actions.removeItem(catIdx, itemIdx)}>
                                    <FiTrash2 size={14} /> Remove Item
                                </button>
                            </div>
                        ))}
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => actions.addItem(catIdx)}>
                            <FiPlus size={14} /> Add Item
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function NavbarTab() {
    const [data, setData] = useState(EMPTY_DATA);
    const [loaded, setLoaded] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/navbar')
            .then((r) => {
                // merge with defaults so a missing list never becomes undefined
                setData({ ...EMPTY_DATA, ...r.data });
                setLoaded(true);
            })
            .catch(() => toast.error('Could not load navbar settings'));
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
            const res = await api.put('/navbar', data);
            setData({ ...EMPTY_DATA, ...res.data });
            setDirty(false);
            toast.success('Navbar updated!');
        } catch {
            toast.error('Failed to update navbar');
        } finally {
            setSaving(false);
        }
    };

    // ---- state helpers: every change is immutable and marks the form as edited ----
    const patch = (changes) => {
        setData((d) => ({ ...d, ...changes }));
        setDirty(true);
    };
    const updateList = (key, fn) => {
        setData((d) => ({ ...d, [key]: fn(d[key] || []) }));
        setDirty(true);
    };
    const setAt = (list, idx, change) => list.map((item, i) => (i === idx ? { ...item, ...change } : item));

    const handleLogoImage = async (e) => {
        const input = e.target;
        const file = input.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
            toast.error(`Logo must be under ${MAX_IMAGE_MB} MB`);
            input.value = '';
            return;
        }

        try {
            patch({ logoImage: await fileToBase64(file) });
        } catch {
            toast.error('Could not read the image');
        }
        input.value = ''; // lets the same file be picked again later
    };

    // ---- Social links ----
    const updateSocial = (idx, field, value) => updateList('socialLinks', (l) => setAt(l, idx, { [field]: value }));
    const addSocial = () => updateList('socialLinks', (l) => [...l, { platform: 'Facebook', url: '' }]);
    const removeSocial = (idx) => updateList('socialLinks', (l) => l.filter((_, i) => i !== idx));

    // ---- Menu links ----
    const updateMenu = (idx, field, value) => updateList('menuLinks', (l) => setAt(l, idx, { [field]: value }));
    const addMenu = () => updateList('menuLinks', (l) => [...l, { label: '', path: '' }]);
    const removeMenu = (idx) => updateList('menuLinks', (l) => l.filter((_, i) => i !== idx));

    // ---- Mega menus (categories with items). Same logic for both menus. ----
    const megaMenuActions = (key) => ({
        addCat: () => updateList(key, (l) => [...l, { label: '', items: [] }]),
        updateCat: (catIdx, field, value) => updateList(key, (l) => setAt(l, catIdx, { [field]: value })),
        removeCat: (catIdx) => updateList(key, (l) => l.filter((_, i) => i !== catIdx)),
        addItem: (catIdx) =>
            updateList(key, (l) =>
                l.map((cat, i) => (i === catIdx ? { ...cat, items: [...(cat.items || []), { title: '', desc: '' }] } : cat))
            ),
        updateItem: (catIdx, itemIdx, field, value) =>
            updateList(key, (l) =>
                l.map((cat, i) =>
                    i === catIdx ? { ...cat, items: setAt(cat.items || [], itemIdx, { [field]: value }) } : cat
                )
            ),
        removeItem: (catIdx, itemIdx) =>
            updateList(key, (l) =>
                l.map((cat, i) =>
                    i === catIdx ? { ...cat, items: (cat.items || []).filter((_, j) => j !== itemIdx) } : cat
                )
            ),
    });

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Navbar / Header</h2>
                    <p>Edit logo, contact info, social links, menu, mega menus, and brochure button.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {dirty && <span style={{ ...hintStyle, color: 'var(--blue-600)' }}>Unsaved changes</span>}
                    {/* disabled until the saved settings have loaded, so a failed load can never overwrite them with blanks */}
                    <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving || !loaded}>
                        <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Logo */}
            <Card title="Logo">
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Logo Text (main part)</label>
                        <input value={data.logoText || ''} onChange={(e) => patch({ logoText: e.target.value })} placeholder="Amanah" />
                    </div>
                    <div className="admin-form-group">
                        <label>Logo Accent (colored part)</label>
                        <input value={data.logoAccent || ''} onChange={(e) => patch({ logoAccent: e.target.value })} placeholder=".IT" />
                    </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '0.75rem' }}>
                    <label>Logo Image (optional — image thakle text logo er bodole eita dekhabe)</label>
                    {data.logoImage && <img src={data.logoImage} alt="Current logo" style={{ height: 48, marginBottom: 8, display: 'block' }} />}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                            <FiUpload size={14} /> {data.logoImage ? 'Change Logo Image' : 'Upload Logo Image'}
                            <input type="file" accept="image/*" onChange={handleLogoImage} style={{ display: 'none' }} />
                        </label>
                        {data.logoImage && (
                            <button
                                type="button"
                                className="admin-btn admin-btn-outline admin-btn-sm"
                                style={{ width: 'fit-content' }}
                                onClick={() => patch({ logoImage: '' })}
                            >
                                <FiTrash2 size={14} /> Remove (use text logo)
                            </button>
                        )}
                    </div>
                </div>
            </Card>

            {/* Contact info */}
            <Card title="Top Bar Contact Info">
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Phone</label>
                        <input type="tel" value={data.phone || ''} onChange={(e) => patch({ phone: e.target.value })} placeholder="+880 1800-000000" />
                    </div>
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input type="email" value={data.email || ''} onChange={(e) => patch({ email: e.target.value })} placeholder="info@amanahit.com" />
                    </div>
                </div>
            </Card>

            {/* Social links */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <CardHeader title="Social Links" actionLabel="Add" onAction={addSocial} />
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
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeSocial(i)} aria-label={`Remove ${s.platform} link`}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Menu links */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <CardHeader title="Menu Links" actionLabel="Add" onAction={addMenu} />
                <p style={{ ...hintStyle, marginBottom: '0.75rem' }}>
                    Note: path <code>/services</code> ba <code>/solutions</code> dile mega dropdown menu automatically dekhabe (niche define kora Services/Solutions Mega Menu theke).
                </p>
                {(data.menuLinks || []).map((m, i) => (
                    <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
                        <div className="admin-form-group">
                            <label>Label</label>
                            <input value={m.label} onChange={(e) => updateMenu(i, 'label', e.target.value)} placeholder="Home" />
                        </div>
                        <div className="admin-form-group">
                            <label>Path</label>
                            <input value={m.path} onChange={(e) => updateMenu(i, 'path', e.target.value)} placeholder="/" />
                        </div>
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeMenu(i)} aria-label={`Remove ${m.label || 'menu'} link`}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Mega menus */}
            <MegaMenuEditor
                title="Services Mega Menu"
                hint="Category add koro, protik category er bhitore item add koro. Category (menu er left sidebar), Item (right side content boxes)."
                categories={data.servicesMenu}
                actions={megaMenuActions('servicesMenu')}
                catPlaceholder="IT Consultancy"
                itemPlaceholder="IT Strategy and Planning"
            />

            <MegaMenuEditor
                title="Solutions Mega Menu"
                hint="Services Mega Menu er moto e — category ar item add/remove koro."
                categories={data.solutionsMenu}
                actions={megaMenuActions('solutionsMenu')}
                catPlaceholder="For Startups"
                itemPlaceholder="MVP Development"
            />

            {/* Brochure */}
            <Card title="Brochure Button" last>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.brochureText || ''} onChange={(e) => patch({ brochureText: e.target.value })} placeholder="Brochure" />
                    </div>
                    <div className="admin-form-group">
                        <label>PDF Link</label>
                        <input value={data.brochureLink || ''} onChange={(e) => patch({ brochureLink: e.target.value })} placeholder="/brochure.pdf" />
                    </div>
                </div>
            </Card>
        </div>
    );
}