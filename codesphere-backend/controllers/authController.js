// const Admin = require('../models/Admin');
// const jwt = require('jsonwebtoken');

// const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// exports.checkSetup = async (req, res) => {
//     try {
//         const count = await Admin.countDocuments();
//         res.json({ setupRequired: count === 0 });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const admin = await Admin.findOne({ email });
//         if (!admin || !(await admin.matchPassword(password)))
//             return res.status(401).json({ message: 'Invalid credentials' });
//         res.json({ token: genToken(admin._id), name: admin.name, email: admin.email });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.register = async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const count = await Admin.countDocuments();
//         if (count > 0) return res.status(403).json({ message: 'Admin already set up. Contact existing admin.' });
//         const admin = await Admin.create({ name, email, password });
//         res.status(201).json({ token: genToken(admin._id), name: admin.name });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getMe = async (req, res) => {
//     const admin = await Admin.findById(req.user.id).select('-password');
//     res.json(admin);
// };
// const Admin = require('../models/Admin');
// const jwt = require('jsonwebtoken');

// const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// exports.checkSetup = async (req, res) => {
//     try {
//         const count = await Admin.countDocuments();
//         res.json({ setupRequired: count === 0 });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const admin = await Admin.findOne({ email });
//         if (!admin || !(await admin.matchPassword(password)))
//             return res.status(401).json({ message: 'Invalid credentials' });

//         if (!admin.isActive) {
//             return res.status(403).json({ message: 'Tomar account deactivate kora hoyeche. Super Admin er sathe jogajog koro.' });
//         }

//         res.json({
//             token: genToken(admin._id),
//             name: admin.name,
//             email: admin.email,
//             role: admin.role,
//             permissions: admin.permissions,
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Prothom bar (setup) e jei register korbe shei automatically Super Admin hobe.
// // Erpor eta locked hoye jabe — notun employee shudhu Super Admin `createEmployee` diye add korte parbe.
// exports.register = async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const count = await Admin.countDocuments();
//         if (count > 0) return res.status(403).json({ message: 'Admin already set up. Contact existing admin.' });

