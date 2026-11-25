import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiArrowLeft,
    FiCalendar, FiUploadCloud, FiSettings
} from 'react-icons/fi';
import api from '../../../utils/api';

// Images are stored as base64 text, so keep them reasonably small.
// If your backend accepts bigger request bodies you can raise this.
const MAX_IMAGE_MB = 3;

const emptyForm = () => ({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: [],
    author: 'CodeSphere IT',
    published: false,
});

const emptyPageSettings = () => ({
    bannerHeading: 'Latest Articles',
    bannerImage: '',
    ctaLabel: 'Our Recent Activities',
    ctaHeading: 'Latest Activities From Our Team',
    ctaText: 'Want to work with us on your next project?',
    ctaButtonText: 'Get In Touch',
    ctaButtonLink: '/contact',
});

// True when any field differs (arrays are compared by their items)
const differs = (a, b) =>
    Object.keys({ ...a, ...b }).some((key) =>
        Array.isArray(a[key]) || Array.isArray(b[key])
            ? (a[key] || []).join('|') !== (b[key] || []).join('|')
            : a[key] !== b[key]
    );

const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);

const cardTitleStyle = { fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' };

const dropzoneStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1.5px dashed var(--gray-300, #d1d5db)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    color: 'var(--gray-600, #4b5563)',
    fontSize: '0.9rem',
};

// Reads an image file as base64 with type and size checks.
// Also clears the input so the same file can be picked again later.
function readImage(e, onLoad) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        toast.error('Shudhu image file select koro');
        input.value = '';
        return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
        toast.error(`Image ${MAX_IMAGE_MB} MB er cheye choto hote hobe`);
        input.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = () => onLoad(reader.result);
    reader.onerror = () => toast.error('Image porte pari ni');
    reader.readAsDataURL(file);
    input.value = '';
}

function Card({ title, children, style }) {
    return (
        <div className="admin-card" style={style}>
            {title && <h3 style={cardTitleStyle}>{title}</h3>}
            {children}
        </div>
    );
}

// Dashed upload box + preview + Remove button (used for the cover image and the banner)
function ImageUpload({ id, prompt, value, onFile, onRemove, previewMaxHeight }) {
    return (
        <>
            <label htmlFor={id} style={dropzoneStyle}>
                <FiUploadCloud size={16} /> {value ? 'Click to change the image' : prompt}
            </label>
            <input id={id} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
            {value && (
                <div style={{ marginTop: '0.75rem' }}>
                    <img
                        src={value}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: previewMaxHeight, borderRadius: '8px', objectFit: 'cover', display: 'block' }}
                    />
                    <button
                        type="button"
                        className="admin-btn admin-btn-outline admin-btn-sm"
                        style={{ marginTop: '0.5rem' }}
                        onClick={onRemove}
                    >
                        <FiX size={13} /> Remove Image
                    </button>
                </div>
            )}
        </>
    );
}

