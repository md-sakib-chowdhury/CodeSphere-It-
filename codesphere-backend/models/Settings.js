const mongoose = require('mongoose');

// Ekta shingle document-e shob site-wide settings rakha hobe (singleton pattern)
const settingsSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true, default: 'site-settings' },
    galleryBannerImage: { type: String, default: '' },
    galleryBannerImagePublicId: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);