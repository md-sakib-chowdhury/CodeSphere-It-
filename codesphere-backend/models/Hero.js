const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    badge: { type: String, default: 'Now accepting new projects' },
    heading: { type: String, default: 'We Build' },
    typedWords: [{ type: String }],
    subtext: { type: String },
    primaryBtn: { type: String, default: 'What We Serve' },
    primaryBtnLink: { type: String, default: '/services/web-application-development' },
    secondaryBtn: { type: String, default: 'Learn More' },
    secondaryBtnLink: { type: String, default: '/explore-us' },
    stats: [{
        number: String,
        label: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);