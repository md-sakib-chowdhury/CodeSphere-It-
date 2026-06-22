import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const EMPTY = { name: '', designation: '', bio: '', image: '', linkedin: '', github: '', twitter: '', skills: [] };

export default function TeamTab() {
    const [team, setTeam] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [skillInput, setSkillInput] = useState('');
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(true);

    const load = () => api.get('/team').then(r => setTeam(r.data)).catch(() => { }).finally(() => setLoading(false));
    useEffect(() => { load(); }, []);

    const openCreate = () => { setEditing(null); setForm(EMPTY); setPreview(''); setShowModal(true); };
    const openEdit = (m) => { setEditing(m); setForm({ ...m }); setPreview(m.image || ''); setShowModal(true); };

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

    const addSkill = () => {
        if (!skillInput.trim()) return;
        setForm({ ...form, skills: [...(form.skills || []), skillInput.trim()] });
        setSkillInput('');
    };
    const removeSkill = (i) => setForm({ ...form, skills: form.skills.filter((_, idx) => idx !== i) });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await api.put(`/team/${editing._id}`, form);
                toast.success('Team member updated!');
            } else {
                await api.post('/team', form);
                toast.success('Team member added!');
            }
            setShowModal(false);
            load();
        } catch {
            toast.error('Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Remove this team member?')) return;
        try {
            await api.delete(`/team/${id}`);
            toast.success('Team member removed');
            load();
        } catch {
            toast.error('Failed to delete');
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Team Members</h2>
                    <p>Manage your team profiles shown on the website.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openCreate}>
                    <FiPlus size={15} /> Add Member
                </button>
            </div>

            <div className="admin-table-wrap">
                {loading ? (
                    <p className="admin-empty">Loading...</p>
                ) : team.length === 0 ? (
                    <p className="admin-empty">No team members yet. Add your first one!</p>
                ) : (
                    team.map(m => (
                        <div key={m._id} className="admin-list-item">
                            {m.image ? (
                                <img src={m.image} alt={m.name} className="admin-list-thumb" style={{ borderRadius: '50%' }} />
                            ) : (
                                <div className="admin-list-thumb" style={{ background: 'var(--green-600)', borderRadius: '50%' }}>
                                    {m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                            )}
                            <div className="admin-list-info">
                                <div className="admin-list-title">{m.name}</div>
                                <div className="admin-list-sub">{m.designation}</div>
                            </div>
                            <div className="admin-list-actions">
                                <button className="admin-icon-btn" onClick={() => openEdit(m)}><FiEdit2 size={15} /></button>
                                <button className="admin-icon-btn danger" onClick={() => handleDelete(m._id)}><FiTrash2 size={15} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Edit Team Member' : 'Add Team Member'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}><FiX size={16} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {preview && <img src={preview} alt="preview" className="admin-image-preview round" />}
                            <div className="admin-form-group">
                                <label>Photo</label>
                                <input type="file" accept="image/*" onChange={handleImage} />
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Full Name</label>
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label>Designation</label>
                                    <input required value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Lead Developer" />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label>Bio</label>
                                <textarea rows="3" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>LinkedIn URL</label>
                                    <input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
                                </div>
                                <div className="admin-form-group">
                                    <label>GitHub URL</label>
                                    <input value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label>Twitter / X URL</label>
                                <input value={form.twitter} onChange={e => setForm({ ...form, twitter: e.target.value })} placeholder="https://x.com/..." />
                            </div>
                            <div className="admin-form-group">
                                <label>Skills</label>
                                <div className="admin-form-inline-edit" style={{ marginBottom: '0.5rem' }}>
                                    <input
                                        value={skillInput}
                                        onChange={e => setSkillInput(e.target.value)}
                                        placeholder="e.g. React"
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                    />
                                    <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addSkill}>
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <div className="admin-tags-input">
                                    {(form.skills || []).map((s, i) => (
                                        <span key={i} className="admin-tag-chip">
                                            {s}<button type="button" onClick={() => removeSkill(i)}><FiX size={12} /></button>
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