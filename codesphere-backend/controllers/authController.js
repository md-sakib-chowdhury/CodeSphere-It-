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
        if (!admin || !(await admin.matchPassword(password)))
            return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ token: genToken(admin._id), name: admin.name, email: admin.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const count = await Admin.countDocuments();
        if (count > 0) return res.status(403).json({ message: 'Admin already set up. Contact existing admin.' });
        const admin = await Admin.create({ name, email, password });
        res.status(201).json({ token: genToken(admin._id), name: admin.name });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMe = async (req, res) => {
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json(admin);
};