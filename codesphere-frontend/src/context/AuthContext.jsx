// import { createContext, useContext, useState } from 'react';
// import api from '../utils/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [admin, setAdmin] = useState(() => {
//         const t = localStorage.getItem('csToken');
//         return t ? { token: t } : null;
//     });

//     const login = async (email, password) => {
//         const { data } = await api.post('/auth/login', { email, password });
//         localStorage.setItem('csToken', data.token);
//         setAdmin(data);
//         return data;
//     };

//     const logout = () => {
//         localStorage.removeItem('csToken');
//         setAdmin(null);
//     };

//     return (
//         <AuthContext.Provider value={{ admin, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // App load hole (refresh er por o) token thakle current admin data fetch kora
    useEffect(() => {
        const t = localStorage.getItem('csToken');
        if (!t) {
            setLoading(false);
            return;
        }

        api.get('/auth/me')
            .then(({ data }) => {
                setAdmin({ ...data, token: t });
            })
            .catch(() => {
                localStorage.removeItem('csToken');
                setAdmin(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('csToken', data.token);
        setAdmin(data); // { token, name, email, role, permissions }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('csToken');
        setAdmin(null);
    };

    // Helper: eita permission check korar jonno component gula te use hobe
    const can = (permissionKey) => {
        if (!admin) return false;
        if (admin.role === 'superadmin') return true;
        return !!admin.permissions?.[permissionKey];
    };

    const isSuperAdmin = admin?.role === 'superadmin';

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading, can, isSuperAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);