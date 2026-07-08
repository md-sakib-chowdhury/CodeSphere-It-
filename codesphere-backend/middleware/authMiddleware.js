// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Not authorized' });
//     try {
//         req.user = jwt.verify(token, process.env.JWT_SECRET);
//         next();
//     } catch {
//         res.status(401).json({ message: 'Token invalid' });
//     }
// };

// module.exports = { protect };
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Token verify kore, DB theke fresh admin data niye ashe (role/isActive change hoyeche kina check korar jonno)
const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin) return res.status(401).json({ message: 'Not authorized' });

        if (!admin.isActive) {
            return res.status(403).json({ message: 'Tomar account deactivate kora hoyeche. Super Admin er sathe jogajog koro.' });
        }

        req.user = admin; // ekhon req.user te full admin doc thakbe (id, role, permissions soho)
        next();
    } catch {
        res.status(401).json({ message: 'Token invalid' });
    }
};

// Shudhu Super Admin er jonno route protect kora
const superAdminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'superadmin') {
        return next();
    }
    return res.status(403).json({ message: 'Eta korar permission tomar nei. Shudhu Super Admin korte parbe.' });
};

// Specific permission check kora (employee/editor der jonno)
// Usage: checkPermission('managePortfolio')
const checkPermission = (permissionName) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: 'Not authorized' });

        if (req.user.role === 'superadmin') return next(); // superadmin er shob permission ache

        if (req.user.permissions && req.user.permissions[permissionName]) {
            return next();
        }

        return res.status(403).json({ message: 'Eta change korar permission tomar nei.' });
    };
};

module.exports = { protect, superAdminOnly, checkPermission };