//         const admin = await Admin.create({ name, email, password, role: 'superadmin' });
//         res.status(201).json({
//             token: genToken(admin._id),
//             name: admin.name,
//             role: admin.role,
//         });
//     } catch (err) {
//         console.error('REGISTER ERROR:', err); // ← এই লাইনটা যোগ করুন
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getMe = async (req, res) => {
//     const admin = await Admin.findById(req.user.id || req.user._id).select('-password');
//     res.json(admin);
// };

// // ================== EMPLOYEE MANAGEMENT (Super Admin only) ==================

// // Notun employee (editor) account toiri kora
// exports.createEmployee = async (req, res) => {
//     const { name, email, password, permissions } = req.body;
//     try {
//         if (!name || !email || !password) {
//             return res.status(400).json({ message: 'Sob field pura koro' });
//         }

//         const existing = await Admin.findOne({ email });
//         if (existing) return res.status(400).json({ message: 'Ei email already ache' });

//         const employee = await Admin.create({
//             name,
//             email,
//             password,
//             role: 'editor',
//             permissions: permissions || undefined,
//             createdBy: req.user._id,
//         });

//         res.status(201).json({
//             message: 'Employee account toiri hoyeche',
//             employee: {
//                 _id: employee._id,
//                 name: employee.name,
//                 email: employee.email,
//                 role: employee.role,
//                 permissions: employee.permissions,
//                 isActive: employee.isActive,
//             },
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Shob employee er list dekha
// exports.getEmployees = async (req, res) => {
//     try {
//         const employees = await Admin.find({ role: 'editor' }).select('-password');
//         res.json(employees);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Employee activate/deactivate kora (login block/unblock)
// exports.deactivateEmployee = async (req, res) => {
//     try {
//         const employee = await Admin.findById(req.params.id);
//         if (!employee) return res.status(404).json({ message: 'Employee khuje pawa jayni' });
//         if (employee.role === 'superadmin') {
//             return res.status(400).json({ message: 'Super Admin ke deactivate kora jabe na' });
//         }

//         employee.isActive = !employee.isActive;
//         await employee.save();

//         res.json({
//             message: employee.isActive ? 'Employee account activate kora holo' : 'Employee account deactivate kora holo',
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Employee er permission update kora
// exports.updateEmployeePermissions = async (req, res) => {
//     try {
//         const { permissions } = req.body;
//         const employee = await Admin.findById(req.params.id);
//         if (!employee) return res.status(404).json({ message: 'Employee khuje pawa jayni' });

//         employee.permissions = { ...employee.permissions.toObject(), ...permissions };
//         await employee.save();

//         res.json({ message: 'Permissions update kora holo', permissions: employee.permissions });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.checkSetup = async (req, res) => {
    try {
        const count = await Admin.countDocuments();
        res.json({ setupRequired: count === 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });

        // ⚠️ TEMPORARY DEBUG — kaj hoye gele ei console.log line ta delete kore dio
        console.log('DEBUG login attempt:', {
            emailReceived: email,
            adminFound: !!admin,
            hasPasswordField: admin ? !!admin.password : 'n/a',
        });

        if (!admin || !(await admin.matchPassword(password)))
            return res.status(401).json({ message: 'Invalid credentials' });

        if (!admin.isActive) {
            return res.status(403).json({ message: 'Tomar account deactivate kora hoyeche. Super Admin er sathe jogajog koro.' });
        }

        res.json({
            token: genToken(admin._id),
            name: admin.name,
            email: admin.email,
            role: admin.role,
            permissions: admin.permissions,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Prothom bar (setup) e jei register korbe shei automatically Super Admin hobe.
// Erpor eta locked hoye jabe — notun employee shudhu Super Admin `createEmployee` diye add korte parbe.
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const count = await Admin.countDocuments();
        if (count > 0) return res.status(403).json({ message: 'Admin already set up. Contact existing admin.' });

        const admin = await Admin.create({ name, email, password, role: 'superadmin' });
        res.status(201).json({
            token: genToken(admin._id),
            name: admin.name,
            role: admin.role,
        });
    } catch (err) {
        console.error('REGISTER ERROR:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.getMe = async (req, res) => {
    const admin = await Admin.findById(req.user.id || req.user._id).select('-password');
    res.json(admin);
};

// ================== EMPLOYEE MANAGEMENT (Super Admin only) ==================

// Notun employee (editor) account toiri kora
exports.createEmployee = async (req, res) => {
    const { name, email, password, permissions } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Sob field pura koro' });
        }

        const existing = await Admin.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Ei email already ache' });

        const employee = await Admin.create({
            name,
            email,
            password,
            role: 'editor',
            permissions: permissions || undefined,
            createdBy: req.user._id,
        });

        res.status(201).json({
            message: 'Employee account toiri hoyeche',
            employee: {
                _id: employee._id,
                name: employee.name,
                email: employee.email,
                role: employee.role,
                permissions: employee.permissions,
                isActive: employee.isActive,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Shob employee er list dekha
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Admin.find({ role: 'editor' }).select('-password');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Employee activate/deactivate kora (login block/unblock)
exports.deactivateEmployee = async (req, res) => {
    try {
        const employee = await Admin.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee khuje pawa jayni' });
        if (employee.role === 'superadmin') {
            return res.status(400).json({ message: 'Super Admin ke deactivate kora jabe na' });
        }

        employee.isActive = !employee.isActive;
        await employee.save();

        res.json({
            message: employee.isActive ? 'Employee account activate kora holo' : 'Employee account deactivate kora holo',
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Employee er permission update kora
exports.updateEmployeePermissions = async (req, res) => {
    try {
        const { permissions } = req.body;
        const employee = await Admin.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee khuje pawa jayni' });

        employee.permissions = { ...employee.permissions.toObject(), ...permissions };
        await employee.save();

        res.json({ message: 'Permissions update kora holo', permissions: employee.permissions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};