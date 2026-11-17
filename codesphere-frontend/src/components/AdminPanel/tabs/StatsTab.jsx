import { useState, useEffect } from 'react';
import { FiUsers, FiBriefcase, FiAward, FiHeart, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

// One place that describes every stat: label, icon, color, suffix, input rules.
// The cards and the edit form below are both built from this list.
const STAT_FIELDS = [
    { key: 'clients', label: 'Happy Clients', formLabel: 'Happy Clients', icon: FiUsers, tone: 'blue', suffix: '+' },
    { key: 'projects', label: 'Projects Done', formLabel: 'Projects Done', icon: FiBriefcase, tone: 'green', suffix: '+' },
    { key: 'experience', label: 'Years Experience', formLabel: 'Years Experience', icon: FiAward, tone: 'blue', suffix: '+' },
    { key: 'satisfaction', label: 'Satisfaction Rate', formLabel: 'Satisfaction Rate (%)', icon: FiHeart, tone: 'green', suffix: '%', max: 100 },
];

const EMPTY_STATS = { clients: 0, projects: 0, experience: 0, satisfaction: 0 };

export default function StatsTab() {
    const [stats, setStats] = useState(EMPTY_STATS);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let active = true;

        // allSettled: if the messages request fails, the stats still load
        Promise.allSettled([api.get('/stats'), api.get('/contact')])
            .then(([statsRes, contactRes]) => {
                if (!active) return;

                if (statsRes.status === 'fulfilled') {
                    setStats({ ...EMPTY_STATS, ...statsRes.value.data });
                } else {
                    toast.error('Could not load stats');
                }

                if (contactRes.status === 'fulfilled') {
                    setMessages(Array.isArray(contactRes.value.data) ? contactRes.value.data : []);
                }
            })
            .finally(() => active && setLoading(false));

        return () => {
            active = false;
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const field = STAT_FIELDS.find((f) => f.key === name);

        // keep values as whole numbers, never negative, and within the field's max
        let next = Math.max(0, Math.floor(Number(value) || 0));
        if (field?.max !== undefined) next = Math.min(next, field.max);

        setStats((prev) => ({ ...prev, [name]: next }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
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

    const newMsgCount = messages.filter((m) => m.status === 'new').length;

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Dashboard Overview</h2>
                    <p>Manage your website's key statistics and see recent activity.</p>
                </div>
            </div>

            <div className="stats-grid">
                {STAT_FIELDS.map(({ key, label, icon: Icon, tone, suffix }) => (
                    <div className="stat-card-admin" key={key}>
                        <div
                            className="stat-card-admin-icon"
                            style={{ background: `var(--${tone}-50)`, color: `var(--${tone}-600)` }}
                        >
                            <Icon size={20} />
                        </div>
                        <div className="stat-card-admin-value">
                            {loading ? '—' : `${stats[key]}${suffix}`}
                        </div>
                        <div className="stat-card-admin-label">{label}</div>
                    </div>
                ))}
            </div>

            <form className="admin-card" style={{ marginBottom: '1.5rem' }} onSubmit={handleSave}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--gray-900)' }}>
                    Edit Homepage Stats
                </h3>

                {/* two fields per row, same layout as before */}
                {[STAT_FIELDS.slice(0, 2), STAT_FIELDS.slice(2, 4)].map((row, i) => (
                    <div className="admin-form-row" key={i}>
                        {row.map(({ key, formLabel, max }) => (
                            <div className="admin-form-group" key={key}>
                                <label htmlFor={`stat-${key}`}>{formLabel}</label>
                                <input
                                    id={`stat-${key}`}
                                    type="number"
                                    name={key}
                                    min="0"
                                    max={max}
                                    step="1"
                                    inputMode="numeric"
                                    value={stats[key]}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        ))}
                    </div>
                ))}

                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || loading}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Stats'}
                </button>
            </form>

            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--gray-900)' }}>
                    Recent Contact Messages{' '}
                    {newMsgCount > 0 && <span style={{ color: 'var(--blue-600)' }}>({newMsgCount} new)</span>}
                </h3>

                {loading ? (
                    <p className="admin-empty">Loading…</p>
                ) : messages.length === 0 ? (
                    <p className="admin-empty">No messages yet</p>
                ) : (
                    <div style={{ marginTop: '1rem' }}>
                        {messages.slice(0, 5).map((m) => (
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