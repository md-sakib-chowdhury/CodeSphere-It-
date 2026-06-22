import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const ICON_OPTIONS = ['FiCode', 'FiShoppingCart', 'FiSmartphone', 'FiTrendingUp', 'FiLayout', 'FiServer'];
const EMPTY = { title: '', description: '', icon: 'FiCode', color: '#2563eb', features: [] };

export default function ServicesTab() {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [featureInput, setFeatureInput] = useState('');
    const [loading, setLoading] = useState(true);

    const load = () => api.get('/services').then(r => setServices(r.data)).catch(() => { }).finally(() => setLoading(false));
    useEffect(() => { load(); }, []);

    const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
    const openEdit = (s) => { setEditing(s); setForm({ ...s }); setShowModal(true); };

    const addFeature = () => {
        if (!featureInput.trim()) return;
        setForm({ ...form, features: [...(form.features || []), featureInput.trim()] });
        setFeatureInput('');
    };
    const removeFeature = (i) => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await api.put(`/services/${editing._id}`, form);
                toast.success('Service updated!');
            } else {
                await api.post('/services', form);
                toast.success('Service created!');
            }
            setShowModal(false);
            load();
        } catch {
            toast.error('Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this service?')) return;
        try {
            await api.delete(`/services/${id}`);
            toast.success('Service deleted');
            load();
        } catch {
            toast.error('Failed to delete');
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Services</h2>
                    <p>Manage the services displayed on your homepage.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openCreate}>
                    <FiPlus size={15} /> Add Service
                </button>
            </div>

            <div className="admin-table-wrap">
                {loading ? (
                    <p className="admin-empty">Loading...</p>
                ) : services.length === 0 ? (
                    <p className="admin-empty">No services yet. Add your first one!</p>
                ) : (
                    services.map(s => (
                        <div key={s._id} className="admin-list-item">
                            <div className="admin-list-thumb" style={{ background: s.color }}>
                                {s.title.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="admin-list-info">
                                <div className="admin-list-title">{s.title}</div>
                                <div className="admin-list-sub">{s.description.slice(0, 70)}...</div>
                            </div>
                            <div className="admin-list-actions">
                                <button className="admin-icon-btn" onClick={() => openEdit(s)}><FiEdit2 size={15} /></button>
                                <button className="admin-icon-btn danger" onClick={() => handleDelete(s._id)}><FiTrash2 size={15} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Edit Service' : 'Add New Service'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}><FiX size={16} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                                    <label>Icon</label>
                                    <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}>
                                        {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label>Color</label>
                                    <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label>Features</label>
                                <div className="admin-form-inline-edit" style={{ marginBottom: '0.5rem' }}>
                                    <input
                                        value={featureInput}
                                        onChange={e => setFeatureInput(e.target.value)}
                                        placeholder="e.g. React + Node.js"
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                    />
                                    <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addFeature}>
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <div className="admin-tags-input">
                                    {(form.features || []).map((f, i) => (
                                        <span key={i} className="admin-tag-chip">
                                            {f}<button type="button" onClick={() => removeFeature(i)}><FiX size={12} /></button>
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