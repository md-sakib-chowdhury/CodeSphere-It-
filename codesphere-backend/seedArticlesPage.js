require('dotenv').config();
const mongoose = require('mongoose');
const ArticlesPage = require('./models/ArticlesPage');

const data = {
    bannerTitle: 'Latest Articles',
    breadcrumbCurrent: 'Blog',
    cta: {
        label: 'Our Recent Activities',
        title: 'Latest Activities From Our Team',
        text: 'Want to work with us on your next project?',
        btnText: 'Get In Touch',
        btnLink: '/contact',
    },
};

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        let existing = await ArticlesPage.findOne();
        if (existing) {
            Object.assign(existing, data);
            await existing.save();
            console.log('Updated existing ArticlesPage document with default content.');
        } else {
            await ArticlesPage.create(data);
            console.log('Created new ArticlesPage document with default content.');
        }

        console.log('\nDone!');
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

run();