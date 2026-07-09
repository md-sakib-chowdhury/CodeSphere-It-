const router = require('express').Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
    try {
        const c = await Contact.create(req.body);

        // 1) Tomar email e notification jabe — notun message asche eta janar jonno
        sendEmail({
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: `New Contact Message from ${c.name}`,
            html: `
                <h2>Notun message eseche AMANAH IT website theke</h2>
                <p><strong>Name:</strong> ${c.name}</p>
                <p><strong>Email:</strong> ${c.email}</p>
                <p><strong>Phone:</strong> ${c.phone || 'N/A'}</p>
                <p><strong>Subject:</strong> ${c.subject || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${c.message}</p>
                <hr/>
                <p>Admin panel theke reply koro: <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin">Admin Panel</a></p>
            `,
        });

        // 2) Client ke auto-reply jabe — confirmation er jonno
        sendEmail({
            to: c.email,
            subject: 'Thank you for contacting AMANAH IT',
            html: `
                <h2>Dhonnobad, ${c.name}!</h2>
                <p>Amra tomar message peyechi. Amader team shighroi tomar sathe jogajog korbe.</p>
                <p><strong>Tomar message:</strong></p>
                <p style="color:#555;">${c.message}</p>
                <hr/>
                <p>AMANAH IT<br/>Dhaka, Bangladesh</p>
            `,
        });

        res.status(201).json({ message: 'Message sent!', id: c._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', protect, async (req, res) => {
    const msgs = await Contact.find().sort({ createdAt: -1 });
    res.json(msgs);
});

router.put('/:id', protect, async (req, res) => {
    const c = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
});

router.delete('/:id', protect, async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router;