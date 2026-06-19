const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    imagePublicId: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
    tags: [{ type: String }],
    category: { type: String, enum: ['Web', 'E-commerce', 'SaaS', 'Mobile', 'Other'], default: 'Web' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);