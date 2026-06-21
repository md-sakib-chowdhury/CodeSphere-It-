import { createContext, useContext, useState } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(() => {
        const t = localStorage.getItem('csToken');
        return t ? { token: t } : null;
    });

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('csToken', data.token);
        setAdmin(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('csToken');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);