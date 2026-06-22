import { useState, useEffect } from 'react';
import { FiTrash2, FiMail, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

export default function ContactTab() {
    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    const load = () => api.get('/contact').then(r => setMessages(r.data)).catch(() => { }).finally(() => setLoading(false));
    useEffect(() => { load(); }, []);

    const openMessage = async (m) => {
        setSelected(m);
        if (m.status === 'new') {
            try {
                await api.put(`/contact/${m._id}`, { status: 'read' });
                load();
            } catch { }
        }
    };

    const markReplied = async (id) => {
        try {
            await api.put(`/contact/${id}`, { status: 'replied' });
            toast.success('Marked as replied');
            setSelected(null);
            load();
        } catch {
            toast.error('Failed to update');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this message?')) return;
        try {
            await api.delete(`/contact/${id}`);
            toast.success('Message deleted');
            setSelected(null);
            load();
        } catch {
            toast.error('Failed to delete');
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Contact Messages</h2>
                    <p>View and manage messages submitted through your contact form.</p>
                </div>
            </div>

            <div className="admin-table-wrap">
                {loading ? (
                    <p className="admin-empty">Loading...</p>
                ) : messages.length === 0 ? (
                    <p className="admin-empty">No messages yet.</p>
                ) : (
                    messages.map(m => (
                        <div key={m._id} className="admin-list-item" style={{ cursor: 'pointer' }} onClick={() => openMessage(m)}>
                            <div className="admin-list-thumb" style={{ background: 'var(--blue-600)' }}>
                                <FiMail size={18} />
                            </div>
                            <div className="admin-list-info">
                                <div className="admin-list-title">{m.name} <span className={`status-badge ${m.status}`} style={{ marginLeft: '0.5rem' }}>{m.status}</span></div>
                                <div className="admin-list-sub">{m.email} · {m.subject || 'No subject'}</div>
                            </div>
                            <div className="admin-list-actions">
                                <button className="admin-icon-btn danger" onClick={(e) => { e.stopPropagation(); handleDelete(m._id); }}>
                                    <FiTrash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selected && (
                <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>Message from {selected.name}</h3>
                            <button className="admin-modal-close" onClick={() => setSelected(null)}><FiX size={16} /></button>
                        </div>
                        <div className="admin-form-group">
                            <label>Email</label>
                            <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)' }}>{selected.email}</p>
                        </div>
                        {selected.phone && (
                            <div className="admin-form-group">
                                <label>Phone</label>
                                <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)' }}>{selected.phone}</p>
                            </div>
                        )}
                        <div className="admin-form-group">
                            <label>Subject</label>
                            <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)' }}>{selected.subject || 'No subject'}</p>
                        </div>
                        <div className="admin-form-group">
                            <label>Message</label>
                            <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)', lineHeight: 1.6 }}>{selected.message}</p>
                        </div>
                        <div className="admin-modal-actions">
                            <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(selected._id)}>Delete</button>
                            <a className="admin-btn admin-btn-outline" href={`mailto:${selected.email}`}>Reply via Email</a>
                            <button className="admin-btn admin-btn-primary" onClick={() => markReplied(selected._id)}>Mark Replied</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}