const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (normal password na)
    },
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: `"AMANAH IT" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        return true;
    } catch (err) {
        console.error('Email send failed:', err.message);
        return false;
    }
};

module.exports = sendEmail;