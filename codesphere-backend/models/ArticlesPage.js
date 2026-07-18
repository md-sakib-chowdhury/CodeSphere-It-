const mongoose = require('mongoose');

const articlesPageSchema = new mongoose.Schema({
    bannerTitle: { type: String, default: 'Latest Articles' },
    breadcrumbCurrent: { type: String, default: 'Blog' },

    cta: {
        label: { type: String, default: 'Our Recent Activities' },
        title: { type: String, default: 'Latest Activities From Our Team' },
        text: { type: String, default: 'Want to work with us on your next project?' },
        btnText: { type: String, default: 'Get In Touch' },
        btnLink: { type: String, default: '/contact' },
    },
}, { timestamps: true });

module.exports = mongoose.model('ArticlesPage', articlesPageSchema);