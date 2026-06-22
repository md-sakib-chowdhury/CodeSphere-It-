import { useState, useEffect } from 'react';
import { FiUsers, FiBriefcase, FiAward, FiHeart, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

export default function StatsTab() {
    const [stats, setStats] = useState({ clients: 0, projects: 0, experience: 0, satisfaction: 0 });
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        Promise.all([
            api.get('/stats'),
            api.get('/contact'),
        ]).then(([s, c]) => {
            setStats(s.data);
            setMessages(c.data);
        }).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => setStats({ ...stats, [e.target.name]: Number(e.target.value) });

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/stats', stats);
            toast.success('Stats updated successfully!');
        } catch {
            toast.error('Failed to update stats');
        } finally {
            setSaving(false);
        }
    };

    const newMsgCount = messages.filter(m => m.status === 'new').length;

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Dashboard Overview</h2>
                    <p>Manage your website's key statistics and see recent activity.</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card-admin">
                    <div className="stat-card-admin-icon" style={{ background: 'var(--blue-50)', color: 'var(--blue-600)' }}>
                        <FiUsers size={20} />
                    </div>
                    <div className="stat-card-admin-value">{stats.clients}+</div>
                    <div className="stat-card-admin-label">Happy Clients</div>
                </div>
                <div className="stat-card-admin">
                    <div className="stat-card-admin-icon" style={{ background: 'var(--green-50)', color: 'var(--green-600)' }}>
                        <FiBriefcase size={20} />
                    </div>
                    <div className="stat-card-admin-value">{stats.projects}+</div>
                    <div className="stat-card-admin-label">Projects Done</div>
                </div>
                <div className="stat-card-admin">
                    <div className="stat-card-admin-icon" style={{ background: 'var(--blue-50)', color: 'var(--blue-600)' }}>
                        <FiAward size={20} />
                    </div>
                    <div className="stat-card-admin-value">{stats.experience}+</div>
                    <div className="stat-card-admin-label">Years Experience</div>
                </div>
                <div className="stat-card-admin">
                    <div className="stat-card-admin-icon" style={{ background: 'var(--green-50)', color: 'var(--green-600)' }}>
                        <FiHeart size={20} />
                    </div>
                    <div className="stat-card-admin-value">{stats.satisfaction}%</div>
                    <div className="stat-card-admin-label">Satisfaction Rate</div>
                </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--gray-900)' }}>
                    Edit Homepage Stats
                </h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Happy Clients</label>
                        <input type="number" name="clients" value={stats.clients} onChange={handleChange} />
                    </div>
                    <div className="admin-form-group">
                        <label>Projects Done</label>
                        <input type="number" name="projects" value={stats.projects} onChange={handleChange} />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Years Experience</label>
                        <input type="number" name="experience" value={stats.experience} onChange={handleChange} />
                    </div>
                    <div className="admin-form-group">
                        <label>Satisfaction Rate (%)</label>
                        <input type="number" name="satisfaction" value={stats.satisfaction} onChange={handleChange} />
                    </div>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Stats'}
                </button>
            </div>

            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--gray-900)' }}>
                    Recent Contact Messages {newMsgCount > 0 && <span style={{ color: 'var(--blue-600)' }}>({newMsgCount} new)</span>}
                </h3>
                {messages.length === 0 ? (
                    <p className="admin-empty">No messages yet</p>
                ) : (
                    <div style={{ marginTop: '1rem' }}>
                        {messages.slice(0, 5).map(m => (
                            <div key={m._id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--gray-100)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{ fontSize: '0.85rem', color: 'var(--gray-900)' }}>{m.name}</strong>
                                    <span className={`status-badge ${m.status}`}>{m.status}</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '2px' }}>{m.email}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}