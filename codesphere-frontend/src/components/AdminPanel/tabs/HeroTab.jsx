import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

export default function HeroTab() {
    const [data, setData] = useState({
        badge: '', heading: '', subtext: '', typedWords: [], stats: []
    });
    const [wordInput, setWordInput] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/hero').then(r => setData(r.data)).catch(() => { });
    }, []);

    const addWord = () => {
        if (!wordInput.trim()) return;
        setData({ ...data, typedWords: [...(data.typedWords || []), wordInput.trim()] });
        setWordInput('');
    };

    const removeWord = (idx) => {
        setData({ ...data, typedWords: data.typedWords.filter((_, i) => i !== idx) });
    };

    const updateStat = (idx, field, value) => {
        const stats = [...data.stats];
        stats[idx][field] = value;
        setData({ ...data, stats });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/hero', data);
            toast.success('Hero section updated!');
        } catch {
            toast.error('Failed to update hero section');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Hero Section</h2>
                    <p>Edit your homepage hero banner content and animated text.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <FiSave size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-form-group">
                    <label>Badge Text</label>
                    <input
                        value={data.badge || ''}
                        onChange={e => setData({ ...data, badge: e.target.value })}
                        placeholder="Now accepting new projects"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Heading (static part)</label>
                    <input
                        value={data.heading || ''}
                        onChange={e => setData({ ...data, heading: e.target.value })}
                        placeholder="We Build"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Subtext</label>
                    <textarea
                        rows="3"
                        value={data.subtext || ''}
                        onChange={e => setData({ ...data, subtext: e.target.value })}
                        placeholder="AMANAH IT delivers..."
                    />
                </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Animated Typewriter Words
                </h3>
                <div className="admin-form-inline-edit" style={{ marginBottom: '0.75rem' }}>
                    <input
                        value={wordInput}
                        onChange={e => setWordInput(e.target.value)}
                        placeholder="e.g. SaaS Platforms"
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addWord())}
                    />
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={addWord}>
                        <FiPlus size={14} /> Add
                    </button>
                </div>
                <div className="admin-tags-input">
                    {(data.typedWords || []).map((w, i) => (
                        <span key={i} className="admin-tag-chip">
                            {w}
                            <button onClick={() => removeWord(i)}><FiX size={12} /></button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
                    Stats Bar (bottom of hero)
                </h3>
                {(data.stats || []).map((s, i) => (
                    <div key={i} className="admin-form-row" style={{ marginBottom: '0.5rem' }}>
                        <div className="admin-form-group">
                            <label>Number</label>
                            <input value={s.number} onChange={e => updateStat(i, 'number', e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                            <label>Label</label>
                            <input value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}