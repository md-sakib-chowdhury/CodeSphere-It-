const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    cta: {
        label: { type: String, default: 'Request Consultation' },
        title: { type: String, default: 'Need Any IT Service or Consultations\nNext Projects' },
        subtitle: { type: String, default: 'We Are Always With Your Business' },
        btnText: { type: String, default: 'Request Consultation' },
        btnLink: { type: String, default: '/contact' },
    },

    logoText: { type: String, default: 'Amanah' },
    logoAccent: { type: String, default: 'IT' },
    description: {
        type: String,
        default: 'AMANAH IT has adopted the highest standards of software development and consultancy quality, enabling its clients across a wide range of industries to transform into a truly digital, data-driven business.',
    },

    socialLinks: [{
        platform: { type: String },
        url: { type: String },
    }],

    serviceLinks: [{
        label: { type: String },
        path: { type: String },
    }],

    quickLinks: [{
        label: { type: String },
        path: { type: String },
    }],

    address: { type: String, default: 'Dhaka, Bangladesh' },
    email: { type: String, default: 'hello@amanahit.com' },
    phone: { type: String, default: '+880 1XXX-XXXXXX' },

    copyrightText: { type: String, default: 'AMANAH IT. All rights reserved.' },

    developedByText: { type: String, default: 'Design & Developed By' },
    developedByName: { type: String, default: 'AMANAH IT' },
    developedByLink: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Footer', footerSchema);