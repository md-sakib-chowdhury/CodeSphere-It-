const mongoose = require('mongoose');

const articlesPageSchema = new mongoose.Schema({
    bannerTitle: { type: String, default: 'Latest Articles' },
    breadcrumbCurrent: { type: String, default: 'Blog' },
    bannerImage: { type: String, default: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80' },
    bannerImagePublicId: { type: String, default: '' },

    cta: {
        label: { type: String, default: 'Our Recent Activities' },
        title: { type: String, default: 'Latest Activities From Our Team' },
        text: { type: String, default: 'Want to work with us on your next project?' },
        btnText: { type: String, default: 'Get In Touch' },
        btnLink: { type: String, default: '/contact' },
    },
}, { timestamps: true });

module.exports = mongoose.model('ArticlesPage', articlesPageSchema);