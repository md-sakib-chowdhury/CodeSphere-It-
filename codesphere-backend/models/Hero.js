const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    badge: { type: String, default: 'Now accepting new projects' },
    heading: { type: String, default: 'We Build' },
    typedWords: [{ type: String }],
    subtext: { type: String },
    primaryBtn: { type: String, default: 'Start a project' },
    secondaryBtn: { type: String, default: 'View our work' },
    stats: [{
        number: String,
        label: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);