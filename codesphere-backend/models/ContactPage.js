// const mongoose = require('mongoose');

// const contactPageSchema = new mongoose.Schema({
//     bannerTitle: { type: String, default: 'Contact' },
//     breadcrumbCurrent: { type: String, default: 'Contact' },

//     introHeading: { type: String, default: 'Best IT Services Company in BD.\nFeel Free Contact Us Today and Get Your Solution.' },
//     introText: { type: String, default: 'Reach out to us for personalized solutions tailored to your needs. Our expert team is here to help you achieve your goals.' },

//     phone: { type: String, default: '+880 18 4418 5480' },
//     email: { type: String, default: 'info@amanahit.com' },
//     addressLine1: { type: String, default: 'House-774, Road-11, Avenue-02' },
//     addressLine2: { type: String, default: 'Mirpur DOHS, Dhaka-1216' },

//     mapEmbedUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3!2d90.3667!3d23.8245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzI4LjIiTiA5MMKwMjInMDAuMSJF!5e0!3m2!1sen!2sbd!4v1234567890' },
// }, { timestamps: true });

// module.exports = mongoose.model('ContactPage', contactPageSchema);
const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
    bannerTitle: { type: String, default: 'Contact' },
    breadcrumbCurrent: { type: String, default: 'Contact' },
    bannerImage: { type: String, default: '' },
    bannerImagePublicId: { type: String, default: '' },

    introHeading: { type: String, default: 'Best IT Services Company in BD.\nFeel Free Contact Us Today and Get Your Solution.' },
    introText: { type: String, default: 'Reach out to us for personalized solutions tailored to your needs. Our expert team is here to help you achieve your goals.' },

    phone: { type: String, default: '+880 18 4418 5480' },
    email: { type: String, default: 'info@amanahit.com' },
    addressLine1: { type: String, default: 'House-774, Road-11, Avenue-02' },
    addressLine2: { type: String, default: 'Mirpur DOHS, Dhaka-1216' },

    mapEmbedUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3!2d90.3667!3d23.8245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzI4LjIiTiA5MMKwMjInMDAuMSJF!5e0!3m2!1sen!2sbd!4v1234567890' },
}, { timestamps: true });

module.exports = mongoose.model('ContactPage', contactPageSchema);