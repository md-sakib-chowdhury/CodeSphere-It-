const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    image: { type: String },
    imagePublicId: { type: String },
    tags: [{ type: String }],
    author: { type: String, default: 'CodeSphere IT' },
    published: { type: Boolean, default: false },
}, { timestamps: true });

blogSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);