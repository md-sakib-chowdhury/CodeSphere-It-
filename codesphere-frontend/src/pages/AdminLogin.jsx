import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import './AdminLogin.css'

export default function AdminLogin() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const { login, admin } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
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

    if (admin) {
        return (
            <div className="admin-login">
                <div className="login-card">
                    <h2>You're logged in!</h2>
                    <p>Admin dashboard coming soon...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-login">
            <div className="login-card">
                <div className="login-logo">
                    <span>AMANAH IT</span>
                </div>
                <h2>Admin Login</h2>
                <p>Sign in to manage your website</p>
                <form onSubmit={handleSubmit}>
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