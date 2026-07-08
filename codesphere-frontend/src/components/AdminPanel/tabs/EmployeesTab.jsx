// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { FiUserPlus, FiTrash2, FiToggleLeft, FiToggleRight, FiX } from 'react-icons/fi';
// import api from '../../../utils/api';
// import './EmployeesTab.css';

// const PERMISSION_LABELS = {
//     manageHero: 'Hero Section',
//     manageServices: 'Services',
//     managePortfolio: 'Portfolio',
//     manageTeam: 'Team',
//     manageTestimonials: 'Testimonials',
//     manageContactMessages: 'Contact Messages',
//     manageStats: 'Stats',
// };

// export default function EmployeesTab() {
//     const [employees, setEmployees] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showForm, setShowForm] = useState(false);
//     const [form, setForm] = useState({ name: '', email: '', password: '' });
//     const [permissions, setPermissions] = useState({
//         manageHero: false,
//         manageServices: false,
//         managePortfolio: false,
//         manageTeam: false,
//         manageTestimonials: true,
//         manageContactMessages: true,
//         manageStats: false,
//     });
//     const [submitting, setSubmitting] = useState(false);

//     const fetchEmployees = async () => {
//         try {
//             const { data } = await api.get('/auth/employees');
//             setEmployees(data);
//         } catch {
//             toast.error('Employee list load kora jayni');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchEmployees(); }, []);

//     const handleCreate = async (e) => {
//         e.preventDefault();
//         if (!form.name || !form.email || !form.password) {
//             toast.error('Sob field pura koro');
//             return;
//         }
//         setSubmitting(true);
//         try {
//             await api.post('/auth/employees', { ...form, permissions });
//             toast.success('Employee account toiri hoyeche');
//             setForm({ name: '', email: '', password: '' });
//             setShowForm(false);
//             fetchEmployees();
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Employee create kora jayni');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     const handleToggleActive = async (id) => {
//         try {
//             await api.put(`/auth/employees/${id}/deactivate`);
//             fetchEmployees();
//             toast.success('Status update hoyeche');
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Update kora jayni');
//         }
//     };

//     if (loading) return <div className="emp-loading">Loading...</div>;

//     return (
//         <div className="emp-tab">
//             <div className="emp-header">
//                 <div>
//                     <h2>Employee Management</h2>
//                     <p>Tomar team member der admin panel access dao ba control koro</p>
//                 </div>
//                 <button className="emp-add-btn" onClick={() => setShowForm(true)}>
//                     <FiUserPlus size={16} /> Notun Employee
//                 </button>
//             </div>

