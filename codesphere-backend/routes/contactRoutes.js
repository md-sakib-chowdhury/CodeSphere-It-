// const router = require('express').Router();
// const Contact = require('../models/Contact');
// const { protect } = require('../middleware/authMiddleware');
// const sendEmail = require('../utils/sendEmail');

// router.post('/', async (req, res) => {
//     try {
//         const c = await Contact.create(req.body);

//         // 1) Tomar email e notification jabe — notun message asche eta janar jonno
//         sendEmail({
//             to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
//             subject: `New Contact Message from ${c.name}`,
//             html: `
//                 <h2>New message received from AMANAH IT website</h2>
//                 <p><strong>Name:</strong> ${c.name}</p>
//                 <p><strong>Email:</strong> ${c.email}</p>
//                 <p><strong>Phone:</strong> ${c.phone || 'N/A'}</p>
//                 <p><strong>Subject:</strong> ${c.subject || 'N/A'}</p>
//                 <p><strong>Message:</strong></p>
//                 <p>${c.message}</p>
//                 <hr/>
//                 <p>Reply from the admin panel: <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin">Admin Panel</a></p>
//             `,
//         });

//         // 2) Client ke auto-reply jabe — confirmation er jonno
//         sendEmail({
//             to: c.email,
//             subject: 'Thank you for contacting AMANAH IT',
//             html: `
//                 <h2>Thank you, ${c.name}!</h2>
//                 <p>We've received your message and appreciate you reaching out to AMANAH IT.</p>
//                 <p>Our team will review your inquiry and get back to you as soon as possible, usually within 24 hours.</p>
//                 <p><strong>Your message:</strong></p>
//                 <p style="color:#555;">${c.message}</p>
//                 <hr/>
//                 <p>Best regards,<br/>
//                 <strong>AMANAH IT Team</strong><br/>
//                 Dhaka, Bangladesh</p>
//             `,
//         });

//         res.status(201).json({ message: 'Message sent!', id: c._id });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// router.get('/', protect, async (req, res) => {
//     const msgs = await Contact.find().sort({ createdAt: -1 });
//     res.json(msgs);
// });

// router.put('/:id', protect, async (req, res) => {
//     const c = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(c);
// });

// router.delete('/:id', protect, async (req, res) => {
//     await Contact.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted' });
// });

// module.exports = router;
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
                <h2>New message received from AMANAH IT website</h2>
                <p><strong>Name:</strong> ${c.name}</p>
                <p><strong>Email:</strong> ${c.email}</p>
                <p><strong>Phone:</strong> ${c.phone || 'N/A'}</p>
                <p><strong>Company:</strong> ${c.companyName || 'N/A'}</p>
                <p><strong>Company Address:</strong> ${c.companyAddress || 'N/A'}</p>
                <p><strong>Official Website:</strong> ${c.officialWebsite || 'N/A'}</p>
                <p><strong>Number of Employees:</strong> ${c.numberOfEmployee || 'N/A'}</p>
                <p><strong>Preferred Communication:</strong> ${c.communicationPreference || 'N/A'}</p>
                <p><strong>Service Type:</strong> ${c.subject || 'N/A'}</p>
                <p><strong>I am:</strong> ${c.iAm || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${c.message}</p>
                <hr/>
                <p>Reply from the admin panel: <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin">Admin Panel</a></p>
            `,
        });

        // 2) Client ke auto-reply jabe — confirmation er jonno
        sendEmail({
            to: c.email,
            subject: 'Thank you for contacting AMANAH IT',
            html: `
                <h2>Thank you, ${c.name}!</h2>
                <p>We've received your message and appreciate you reaching out to AMANAH IT.</p>
                <p>Our team will review your inquiry and get back to you as soon as possible, usually within 24 hours.</p>
                <p><strong>Your message:</strong></p>
                <p style="color:#555;">${c.message}</p>
                <hr/>
                <p>Best regards,<br/>
                <strong>AMANAH IT Team</strong><br/>
                Dhaka, Bangladesh</p>
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