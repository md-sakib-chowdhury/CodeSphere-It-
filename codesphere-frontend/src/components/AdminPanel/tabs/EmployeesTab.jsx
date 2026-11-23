import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiUserPlus, FiToggleLeft, FiToggleRight, FiX } from 'react-icons/fi';
import api from '../../../utils/api';
import './EmployeesTab.css';

const PERMISSION_LABELS = {
    manageNavbar: 'Navbar / Header',
    manageFooter: 'Footer',
    manageHomeSections: 'Homepage Sections',
    manageExploreUs: 'Explore Us Page',
    manageArticlesPage: 'Latest Articles Page',
    manageContactPage: 'Contact Page',
    manageHero: 'Hero Section',
    manageServices: 'Services',
    managePortfolio: 'Portfolio',
    manageTeam: 'Team',
    manageTestimonials: 'Testimonials',
    manageContactMessages: 'Contact Messages',
    manageStats: 'Stats',
};

// Permissions switched on by default for a new employee.
// Everything else starts off. Because this is built from PERMISSION_LABELS,
// adding a new permission above never needs a second edit here.
const DEFAULT_ON = ['manageTestimonials', 'manageContactMessages'];

const buildDefaultPermissions = () =>
    Object.fromEntries(Object.keys(PERMISSION_LABELS).map((key) => [key, DEFAULT_ON.includes(key)]));

const EMPTY_FORM = { name: '', email: '', password: '' };

export default function EmployeesTab() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [permissions, setPermissions] = useState(buildDefaultPermissions);
    const [submitting, setSubmitting] = useState(false);
    const [togglingId, setTogglingId] = useState('');

    const fetchEmployees = async () => {
        try {
            const { data } = await api.get('/auth/employees');
            setEmployees(data);
        } catch {
            toast.error('Employee list load kora jayni');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEmployees(); }, []);

    // Closing the form also clears it, so a half-typed password never stays in memory
    const closeForm = useCallback(() => {
        if (submitting) return;
        setShowForm(false);
        setForm(EMPTY_FORM);
        setPermissions(buildDefaultPermissions());
    }, [submitting]);

    // Esc closes the modal; the page behind it does not scroll while it is open
    useEffect(() => {
        if (!showForm) return;

        const onKey = (e) => e.key === 'Escape' && closeForm();
        window.addEventListener('keydown', onKey);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [showForm, closeForm]);

    const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

    const handleCreate = async (e) => {
        e.preventDefault();

        const payload = { ...form, name: form.name.trim(), email: form.email.trim() };
        if (!payload.name || !payload.email || !payload.password) {
            toast.error('Sob field pura koro');
            return;
        }

        setSubmitting(true);
        try {
            await api.post('/auth/employees', { ...payload, permissions });
            toast.success('Employee account toiri hoyeche');
            setShowForm(false);
            setForm(EMPTY_FORM);
            setPermissions(buildDefaultPermissions());
            fetchEmployees();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Employee create kora jayni');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleActive = async (emp) => {
        // turning someone off locks them out of the panel, so ask first
        if (emp.isActive && !window.confirm(`Deactivate ${emp.name}? They will lose admin panel access.`)) return;

        setTogglingId(emp._id);
        try {
            await api.put(`/auth/employees/${emp._id}/deactivate`);
            await fetchEmployees();
            toast.success('Status update hoyeche');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update kora jayni');
        } finally {
            setTogglingId('');
        }
    };

    if (loading) return <div className="emp-loading">Loading...</div>;

    return (
        <div className="emp-tab">
            <div className="emp-header">
                <div>
                    <h2>Employee Management</h2>
                    <p>Tomar team member der admin panel access dao ba control koro</p>
                </div>
                <button className="emp-add-btn" onClick={() => setShowForm(true)}>
                    <FiUserPlus size={16} /> Notun Employee
                </button>
            </div>

            {employees.length === 0 ? (
                <div className="emp-empty">Kono employee add kora hoyni ekhono</div>
            ) : (
                <div className="emp-list">
                    {employees.map((emp) => (
                        <div key={emp._id} className={`emp-card ${!emp.isActive ? 'inactive' : ''}`}>
                            <div className="emp-card-main">
                                <div className="emp-avatar">{(emp.name || '?')[0].toUpperCase()}</div>
                                <div>
                                    <p className="emp-name">{emp.name}</p>
                                    <p className="emp-email">{emp.email}</p>
                                    <div className="emp-perms">
                                        {Object.entries(emp.permissions || {})
                                            .filter(([key, val]) => val && PERMISSION_LABELS[key])
                                            .map(([key]) => (
                                                <span key={key} className="emp-perm-chip">{PERMISSION_LABELS[key]}</span>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="emp-toggle-btn"
                                onClick={() => handleToggleActive(emp)}
                                disabled={togglingId === emp._id}
                                title={emp.isActive ? 'Deactivate' : 'Activate'}
                                aria-label={`${emp.isActive ? 'Deactivate' : 'Activate'} ${emp.name}`}
                            >
                                {emp.isActive
                                    ? <FiToggleRight size={26} color="#22c55e" />
                                    : <FiToggleLeft size={26} color="#ef4444" />}
                                <span>{emp.isActive ? 'Active' : 'Inactive'}</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="emp-modal-overlay" onClick={closeForm}>
                    <div
                        className="emp-modal"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="emp-modal-title"
                    >
                        <div className="emp-modal-header">
                            <h3 id="emp-modal-title">Notun Employee Add Koro</h3>
                            <button type="button" onClick={closeForm} aria-label="Close"><FiX size={20} /></button>
                        </div>

                        <form onSubmit={handleCreate} className="emp-form">
                            <input
                                type="text"
                                placeholder="Naam"
                                aria-label="Name"
                                autoFocus
                                autoComplete="off"
                                value={form.name}
                                onChange={(e) => setField('name', e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                aria-label="Email"
                                autoComplete="off"
                                value={form.email}
                                onChange={(e) => setField('email', e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Temporary Password"
                                aria-label="Temporary password"
                                autoComplete="new-password"
                                minLength={8}
                                value={form.password}
                                onChange={(e) => setField('password', e.target.value)}
                            />

                            <p className="emp-form-label">Ki ki access dibe:</p>
                            <div className="emp-perm-grid">
                                {Object.entries(PERMISSION_LABELS).map(([key, label]) => (
                                    <label key={key} className="emp-perm-check">
                                        <input
                                            type="checkbox"
                                            checked={!!permissions[key]}
                                            onChange={(e) => setPermissions((p) => ({ ...p, [key]: e.target.checked }))}
                                        />
                                        {label}
                                    </label>
                                ))}
                            </div>

                            <button type="submit" className="emp-submit-btn" disabled={submitting}>
                                {submitting ? 'Toiri hocche...' : 'Account Toiri Koro'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}