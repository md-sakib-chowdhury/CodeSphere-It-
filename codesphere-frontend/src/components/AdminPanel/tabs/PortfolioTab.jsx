import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const CATS = ['Web', 'E-commerce', 'SaaS', 'Mobile', 'Other'];

// Images are stored as base64 text, so keep them reasonably small.
// If your backend accepts bigger request bodies you can raise this.
const MAX_IMAGE_MB = 3;

const EMPTY = {
    title: '', subtitle: '', description: '', image: '',
    liveUrl: '', githubUrl: '', category: 'Web', tags: [], featured: false,
};

export default function PortfolioTab() {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [tagInput, setTagInput] = useState('');
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const load = () =>
        api.get('/projects')
            .then((r) => setProjects(r.data))
            .catch(() => toast.error('Could not load projects'))
            .finally(() => setLoading(false));

    useEffect(() => { load(); }, []);

    // Esc closes the modal
    useEffect(() => {
        if (!showModal) return;
        const onKey = (e) => e.key === 'Escape' && setShowModal(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [showModal]);

    const openCreate = () => {
        setEditing(null);
        setForm(EMPTY);
        setPreview('');
        setTagInput('');
        setShowModal(true);
    };

    // merge with EMPTY so older projects (e.g. without a subtitle) never
    // give an undefined value to a controlled input
    const openEdit = (p) => {
        setEditing(p);
        setForm({ ...EMPTY, ...p });
        setPreview(p.image || '');
        setTagInput('');
        setShowModal(true);
    };

    const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

    const handleImage = (e) => {
        const input = e.target;
        const file = input.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
            toast.error(`Image must be under ${MAX_IMAGE_MB} MB`);
            input.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            setField('image', reader.result);
        };
        reader.onerror = () => toast.error('Could not read the image');
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setPreview('');
        setField('image', '');
    };

    const addTag = () => {
        const value = tagInput.trim();
        if (!value) return;

        // skip duplicates (case-insensitive)
        const exists = (form.tags || []).some((t) => t.toLowerCase() === value.toLowerCase());
        if (!exists) setForm((f) => ({ ...f, tags: [...(f.tags || []), value] }));
        setTagInput('');
    };
    const removeTag = (i) => setForm((f) => ({ ...f, tags: f.tags.filter((_, idx) => idx !== i) }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
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
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this project?')) return;
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
                    projects.map((p) => (
                        <div key={p._id} className="admin-list-item">
                            {p.image ? (
                                <img src={p.image} alt={p.title} className="admin-list-thumb" />
                            ) : (
                                <div className="admin-list-thumb" style={{ background: 'var(--blue-600)' }}>
                                    {(p.title || '').slice(0, 2).toUpperCase()}
                                </div>
                            )}
                            <div className="admin-list-info">
                                <div className="admin-list-title">{p.title} {p.featured && '⭐'}</div>
                                <div className="admin-list-sub">
                                    {p.category}
                                    {p.tags?.length > 0 && ` · ${p.tags.slice(0, 3).join(', ')}`}
                                </div>
                            </div>
                            <div className="admin-list-actions">
                                <button className="admin-icon-btn" onClick={() => openEdit(p)} aria-label={`Edit ${p.title}`}>
                                    <FiEdit2 size={15} />
                                </button>
                                <button className="admin-icon-btn danger" onClick={() => handleDelete(p._id)} aria-label={`Delete ${p.title}`}>
                                    <FiTrash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Edit Project' : 'Add New Project'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                                <FiX size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {preview && <img src={preview} alt="preview" className="admin-image-preview" />}
                            <div className="admin-form-group">
                                <label>Project Image</label>
                                <input type="file" accept="image/*" onChange={handleImage} />
                                {preview && (
                                    <button
                                        type="button"
                                        className="admin-btn admin-btn-outline admin-btn-sm"
                                        style={{ marginTop: 8, width: 'fit-content' }}
                                        onClick={removeImage}
                                    >
                                        <FiX size={13} /> Remove Image
                                    </button>
                                )}
                            </div>
                            <div className="admin-form-group">
                                <label>Title</label>
                                <input required value={form.title} onChange={(e) => setField('title', e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label>Subtitle</label>
                                <input
                                    value={form.subtitle}
                                    onChange={(e) => setField('subtitle', e.target.value)}
                                    placeholder="e.g. Mental Health Care Platform"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Description</label>
                                <textarea required rows="3" value={form.description} onChange={(e) => setField('description', e.target.value)} />
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Live URL</label>
                                    <input type="url" value={form.liveUrl} onChange={(e) => setField('liveUrl', e.target.value)} placeholder="https://..." />
                                </div>
                                <div className="admin-form-group">
                                    <label>GitHub URL</label>
                                    <input type="url" value={form.githubUrl} onChange={(e) => setField('githubUrl', e.target.value)} placeholder="https://github.com/..." />
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Category</label>
                                    <select value={form.category} onChange={(e) => setField('category', e.target.value)}>
                                        {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label>Featured?</label>
                                    <select value={form.featured ? 'yes' : 'no'} onChange={(e) => setField('featured', e.target.value === 'yes')}>
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
                                        onChange={(e) => setTagInput(e.target.value)}
                                        placeholder="e.g. React"
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    />
                                    <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addTag} aria-label="Add tag">
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <div className="admin-tags-input">
                                    {(form.tags || []).map((t, i) => (
                                        <span key={i} className="admin-tag-chip">
                                            {t}
                                            <button type="button" onClick={() => removeTag(i)} aria-label={`Remove ${t}`}>
                                                <FiX size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="admin-modal-actions">
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}