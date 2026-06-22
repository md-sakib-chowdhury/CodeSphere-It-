import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import api from '../utils/api'
import AdminPanel from '../components/AdminPanel/AdminPanel'
import './AdminLogin.css'

export default function AdminLogin() {
    const [checking, setChecking] = useState(true)
    const [setupRequired, setSetupRequired] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const { login, admin } = useAuth()

    useEffect(() => {
        if (admin) { setChecking(false); return }
        api.get('/auth/check-setup')
            .then(r => setSetupRequired(r.data.setupRequired))
            .catch(() => { })
            .finally(() => setChecking(false))
    }, [admin])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(form.email, form.password)
            toast.success('Welcome back!')
        } catch {
            toast.error('Invalid credentials!')
        } finally {
            setLoading(false)
        }
    }

    const handleSetup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/auth/register', form)
            toast.success('Admin account created! Please log in.')
            setSetupRequired(false)
            setForm({ name: '', email: '', password: '' })
        } catch (err) {
            toast.error(err.response?.data?.message || 'Setup failed')
        } finally {
            setLoading(false)
        }
    }

    if (admin) return <AdminPanel />

    if (checking) {
        return <div className="admin-login"><p>Loading...</p></div>
    }

    if (setupRequired) {
        return (
            <div className="admin-login">
                <div className="login-card">
                    <div className="login-logo"><span>AMANAH IT</span></div>
                    <h2>First-Time Setup</h2>
                    <p>No admin account exists yet. Create the first admin account to manage your website.</p>
                    <form onSubmit={handleSetup}>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                placeholder="Sakib Chowdhury"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="admin@amanahit.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Min. 6 characters"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Admin Account'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-login">
            <div className="login-card">
                <div className="login-logo"><span>AMANAH IT</span></div>
                <h2>Admin Login</h2>
                <p>Sign in to manage your website</p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="admin@amanahit.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}