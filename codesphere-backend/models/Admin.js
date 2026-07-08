// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const adminSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, default: 'admin' },
// }, { timestamps: true });

// adminSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// adminSchema.methods.matchPassword = async function (entered) {
//     return bcrypt.compare(entered, this.password);
// };

// module.exports = mongoose.model('Admin', adminSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'editor' },

    // Editor (employee) der jonno permission control — Super Admin er shob shomoy full access
    permissions: {
        manageBlog: { type: Boolean, default: true },
        manageTestimonials: { type: Boolean, default: true },
        manageContactMessages: { type: Boolean, default: true },
        manageHero: { type: Boolean, default: false },
        manageNavbar: { type: Boolean, default: false },
        managePortfolio: { type: Boolean, default: false },
        manageServices: { type: Boolean, default: false },
        manageTeam: { type: Boolean, default: false },
        manageStats: { type: Boolean, default: false },
        manageEmployees: { type: Boolean, default: false }, // shudhu superadmin
    },

    isActive: { type: Boolean, default: true }, // false korle login block hobe

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
}, { timestamps: true });

adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.matchPassword = async function (entered) {
    return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);