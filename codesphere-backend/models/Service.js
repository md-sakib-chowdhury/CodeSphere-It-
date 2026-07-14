// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     icon: { type: String, required: true },
//     color: { type: String, default: '#2563eb' },
//     features: [{ type: String }],
//     order: { type: Number, default: 0 },
//     isActive: { type: Boolean, default: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Service', serviceSchema);
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true }, // notun — homepage/listing/details link korার jonno
    description: { type: String, required: true }, // homepage card + listing card + details hero e dekhay (short)
    body: { type: String }, // notun — shudhu details page er boro paragraph
    icon: { type: String, required: true },
    color: { type: String, default: '#2563eb' },
    image: { type: String }, // notun — details page hero background
    imagePublicId: { type: String }, // notun
    features: [{ type: String }], // homepage card + listing card + details "What's Included" — shob jaygায় ei ekই field
    stack: [{ type: String }], // notun — shudhu details page "Built With"
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

serviceSchema.pre('save', function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
    next();
});

module.exports = mongoose.model('Service', serviceSchema);