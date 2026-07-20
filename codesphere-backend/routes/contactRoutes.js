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
//                 <p><strong>Company:</strong> ${c.companyName || 'N/A'}</p>
//                 <p><strong>Company Address:</strong> ${c.companyAddress || 'N/A'}</p>
//                 <p><strong>Official Website:</strong> ${c.officialWebsite || 'N/A'}</p>
//                 <p><strong>Number of Employees:</strong> ${c.numberOfEmployee || 'N/A'}</p>
//                 <p><strong>Preferred Communication:</strong> ${c.communicationPreference || 'N/A'}</p>
//                 <p><strong>Service Type:</strong> ${c.subject || 'N/A'}</p>
//                 <p><strong>I am:</strong> ${c.iAm || 'N/A'}</p>
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

const LOGO_URL = process.env.LOGO_URL || 'https://res.cloudinary.com/dbu0whuki/image/upload/v1784428074/file_00000000175c72078f800e40c1f2858e_ugvkqw.png';
const SITE_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Shared email wrapper — logo header, navy/blue brand color, footer soho
const emailWrapper = (bodyHtml) => `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
    <div style="background: #ffffff; padding: 28px 24px; text-align: center; border-bottom: 3px solid #0a1628;">
        <img src="${LOGO_URL}" alt="AMANAH IT" style="max-width: 240px; height: auto; display: inline-block;" />
    </div>

    <div style="padding: 32px 28px; color: #1e293b;">
        ${bodyHtml}
    </div>

    <div style="background: #f8fafc; padding: 24px 28px; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;">
            <strong style="color: #0a1628;">AMANAH IT</strong>
            <span style="color: #2563eb; letter-spacing: 1px; text-transform: uppercase; font-size: 11px;"> — Trust • Innovate • Deliver</span>
        </p>
        <p style="margin: 0 0 12px; font-size: 13px; color: #64748b;">
            Dhaka, Bangladesh &nbsp;|&nbsp; <a href="mailto:info@amanahit.com" style="color: #2563eb; text-decoration: none;">info@amanahit.com</a>
        </p>
        <p style="margin: 0; font-size: 11px; color: #94a3b8;">
            This is an automated message from the AMANAH IT website contact form.
        </p>
    </div>
</div>
`;

router.post('/', async (req, res) => {
    try {
        const c = await Contact.create(req.body);

        // 1) Tomar email e notification jabe — notun message asche eta janar jonno
        const adminBody = `
            <h2 style="margin: 0 0 20px; color: #0a1628; font-size: 20px;">📩 New Contact Message</h2>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 160px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #0a1628;">${c.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;">${c.email}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0;">${c.phone || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Company</td><td style="padding: 8px 0;">${c.companyName || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Company Address</td><td style="padding: 8px 0;">${c.companyAddress || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Official Website</td><td style="padding: 8px 0;">${c.officialWebsite || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Number of Employees</td><td style="padding: 8px 0;">${c.numberOfEmployee || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Preferred Communication</td><td style="padding: 8px 0;">${c.communicationPreference || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Service Type</td><td style="padding: 8px 0;">${c.subject || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">I am</td><td style="padding: 8px 0;">${c.iAm || 'N/A'}</td></tr>
            </table>

            <div style="margin-top: 16px; padding: 16px; background: #f1f5f9; border-radius: 8px;">
                <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Message</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6;">${c.message}</p>
            </div>

            <a href="${SITE_URL}/admin" style="display: inline-block; margin-top: 24px; padding: 12px 28px; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 6px; font-size: 14px;">
                Reply from Admin Panel
            </a>
        `;

        sendEmail({
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: `New Contact Message from ${c.name}`,
            html: emailWrapper(adminBody),
        });

        // 2) Client ke auto-reply jabe — confirmation er jonno
        const clientBody = `
            <h2 style="margin: 0 0 16px; color: #0a1628; font-size: 22px;">Thank you, ${c.name}!</h2>

            <p style="font-size: 15px; line-height: 1.7; color: #334155;">
                We've received your message and appreciate you reaching out to AMANAH IT.
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #334155;">
                Our team will review your inquiry and get back to you as soon as possible, usually within <strong style="color: #2563eb;">24 hours</strong>.
            </p>

            <div style="margin-top: 20px; padding: 16px; background: #f1f5f9; border-left: 3px solid #2563eb; border-radius: 4px;">
                <p style="margin: 0 0 6px; font-size: 13px; color: #64748b; font-weight: 600;">Your message</p>
                <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">${c.message}</p>
            </div>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 4px; font-size: 14px; color: #64748b;">Best regards,</p>
                <p style="margin: 0 0 4px; font-size: 17px; font-weight: 700; color: #0a1628; letter-spacing: 0.3px;">AMANAH IT Team</p>
                <p style="margin: 0; font-size: 12px; color: #2563eb; letter-spacing: 1px; text-transform: uppercase;">Trust • Innovate • Deliver</p>
            </div>
        `;

        sendEmail({
            to: c.email,
            subject: 'Thank you for contacting AMANAH IT',
            html: emailWrapper(clientBody),
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