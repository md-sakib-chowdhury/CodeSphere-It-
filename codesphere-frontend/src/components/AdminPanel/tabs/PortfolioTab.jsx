import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const CATS = ['Web', 'E-commerce', 'SaaS', 'Mobile', 'Other'];
const EMPTY = { title: '', description: '', image: '', liveUrl: '', githubUrl: '', category: 'Web', tags: [], featured: false };

export default function PortfolioTab() {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [tagInput, setTagInput] = useState('');
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(true);

    const load = () => api.get('/projects').then(r => setProjects(r.data)).catch(() => { }).finally(() => setLoading(false));
    useEffect(() => { load(); }, []);

    const openCreate = () => { setEditing(null); setForm(EMPTY); setPreview(''); setShowModal(true); };
    const openEdit = (p) => { setEditing(p); setForm({ ...p }); setPreview(p.image || ''); setShowModal(true); };

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

    const addTag = () => {
        if (!tagInput.trim()) return;
        setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] });
        setTagInput('');
    };
    const removeTag = (i) => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await api.put(`/projects/${editing._id}`, form);
                toast.success('Project updated!');
            } else {
                await api.post('/projects', form);
                toast.success('Project created!');
            }
            setShowModal(false);
            load();
        } catch {
            toast.error('Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this project?')) return;
        try {
            await api.delete(`/projects/${id}`);
            toast.success('Project deleted');
            load();
        } catch {
            toast.error('Failed to delete');
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Portfolio Projects</h2>
                    <p>Manage the projects shown in your portfolio section.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openCreate}>
                    <FiPlus size={15} /> Add Project
                </button>
            </div>

            <div className="admin-table-wrap">
                {loading ? (
                    <p className="admin-empty">Loading...</p>
                ) : projects.length === 0 ? (
                    <p className="admin-empty">No projects yet. Add your first one!</p>
                ) : (
                    projects.map(p => (
                        <div key={p._id} className="admin-list-item">
                            {p.image ? (
                                <img src={p.image} alt={p.title} className="admin-list-thumb" />
                            ) : (
                                <div className="admin-list-thumb" style={{ background: 'var(--blue-600)' }}>
                                    {p.title.slice(0, 2).toUpperCase()}
                                </div>
                            )}
                            <div className="admin-list-info">
                                <div className="admin-list-title">{p.title} {p.featured && '⭐'}</div>
                                <div className="admin-list-sub">{p.category} · {(p.tags || []).slice(0, 3).join(', ')}</div>
                            </div>
                            <div className="admin-list-actions">
                                <button className="admin-icon-btn" onClick={() => openEdit(p)}><FiEdit2 size={15} /></button>
                                <button className="admin-icon-btn danger" onClick={() => handleDelete(p._id)}><FiTrash2 size={15} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Edit Project' : 'Add New Project'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}><FiX size={16} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {preview && <img src={preview} alt="preview" className="admin-image-preview" />}
                            <div className="admin-form-group">
                                <label>Project Image</label>
                                <input type="file" accept="image/*" onChange={handleImage} />
                            </div>
                            <div className="admin-form-group">
                                <label>Title</label>
                                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label>Description</label>
                                <textarea required rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Live URL</label>
                                    <input value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://..." />
                                </div>
                                <div className="admin-form-group">
                                    <label>GitHub URL</label>
                                    <input value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Category</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                        {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label>Featured?</label>
                                    <select value={form.featured ? 'yes' : 'no'} onChange={e => setForm({ ...form, featured: e.target.value === 'yes' })}>
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label>Tags / Tech Stack</label>
                                <div className="admin-form-inline-edit" style={{ marginBottom: '0.5rem' }}>
                                    <input
                                        value={tagInput}
                                        onChange={e => setTagInput(e.target.value)}
                                        placeholder="e.g. React"
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    />
                                    <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addTag}>
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <div className="admin-tags-input">
                                    {(form.tags || []).map((t, i) => (
                                        <span key={i} className="admin-tag-chip">
                                            {t}<button type="button" onClick={() => removeTag(i)}><FiX size={12} /></button>
                                        </span>
                                    ))}
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