//             {employees.length === 0 ? (
//                 <div className="emp-empty">Kono employee add kora hoyni ekhono</div>
//             ) : (
//                 <div className="emp-list">
//                     {employees.map(emp => (
//                         <div key={emp._id} className={`emp-card ${!emp.isActive ? 'inactive' : ''}`}>
//                             <div className="emp-card-main">
//                                 <div className="emp-avatar">{emp.name[0].toUpperCase()}</div>
//                                 <div>
//                                     <p className="emp-name">{emp.name}</p>
//                                     <p className="emp-email">{emp.email}</p>
//                                     <div className="emp-perms">
//                                         {Object.entries(emp.permissions || {})
//                                             .filter(([key, val]) => val && PERMISSION_LABELS[key])
//                                             .map(([key]) => (
//                                                 <span key={key} className="emp-perm-chip">{PERMISSION_LABELS[key]}</span>
//                                             ))}
//                                     </div>
//                                 </div>
//                             </div>
//                             <button
//                                 className="emp-toggle-btn"
//                                 onClick={() => handleToggleActive(emp._id)}
//                                 title={emp.isActive ? 'Deactivate' : 'Activate'}
//                             >
//                                 {emp.isActive ? <FiToggleRight size={26} color="#22c55e" /> : <FiToggleLeft size={26} color="#ef4444" />}
//                                 <span>{emp.isActive ? 'Active' : 'Inactive'}</span>
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {showForm && (
//                 <div className="emp-modal-overlay" onClick={() => setShowForm(false)}>
//                     <div className="emp-modal" onClick={(e) => e.stopPropagation()}>
//                         <div className="emp-modal-header">
//                             <h3>Notun Employee Add Koro</h3>
//                             <button onClick={() => setShowForm(false)}><FiX size={20} /></button>
//                         </div>

//                         <form onSubmit={handleCreate} className="emp-form">
//                             <input
//                                 type="text"
//                                 placeholder="Naam"
//                                 value={form.name}
//                                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={form.email}
//                                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="Temporary Password"
//                                 value={form.password}
//                                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                             />

//                             <p className="emp-form-label">Ki ki access dibe:</p>
//                             <div className="emp-perm-grid">
//                                 {Object.entries(PERMISSION_LABELS).map(([key, label]) => (
//                                     <label key={key} className="emp-perm-check">
//                                         <input
//                                             type="checkbox"
//                                             checked={permissions[key]}
//                                             onChange={(e) => setPermissions({ ...permissions, [key]: e.target.checked })}
//                                         />
//                                         {label}
//                                     </label>
//                                 ))}
//                             </div>

//                             <button type="submit" className="emp-submit-btn" disabled={submitting}>
//                                 {submitting ? 'Toiri hocche...' : 'Account Toiri Koro'}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiUserPlus, FiTrash2, FiToggleLeft, FiToggleRight, FiX } from 'react-icons/fi';
import api from '../../../utils/api';
import './EmployeesTab.css';

const PERMISSION_LABELS = {
    manageNavbar: 'Navbar / Header',
    manageHero: 'Hero Section',
    manageServices: 'Services',
    managePortfolio: 'Portfolio',
    manageTeam: 'Team',
    manageTestimonials: 'Testimonials',
    manageContactMessages: 'Contact Messages',
    manageStats: 'Stats',
};

export default function EmployeesTab() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [permissions, setPermissions] = useState({
        manageNavbar: false,
        manageHero: false,
        manageServices: false,
        managePortfolio: false,
        manageTeam: false,
        manageTestimonials: true,
        manageContactMessages: true,
        manageStats: false,
    });
    const [submitting, setSubmitting] = useState(false);

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

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            toast.error('Sob field pura koro');
            return;
        }
        setSubmitting(true);
        try {
            await api.post('/auth/employees', { ...form, permissions });
            toast.success('Employee account toiri hoyeche');
            setForm({ name: '', email: '', password: '' });
            setShowForm(false);
            fetchEmployees();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Employee create kora jayni');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await api.put(`/auth/employees/${id}/deactivate`);
            fetchEmployees();
            toast.success('Status update hoyeche');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update kora jayni');
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
                    {employees.map(emp => (
                        <div key={emp._id} className={`emp-card ${!emp.isActive ? 'inactive' : ''}`}>
                            <div className="emp-card-main">
                                <div className="emp-avatar">{emp.name[0].toUpperCase()}</div>
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
                                onClick={() => handleToggleActive(emp._id)}
                                title={emp.isActive ? 'Deactivate' : 'Activate'}
                            >
                                {emp.isActive ? <FiToggleRight size={26} color="#22c55e" /> : <FiToggleLeft size={26} color="#ef4444" />}
                                <span>{emp.isActive ? 'Active' : 'Inactive'}</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="emp-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="emp-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="emp-modal-header">
                            <h3>Notun Employee Add Koro</h3>
                            <button onClick={() => setShowForm(false)}><FiX size={20} /></button>
                        </div>

                        <form onSubmit={handleCreate} className="emp-form">
                            <input
                                type="text"
                                placeholder="Naam"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Temporary Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />

                            <p className="emp-form-label">Ki ki access dibe:</p>
                            <div className="emp-perm-grid">
                                {Object.entries(PERMISSION_LABELS).map(([key, label]) => (
                                    <label key={key} className="emp-perm-check">
                                        <input
                                            type="checkbox"
                                            checked={permissions[key]}
                                            onChange={(e) => setPermissions({ ...permissions, [key]: e.target.checked })}
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