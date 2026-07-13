// seedLatestActivities.js
// Homepage "Latest Activities" section er 3 ta card database e boshiye dey।
// Blog/Articles tab er data theke completely আলাদা — shudhu Homepage e dekhano card।
//
// Run korar niyom (codesphere-backend root e, jekhane server.js ache):
//   node seedLatestActivities.js

require('dotenv').config();
const mongoose = require('mongoose');
const HomeSections = require('./models/HomeSections');

const PLACEHOLDER = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80';

const CARDS = [
    {
        image: PLACEHOLDER,
        tag: 'Security',
        title: 'Securing Your Web App: A Practical Checklist',
        excerpt: 'JWT auth, input validation, rate limiting and the other basics every production app needs.',
        date: 'Jul 11, 2026',
    },
    {
        image: PLACEHOLDER,
        tag: 'E-commerce',
        title: "A Founder's Guide to Choosing an E-commerce Platform",
        excerpt: 'Custom-built vs off-the-shelf — what matters when picking a platform for your online store.',
        date: 'Jul 11, 2026',
    },
    {
        image: PLACEHOLDER,
        tag: 'MERN Stack',
        title: 'Why MERN Stack Is Still a Great Choice for Startups',
        excerpt: 'React, Node, MongoDB and Express remain one of the fastest ways to go from idea to working product.',
        date: 'Jul 11, 2026',
    },
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        console.log('MongoDB connected');

        let h = await HomeSections.findOne();

        if (!h) {
            h = await HomeSections.create({ latestActivities: { cards: CARDS } });
            console.log('Notun HomeSections document create hoyeche, latestActivities cards soho.');
        } else {
            h.latestActivities = { ...(h.latestActivities?.toObject?.() || h.latestActivities || {}), cards: CARDS };
            await h.save();
            console.log('latestActivities.cards update hoyeche (onno field touch hoyni).');
        }

        CARDS.forEach(c => console.log('Added:', c.title));
        console.log('Done! Shob Latest Activities card add hoye geche.');
        console.log('Note: image ekhon placeholder — admin panel theke real image upload kore dio.');

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

run();