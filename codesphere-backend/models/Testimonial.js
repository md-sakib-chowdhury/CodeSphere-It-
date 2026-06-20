const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String },
    image: { type: String },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    message: { type: String, required: true },
    country: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);