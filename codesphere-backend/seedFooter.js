require('dotenv').config();
const mongoose = require('mongoose');
const Footer = require('./models/Footer');

const data = {
    cta: {
        label: 'Request Consultation',
        title: 'Need Any IT Service or Consultations\nNext Projects',
        subtitle: 'We Are Always With Your Business',
        btnText: 'Request Consultation',
        btnLink: '/contact',
    },
    logoText: 'Amanah',
    logoAccent: 'IT',
    description: 'AMANAH IT has adopted the highest standards of software development and consultancy quality, enabling its clients across a wide range of industries to transform into a truly digital, data-driven business.',
    socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com/amanahit' },
        { platform: 'Instagram', url: 'https://instagram.com/amanahit' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/amanahit' },
        { platform: 'Twitter', url: 'https://twitter.com/amanahit' },
        { platform: 'YouTube', url: 'https://youtube.com/@amanahit' },
    ],
    serviceLinks: [
        { label: 'Web Development', path: '/services' },
        { label: 'E-commerce Solutions', path: '/services' },
        { label: 'UI/UX Design', path: '/services' },
        { label: 'Digital Marketing', path: '/services' },
        { label: 'Mobile App Development', path: '/services' },
        { label: 'Cloud & Deployment', path: '/services' },
    ],
    quickLinks: [
        { label: 'Explore Us', path: '/explore-us' },
        { label: 'Portfolio', path: '/#portfolio' },
        { label: 'Team', path: '/#team' },
        { label: 'Testimonials', path: '/#testimonials' },
        { label: 'Latest Articles', path: '/latest-articles' },
    ],
    address: 'Dhaka, Bangladesh',
    email: 'hello@amanahit.com',
    phone: '+880 1XXX-XXXXXX',
    copyrightText: 'AMANAH IT. All rights reserved.',
    developedByText: 'Design & Developed By',
    developedByName: 'AMANAH IT',
    developedByLink: '',
};

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        let existing = await Footer.findOne();
        if (existing) {
            Object.assign(existing, data);
            await existing.save();
            console.log('Updated existing Footer document with default content.');
        } else {
            await Footer.create(data);
            console.log('Created new Footer document with default content.');
        }

        console.log('\nDone!');
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

run();