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

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export default function NavbarTab() {
    const [data, setData] = useState({
        logoText: '', logoAccent: '', logoImage: '', phone: '', email: '',
        socialLinks: [], menuLinks: [], servicesMenu: [], solutionsMenu: [],
        brochureText: '', brochureLink: '',
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/navbar').then(r => setData(r.data)).catch(() => { });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/navbar', data);
            setData(res.data);
            toast.success('Navbar updated!');
        } catch {
            toast.error('Failed to update navbar');
        } finally {
            setSaving(false);
        }
    };

    const handleLogoImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        setData({ ...data, logoImage: base64 });
    };

    // Social links
    const updateSocial = (idx, field, value) => {
        const links = [...data.socialLinks];
        links[idx][field] = value;
        setData({ ...data, socialLinks: links });
    };
    const addSocial = () => setData({ ...data, socialLinks: [...(data.socialLinks || []), { platform: 'Facebook', url: '' }] });
    const removeSocial = (idx) => setData({ ...data, socialLinks: data.socialLinks.filter((_, i) => i !== idx) });

    // Menu links
    const updateMenu = (idx, field, value) => {
        const links = [...data.menuLinks];
        links[idx][field] = value;
        setData({ ...data, menuLinks: links });
    };
    const addMenu = () => setData({ ...data, menuLinks: [...(data.menuLinks || []), { label: '', path: '' }] });
    const removeMenu = (idx) => setData({ ...data, menuLinks: data.menuLinks.filter((_, i) => i !== idx) });

    // Services mega menu (categories with items)
    const updateServiceCat = (idx, field, value) => {
        const menu = [...data.servicesMenu];
        menu[idx][field] = value;
        setData({ ...data, servicesMenu: menu });
    };
    const addServiceCat = () => setData({ ...data, servicesMenu: [...(data.servicesMenu || []), { label: '', items: [] }] });
    const removeServiceCat = (idx) => setData({ ...data, servicesMenu: data.servicesMenu.filter((_, i) => i !== idx) });
    const addServiceItem = (catIdx) => {
        const menu = [...data.servicesMenu];
        menu[catIdx].items = [...(menu[catIdx].items || []), { title: '', desc: '' }];
        setData({ ...data, servicesMenu: menu });
    };
    const updateServiceItem = (catIdx, itemIdx, field, value) => {
        const menu = [...data.servicesMenu];
        menu[catIdx].items[itemIdx][field] = value;
        setData({ ...data, servicesMenu: menu });
    };
    const removeServiceItem = (catIdx, itemIdx) => {
        const menu = [...data.servicesMenu];
        menu[catIdx].items = menu[catIdx].items.filter((_, i) => i !== itemIdx);
        setData({ ...data, servicesMenu: menu });
    };

    // Solutions mega menu (same shape)
    const updateSolutionCat = (idx, field, value) => {
        const menu = [...data.solutionsMenu];
        menu[idx][field] = value;
        setData({ ...data, solutionsMenu: menu });
    };
    const addSolutionCat = () => setData({ ...data, solutionsMenu: [...(data.solutionsMenu || []), { label: '', items: [] }] });
    const removeSolutionCat = (idx) => setData({ ...data, solutionsMenu: data.solutionsMenu.filter((_, i) => i !== idx) });
    const addSolutionItem = (catIdx) => {
        const menu = [...data.solutionsMenu];
        menu[catIdx].items = [...(menu[catIdx].items || []), { title: '', desc: '' }];
        setData({ ...data, solutionsMenu: menu });
    };
    const updateSolutionItem = (catIdx, itemIdx, field, value) => {
        const menu = [...data.solutionsMenu];
        menu[catIdx].items[itemIdx][field] = value;
        setData({ ...data, solutionsMenu: menu });
    };
    const removeSolutionItem = (catIdx, itemIdx) => {
        const menu = [...data.solutionsMenu];
        menu[catIdx].items = menu[catIdx].items.filter((_, i) => i !== itemIdx);
        setData({ ...data, solutionsMenu: menu });
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Navbar / Header</h2>
                    <p>Edit logo, contact info, social links, menu, mega menus, and brochure button.</p>
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
                        <input value={data.logoText || ''} onChange={e => setData({ ...data, logoText: e.target.value })} placeholder="Amanah" />
                    </div>
                    <div className="admin-form-group">
                        <label>Logo Accent (colored part)</label>
                        <input value={data.logoAccent || ''} onChange={e => setData({ ...data, logoAccent: e.target.value })} placeholder=".IT" />
                    </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '0.75rem' }}>
                    <label>Logo Image (optional — image thakle text logo er bodole eita dekhabe)</label>
                    {data.logoImage && <img src={data.logoImage} alt="" style={{ height: 48, marginBottom: 8, display: 'block' }} />}
                    <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ width: 'fit-content', cursor: 'pointer' }}>
                        <FiUpload size={14} /> Upload Logo Image
                        <input type="file" accept="image/*" onChange={handleLogoImage} style={{ display: 'none' }} />
                    </label>
                    {data.logoImage && (
                        <button
                            className="admin-btn admin-btn-outline admin-btn-sm"
                            style={{ marginLeft: 8, width: 'fit-content' }}
                            onClick={() => setData({ ...data, logoImage: '' })}
                        >
                            <FiTrash2 size={14} /> Remove (use text logo)
                        </button>
                    )}
                </div>
            </div>

            {/* Contact info */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Top Bar Contact Info</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Phone</label>
                        <input value={data.phone || ''} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+880 1800-000000" />
                    </div>
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input value={data.email || ''} onChange={e => setData({ ...data, email: e.target.value })} placeholder="info@amanahit.com" />
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
                            <input value={s.url} onChange={e => updateSocial(i, 'url', e.target.value)} placeholder="https://facebook.com/amanahit" />
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
                    Note: path <code>/services</code> ba <code>/solutions</code> dile mega dropdown menu automatically dekhabe (niche define kora Services/Solutions Mega Menu theke).
                </p>
                {(data.menuLinks || []).map((m, i) => (
                    <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
                        <div className="admin-form-group">
                            <label>Label</label>
                            <input value={m.label} onChange={e => updateMenu(i, 'label', e.target.value)} placeholder="Home" />
                        </div>
                        <div className="admin-form-group">
                            <label>Path</label>
                            <input value={m.path} onChange={e => updateMenu(i, 'path', e.target.value)} placeholder="/" />
                        </div>
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeMenu(i)}>
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* SERVICES MEGA MENU */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--gray-900)' }}>Services Mega Menu</h3>
                        <p style={{ fontSize: '12px', color: 'var(--gray-500)', margin: '4px 0 0' }}>
                            Category add koro, protik category er ভিতরে item add koro. Category (menu er left sidebar), Item (right side content boxes).
                        </p>
                    </div>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addServiceCat}>
                        <FiPlus size={14} /> Add Category
                    </button>
                </div>

                {(data.servicesMenu || []).map((cat, catIdx) => (
                    <div key={catIdx} className="admin-card" style={{ marginBottom: '1rem', background: 'var(--gray-50)' }}>
                        <div className="admin-form-row" style={{ alignItems: 'end' }}>
                            <div className="admin-form-group">
                                <label>Category Label</label>
                                <input value={cat.label} onChange={e => updateServiceCat(catIdx, 'label', e.target.value)} placeholder="IT Consultancy" />
                            </div>
                            <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeServiceCat(catIdx)}>
                                <FiTrash2 size={14} /> Remove Category
                            </button>
                        </div>

                        <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--gray-200)' }}>
                            {(cat.items || []).map((item, itemIdx) => (
                                <div key={itemIdx} style={{ marginBottom: '0.5rem' }}>
                                    <div className="admin-form-group">
                                        <label>Item Title</label>
                                        <input value={item.title} onChange={e => updateServiceItem(catIdx, itemIdx, 'title', e.target.value)} placeholder="IT Strategy and Planning" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Item Description</label>
                                        <input value={item.desc} onChange={e => updateServiceItem(catIdx, itemIdx, 'desc', e.target.value)} placeholder="Short description..." />
                                    </div>
                                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeServiceItem(catIdx, itemIdx)}>
                                        <FiTrash2 size={14} /> Remove Item
                                    </button>
                                </div>
                            ))}
                            <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => addServiceItem(catIdx)}>
                                <FiPlus size={14} /> Add Item
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* SOLUTIONS MEGA MENU */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-page-header" style={{ marginBottom: '0.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--gray-900)' }}>Solutions Mega Menu</h3>
                        <p style={{ fontSize: '12px', color: 'var(--gray-500)', margin: '4px 0 0' }}>
                            Services Mega Menu er moto e — category ar item add/remove koro.
                        </p>
                    </div>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addSolutionCat}>
                        <FiPlus size={14} /> Add Category
                    </button>
                </div>

                {(data.solutionsMenu || []).map((cat, catIdx) => (
                    <div key={catIdx} className="admin-card" style={{ marginBottom: '1rem', background: 'var(--gray-50)' }}>
                        <div className="admin-form-row" style={{ alignItems: 'end' }}>
                            <div className="admin-form-group">
                                <label>Category Label</label>
                                <input value={cat.label} onChange={e => updateSolutionCat(catIdx, 'label', e.target.value)} placeholder="For Startups" />
                            </div>
                            <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeSolutionCat(catIdx)}>
                                <FiTrash2 size={14} /> Remove Category
                            </button>
                        </div>

                        <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--gray-200)' }}>
                            {(cat.items || []).map((item, itemIdx) => (
                                <div key={itemIdx} style={{ marginBottom: '0.5rem' }}>
                                    <div className="admin-form-group">
                                        <label>Item Title</label>
                                        <input value={item.title} onChange={e => updateSolutionItem(catIdx, itemIdx, 'title', e.target.value)} placeholder="MVP Development" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Item Description</label>
                                        <input value={item.desc} onChange={e => updateSolutionItem(catIdx, itemIdx, 'desc', e.target.value)} placeholder="Short description..." />
                                    </div>
                                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => removeSolutionItem(catIdx, itemIdx)}>
                                        <FiTrash2 size={14} /> Remove Item
                                    </button>
                                </div>
                            ))}
                            <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => addSolutionItem(catIdx)}>
                                <FiPlus size={14} /> Add Item
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Brochure */}
            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>Brochure Button</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input value={data.brochureText || ''} onChange={e => setData({ ...data, brochureText: e.target.value })} placeholder="Brochure" />
                    </div>
                    <div className="admin-form-group">
                        <label>PDF Link</label>
                        <input value={data.brochureLink || ''} onChange={e => setData({ ...data, brochureLink: e.target.value })} placeholder="/brochure.pdf" />
                    </div>
                </div>
            </div>
        </div>
    );
}