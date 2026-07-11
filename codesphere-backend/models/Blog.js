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

// Synchronous middleware — no 'next' parameter needed, Mongoose detects
// this automatically. This avoids the "next is not a function" error
// that some Mongoose versions throw with the old callback style.
blogSchema.pre('save', function () {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
});

module.exports = mongoose.model('Blog', blogSchema);