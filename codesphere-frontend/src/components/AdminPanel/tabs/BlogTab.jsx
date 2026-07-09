import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiArrowLeft,
    FiCalendar, FiUploadCloud
} from 'react-icons/fi';
import api from '../../../utils/api';

const emptyForm = () => ({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: [],
    author: 'CodeSphere IT',
    published: false,
});

export default function BlogTab() {
    const [view, setView] = useState('list'); // 'list' | 'form'
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm());
    const [tagInput, setTagInput] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchBlogs = () => {
        setLoading(true);
        api.get('/blogs/all')
            .then(r => setBlogs(r.data))
            .catch(() => toast.error('Blog list load kora jayni'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchBlogs(); }, []);

    const openNew = () => {
        setForm(emptyForm());
        setEditingId(null);
        setView('form');
    };

    const openEdit = (blog) => {
        setForm({
            title: blog.title || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            image: blog.image || '',
            tags: blog.tags || [],
            author: blog.author || 'CodeSphere IT',
            published: !!blog.published,
        });
        setEditingId(blog._id);
        setView('form');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Shudhu image file select koro');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setForm(f => ({ ...f, image: reader.result }));
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const addTag = () => {
        if (!tagInput.trim()) return;
        setForm(f => ({ ...f, tags: [...(f.tags || []), tagInput.trim()] }));
        setTagInput('');
    };

    const removeTag = (idx) => {
        setForm(f => ({ ...f, tags: f.tags.filter((_, i) => i !== idx) }));
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            toast.error('Title ebong Content obosshoi likhte hobe');
            return;
        }
        setSaving(true);
        try {
            if (editingId) {
                await api.put(`/blogs/${editingId}`, form);
                toast.success('Post update hoyeche!');
            } else {
                await api.post('/blogs', form);
                toast.success('Notun post toiri hoyeche!');
            }
            setView('list');
            fetchBlogs();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save kora jayni');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Ei post ta delete korte chao? Eta ar phiriye ana jabe na.')) return;
        try {
            await api.delete(`/blogs/${id}`);
            toast.success('Post delete hoyeche');
            fetchBlogs();
        } catch {
            toast.error('Delete kora jayni');
        }
    };

    const formatDate = (d) =>
        d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

    // ============================ FORM VIEW ============================
    if (view === 'form') {
        return (
            <div>
                <div className="admin-page-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                            className="admin-btn admin-btn-outline admin-btn-sm"
                            onClick={() => setView('list')}
                        >
                            <FiArrowLeft size={14} /> Back
                        </button>
                        <div>
                            <h2>{editingId ? 'Edit Post' : 'New Post'}</h2>
                            <p>{editingId ? 'Update this blog post.' : 'Write and publish a new blog post.'}</p>
                        </div>
                    </div>
                    <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                        <FiSave size={15} /> {saving ? 'Saving...' : 'Save Post'}
                    </button>
                </div>

                <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                    <div className="admin-form-group">
                        <label>Title</label>
                        <input
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            placeholder="Essential Features Your Website Should Have in 2026"
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Excerpt (short preview text, shown on homepage card)</label>
                        <textarea
                            rows="2"
                            value={form.excerpt}
                            onChange={e => setForm({ ...form, excerpt: e.target.value })}
                            placeholder="A modern business website needs more than a homepage..."
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Full Content</label>
                        <textarea
                            rows="10"
                            value={form.content}
                            onChange={e => setForm({ ...form, content: e.target.value })}
                            placeholder="Full article content..."
                        />
                    </div>

                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>Author</label>
                            <input
                                value={form.author}
                                onChange={e => setForm({ ...form, author: e.target.value })}
                                placeholder="CodeSphere IT"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Status</label>
                            <select
                                value={form.published ? 'published' : 'draft'}
                                onChange={e => setForm({ ...form, published: e.target.value === 'published' })}
                            >
                                <option value="draft">Draft (hidden from website)</option>
                                <option value="published">Published (visible to everyone)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                        Cover Image
                    </h3>
                    <label
                        htmlFor="blog-image-upload"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            border: '1.5px dashed var(--gray-300, #d1d5db)',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            cursor: 'pointer',
                            color: 'var(--gray-600, #4b5563)',
                            fontSize: '0.9rem',
                        }}
                    >
                        <FiUploadCloud size={16} /> Click to choose a cover image
                    </label>
                    <input
                        id="blog-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    {form.image && (
                        <img
                            src={form.image}
                            alt="Cover preview"
                            style={{ marginTop: '0.75rem', maxWidth: '100%', maxHeight: '220px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                    )}
                </div>

                <div className="admin-card">
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                        Tags
                    </h3>
                    <div className="admin-form-inline-edit" style={{ marginBottom: '0.75rem' }}>
                        <input
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            placeholder="e.g. Web Development"
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addTag}>
                            <FiPlus size={14} /> Add
                        </button>
                    </div>
                    <div className="admin-tags-input">
                        {(form.tags || []).map((t, i) => (
                            <span key={i} className="admin-tag-chip">
                                {t}
                                <button onClick={() => removeTag(i)}><FiX size={12} /></button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ============================ LIST VIEW ============================
    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Blog / Articles</h2>
                    <p>Write, edit and publish articles shown on your Latest Articles page.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openNew}>
                    <FiPlus size={15} /> New Post
                </button>
            </div>

            {loading ? (
                <div className="admin-card">Loading...</div>
            ) : blogs.length === 0 ? (
                <div className="admin-card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray-500)' }}>
                    Kono post nei. "New Post" e click kore prothom article ta likho.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {blogs.map(b => (
                        <div key={b._id} className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--gray-100, #f3f4f6)' }}>
                                {b.image && (
                                    <img
                                        src={b.image}
                                        alt={b.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                )}
                                <span
                                    style={{
                                        position: 'absolute', top: 10, left: 10,
                                        fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem',
                                        borderRadius: '999px', color: '#fff',
                                        background: b.published ? '#16a34a' : '#f59e0b',
                                    }}
                                >
                                    {b.published ? 'Published' : 'Draft'}
                                </span>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.4 }}>
                                    {b.title}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--gray-500)', marginBottom: '0.85rem' }}>
                                    <FiCalendar size={12} /> {formatDate(b.createdAt)}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(b)}>
                                        <FiEdit2 size={13} /> Edit
                                    </button>
                                    <button
                                        className="admin-btn admin-btn-outline admin-btn-sm"
                                        style={{ color: '#dc2626', borderColor: '#fecaca' }}
                                        onClick={() => handleDelete(b._id)}
                                    >
                                        <FiTrash2 size={13} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}