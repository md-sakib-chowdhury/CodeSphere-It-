require('dotenv').config();
const mongoose = require('mongoose');
const Navbar = require('./models/Navbar');

const data = {
    logoText: 'Amanah',
    logoAccent: '.IT',
    phone: '+880 1800-000000',
    email: 'info@amanahit.com',
    socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com/amanahit' },
        { platform: 'Instagram', url: 'https://instagram.com/amanahit' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/amanahit' },
        { platform: 'Twitter', url: 'https://twitter.com/amanahit' },
        { platform: 'YouTube', url: 'https://youtube.com/@amanahit' },
    ],
    menuLinks: [
        { label: 'Home', path: '/' },
        { label: 'Explore Us', path: '/explore-us' },
        { label: 'Services', path: '/services' },
        { label: 'Solutions', path: '/solutions' },
        { label: 'Latest Articles', path: '/latest-articles' },
        { label: 'Contact', path: '/contact' },
    ],
    brochureText: 'Brochure',
    brochureLink: '/brochure.pdf',
};

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        let existing = await Navbar.findOne();
        if (existing) {
            Object.assign(existing, data);
            await existing.save();
            console.log('Updated existing Navbar document with default content.');
        } else {
            await Navbar.create(data);
            console.log('Created new Navbar document with default content.');
        }

        console.log('\nDone!');
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

run();