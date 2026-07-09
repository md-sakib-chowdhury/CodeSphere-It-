const mongoose = require('mongoose');

const blogPageSettingsSchema = new mongoose.Schema({
    bannerHeading: { type: String, default: 'Latest Articles' },
    bannerImage: { type: String, default: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80' },
    bannerImagePublicId: { type: String, default: '' },

    ctaLabel: { type: String, default: 'Our Recent Activities' },
    ctaHeading: { type: String, default: 'Latest Activities From Our Team' },
    ctaText: { type: String, default: 'Want to work with us on your next project?' },
    ctaButtonText: { type: String, default: 'Get In Touch' },
    ctaButtonLink: { type: String, default: '/contact' },
}, { timestamps: true });

module.exports = mongoose.model('BlogPageSettings', blogPageSettingsSchema);