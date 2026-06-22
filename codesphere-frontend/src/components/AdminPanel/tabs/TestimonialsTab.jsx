import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const EMPTY = { name: '', company: '', message: '', rating: 5, country: '', image: '' };

export default function TestimonialsTab() {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(true);

    const load = () => api.get('/testimonials').then(r => setItems(r.data)).catch(() => { }).finally(() => setLoading(false));
    useEffect(() => { load(); }, []);

    const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
    const openEdit = (t) => { setEditing(t); setForm({ ...t }); setShowModal(true); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await api.put(`/testimonials/${editing._id}`, form);
                toast.success('Testimonial updated!');
            } else {
                await api.post('/testimonials', form);
                toast.success('Testimonial added!');
            }
            setShowModal(false);
            load();
        } catch {
            toast.error('Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await api.delete(`/testimonials/${id}`);
            toast.success('Testimonial deleted');
            load();
        } catch {
            toast.error('Failed to delete');
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Testimonials</h2>
                    <p>Manage client reviews shown on your homepage.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openCreate}>
                    <FiPlus size={15} /> Add Testimonial
                </button>
            </div>

            <div className="admin-table-wrap">
                {loading ? (
                    <p className="admin-empty">Loading...</p>
                ) : items.length === 0 ? (
                    <p className="admin-empty">No testimonials yet. Add your first one!</p>
                ) : (
                    items.map(t => (
                        <div key={t._id} className="admin-list-item">
                            <div className="admin-list-thumb" style={{ background: 'var(--blue-600)' }}>
                                {t.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="admin-list-info">
                                <div className="admin-list-title">{t.name} — {'⭐'.repeat(t.rating || 5)}</div>
                                <div className="admin-list-sub">{t.company} · {t.message.slice(0, 50)}...</div>
                            </div>
                            <div className="admin-list-actions">
                                <button className="admin-icon-btn" onClick={() => openEdit(t)}><FiEdit2 size={15} /></button>
                                <button className="admin-icon-btn danger" onClick={() => handleDelete(t._id)}><FiTrash2 size={15} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}><FiX size={16} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Client Name</label>
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="admin-form-group">
                                    <label>Company</label>
                                    <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="e.g. CEO, ABC Ltd" />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label>Message</label>
                                <textarea required rows="3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Rating</label>
                                    <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>
                                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label>Country</label>
                                    <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="e.g. Bangladesh" />
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