export default function BlogTab() {
    const [view, setView] = useState('list'); // 'list' | 'form' | 'settings'
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm());
    const [formInitial, setFormInitial] = useState(emptyForm());
    const [tagInput, setTagInput] = useState('');
    const [saving, setSaving] = useState(false);

    const [pageSettings, setPageSettings] = useState(emptyPageSettings());
    const [settingsInitial, setSettingsInitial] = useState(emptyPageSettings());
    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const [savingSettings, setSavingSettings] = useState(false);

    const formDirty = view === 'form' && differs(form, formInitial);
    const settingsDirty = view === 'settings' && differs(pageSettings, settingsInitial);
    const dirty = formDirty || settingsDirty;

    const fetchBlogs = () => {
        setLoading(true);
        api.get('/blogs/all')
            .then((r) => setBlogs(r.data))
            .catch(() => toast.error('Blog list load kora jayni'))
            .finally(() => setLoading(false));
    };

    const fetchPageSettings = () => {
        api.get('/blog-page')
            .then((r) => {
                // merge with defaults so a missing field never becomes undefined
                const merged = { ...emptyPageSettings(), ...r.data };
                setPageSettings(merged);
                setSettingsInitial(merged);
                setSettingsLoaded(true);
            })
            .catch(() => toast.error('Page settings load kora jayni'));
    };

    useEffect(() => {
        fetchBlogs();
        fetchPageSettings();
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

    // Back button: ask first if there are unsaved changes
    const goBack = () => {
        if (dirty && !window.confirm('Save na kora change gulo harie jabe. Back jaite chao?')) return;
        setView('list');
    };

    const openNew = () => {
        const blank = emptyForm();
        setForm(blank);
        setFormInitial(blank);
        setTagInput('');
        setEditingId(null);
        setView('form');
    };

    const openEdit = (blog) => {
        const next = {
            title: blog.title || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            image: blog.image || '',
            tags: blog.tags || [],
            author: blog.author || 'CodeSphere IT',
            published: !!blog.published,
        };
        setForm(next);
        setFormInitial(next);
        setTagInput('');
        setEditingId(blog._id);
        setView('form');
    };

    const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));
    const setSetting = (name, value) => setPageSettings((s) => ({ ...s, [name]: value }));

    const addTag = () => {
        const value = tagInput.trim();
        if (!value) return;

        // skip duplicates (case-insensitive)
        const exists = (form.tags || []).some((t) => t.toLowerCase() === value.toLowerCase());
        if (!exists) setForm((f) => ({ ...f, tags: [...(f.tags || []), value] }));
        setTagInput('');
    };

    const removeTag = (idx) => setForm((f) => ({ ...f, tags: f.tags.filter((_, i) => i !== idx) }));

    const handleSave = async () => {
        const payload = { ...form, title: form.title.trim(), content: form.content.trim() };
        if (!payload.title || !payload.content) {
            toast.error('Title ebong Content obosshoi likhte hobe');
            return;
        }
        setSaving(true);
        try {
            if (editingId) {
                await api.put(`/blogs/${editingId}`, payload);
                toast.success('Post update hoyeche!');
            } else {
                await api.post('/blogs', payload);
                toast.success('Notun post toiri hoyeche!');
            }
            setFormInitial(form); // saved, so nothing is "unsaved" any more
            setView('list');
            fetchBlogs();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save kora jayni');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (blog) => {
        if (!window.confirm(`"${blog.title}" delete korte chao? Eta ar phiriye ana jabe na.`)) return;
        try {
            await api.delete(`/blogs/${blog._id}`);
            toast.success('Post delete hoyeche');
            fetchBlogs();
        } catch {
            toast.error('Delete kora jayni');
        }
    };

    const handleSaveSettings = async () => {
        setSavingSettings(true);
        try {
            const res = await api.put('/blog-page', pageSettings);
            const merged = { ...emptyPageSettings(), ...res.data };
            setPageSettings(merged);
            setSettingsInitial(merged);
            toast.success('Page settings update hoyeche!');
            setView('list');
        } catch {
            toast.error('Settings save kora jayni');
        } finally {
            setSavingSettings(false);
        }
    };

    const formatDate = (d) => {
        const date = d ? new Date(d) : null;
        return date && !Number.isNaN(date.getTime())
            ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '';
    };

    // ============================ PAGE SETTINGS VIEW ============================
    if (view === 'settings') {
        return (
            <div>
                <div className="admin-page-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={goBack}>
                            <FiArrowLeft size={14} /> Back
                        </button>
                        <div>
                            <h2>Latest Articles Page Settings</h2>
                            <p>Edit the banner and bottom CTA section of the /latest-articles page.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {settingsDirty && <span style={{ fontSize: '12px', color: 'var(--blue-600)' }}>Unsaved changes</span>}
                        {/* disabled until the saved settings have loaded, so a failed load can never overwrite them */}
                        <button
                            className="admin-btn admin-btn-primary"
                            onClick={handleSaveSettings}
                            disabled={savingSettings || !settingsLoaded}
                        >
                            <FiSave size={15} /> {savingSettings ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </div>

                <Card title="Top Banner" style={{ marginBottom: '1.5rem' }}>
                    <div className="admin-form-group">
                        <label>Banner Heading</label>
                        <input
                            value={pageSettings.bannerHeading || ''}
                            onChange={(e) => setSetting('bannerHeading', e.target.value)}
                            placeholder="Latest Articles"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Banner Background Image</label>
                        <ImageUpload
                            id="banner-image-upload"
                            prompt="Click to choose a banner image"
                            value={pageSettings.bannerImage}
                            onFile={(e) => readImage(e, (data) => setSetting('bannerImage', data))}
                            onRemove={() => setSetting('bannerImage', '')}
                            previewMaxHeight="180px"
                        />
                    </div>
                </Card>

                <Card title="Bottom CTA Section">
                    <div className="admin-form-group">
                        <label>Small Label</label>
                        <input
                            value={pageSettings.ctaLabel || ''}
                            onChange={(e) => setSetting('ctaLabel', e.target.value)}
                            placeholder="Our Recent Activities"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Heading</label>
                        <input
                            value={pageSettings.ctaHeading || ''}
                            onChange={(e) => setSetting('ctaHeading', e.target.value)}
                            placeholder="Latest Activities From Our Team"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>Text</label>
                        <input
                            value={pageSettings.ctaText || ''}
                            onChange={(e) => setSetting('ctaText', e.target.value)}
                            placeholder="Want to work with us on your next project?"
                        />
                    </div>
                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>Button Text</label>
                            <input
                                value={pageSettings.ctaButtonText || ''}
                                onChange={(e) => setSetting('ctaButtonText', e.target.value)}
                                placeholder="Get In Touch"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Button Link</label>
                            <input
                                value={pageSettings.ctaButtonLink || ''}
                                onChange={(e) => setSetting('ctaButtonLink', e.target.value)}
                                placeholder="/contact"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // ============================ FORM VIEW (create/edit post) ============================
    if (view === 'form') {
        return (
            <div>
                <div className="admin-page-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={goBack}>
                            <FiArrowLeft size={14} /> Back
                        </button>
                        <div>
                            <h2>{editingId ? 'Edit Post' : 'New Post'}</h2>
                            <p>{editingId ? 'Update this blog post.' : 'Write and publish a new blog post.'}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {formDirty && <span style={{ fontSize: '12px', color: 'var(--blue-600)' }}>Unsaved changes</span>}
                        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                            <FiSave size={15} /> {saving ? 'Saving...' : 'Save Post'}
                        </button>
                    </div>
                </div>

                <Card style={{ marginBottom: '1.5rem' }}>
                    <div className="admin-form-group">
                        <label>Title</label>
                        <input
                            value={form.title}
                            onChange={(e) => setField('title', e.target.value)}
                            placeholder="Essential Features Your Website Should Have in 2026"
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Excerpt (short preview text, shown on homepage card)</label>
                        <textarea
                            rows="2"
                            value={form.excerpt}
                            onChange={(e) => setField('excerpt', e.target.value)}
                            placeholder="A modern business website needs more than a homepage..."
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Full Content</label>
                        <textarea
                            rows="10"
                            value={form.content}
                            onChange={(e) => setField('content', e.target.value)}
                            placeholder="Full article content..."
                        />
                        <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: 4 }}>
                            {countWords(form.content)} words
                            {countWords(form.content) > 0 && ` · about ${Math.max(1, Math.round(countWords(form.content) / 200))} min read`}
                        </p>
                    </div>

                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label>Author</label>
                            <input
                                value={form.author}
                                onChange={(e) => setField('author', e.target.value)}
                                placeholder="CodeSphere IT"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Status</label>
                            <select
                                value={form.published ? 'published' : 'draft'}
                                onChange={(e) => setField('published', e.target.value === 'published')}
                            >
                                <option value="draft">Draft (hidden from website)</option>
                                <option value="published">Published (visible to everyone)</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <Card title="Cover Image" style={{ marginBottom: '1.5rem' }}>
                    <ImageUpload
                        id="blog-image-upload"
                        prompt="Click to choose a cover image"
                        value={form.image}
                        onFile={(e) => readImage(e, (data) => setField('image', data))}
                        onRemove={() => setField('image', '')}
                        previewMaxHeight="220px"
                    />
                </Card>

                <Card title="Tags">
                    <div className="admin-form-inline-edit" style={{ marginBottom: '0.75rem' }}>
                        <input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="e.g. Web Development"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addTag}>
                            <FiPlus size={14} /> Add
                        </button>
                    </div>
                    <div className="admin-tags-input">
                        {(form.tags || []).map((t, i) => (
                            <span key={t} className="admin-tag-chip">
                                {t}
                                <button type="button" onClick={() => removeTag(i)} aria-label={`Remove ${t}`}>
                                    <FiX size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                </Card>
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
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="admin-btn admin-btn-outline" onClick={() => setView('settings')}>
                        <FiSettings size={15} /> Page Settings
                    </button>
                    <button className="admin-btn admin-btn-primary" onClick={openNew}>
                        <FiPlus size={15} /> New Post
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="admin-card">Loading...</div>
            ) : blogs.length === 0 ? (
                <div className="admin-card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray-500)' }}>
                    Kono post nei. "New Post" e click kore prothom article ta likho.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {blogs.map((b) => (
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
                                        onClick={() => handleDelete(b)}
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