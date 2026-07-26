const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    caption: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);