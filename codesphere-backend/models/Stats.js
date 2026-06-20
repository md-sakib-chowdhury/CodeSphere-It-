const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    clients: { type: Number, default: 50 },
    projects: { type: Number, default: 120 },
    experience: { type: Number, default: 8 },
    satisfaction: { type: Number, default: 98 },
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);