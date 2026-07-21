// const mongoose = require('mongoose');

// const navbarSchema = new mongoose.Schema({
//     logoText: { type: String, default: 'Amanah' },
//     logoAccent: { type: String, default: '.IT' }, // colored/dot part of logo

//     phone: { type: String, default: '+880 1800-000000' },
//     email: { type: String, default: 'info@amanahit.com' },

//     socialLinks: [{
//         platform: { type: String }, // Facebook, Instagram, LinkedIn, Twitter, YouTube
//         url: { type: String },
//     }],

//     menuLinks: [{
//         label: { type: String },
//         path: { type: String },
//     }],

//     brochureText: { type: String, default: 'Brochure' },
//     brochureLink: { type: String, default: '/brochure.pdf' },
// }, { timestamps: true });

// module.exports = mongoose.model('Navbar', navbarSchema);
const mongoose = require('mongoose');

const navbarSchema = new mongoose.Schema({
    logoText: { type: String, default: 'Amanah' },
    logoAccent: { type: String, default: '.IT' },
    logoImage: { type: String, default: '' },
    logoImagePublicId: { type: String, default: '' },

    phone: { type: String, default: '+880 1800-000000' },
    email: { type: String, default: 'info@amanahit.com' },

    socialLinks: [{
        platform: { type: String },
        url: { type: String },
    }],

    menuLinks: [{
        label: { type: String },
        path: { type: String },
    }],

    servicesMenu: [{
        label: { type: String },
        items: [{
            title: { type: String },
            desc: { type: String },
        }],
    }],

    solutionsMenu: [{
        label: { type: String },
        items: [{
            title: { type: String },
            desc: { type: String },
        }],
    }],

    brochureText: { type: String, default: 'Brochure' },
    brochureLink: { type: String, default: '/brochure.pdf' },
}, { timestamps: true });

module.exports = mongoose.model('Navbar', navbarSchema);