// seedStats.js
// seedProjects.js / seedBlogs.js er same pattern — run korle Stats Cards
// database e boshe jabe। Erpor jokhon mon chaibe, admin panel theke
// notun card add/edit/delete kora jabe।
//
// Kivabe run korba (codesphere-backend root e, jekhane server.js ache):
//   node seedStats.js

require('dotenv').config();
const mongoose = require('mongoose');
const HomeSections = require('./models/HomeSections');

const STATS_CARDS = [
    { value: '28+', label: 'Projects Built', desc: 'Real-world MERN stack projects shipped and deployed.' },
    { value: '2+', label: 'Years of Craft', desc: 'Building with the MERN stack since 2024.' },
    { value: 'MERN', label: 'Core Stack', desc: 'MongoDB, Express, React, Node — our specialty end to end.' },
    { value: '100%', label: 'Commitment', desc: 'Every project gets our full focus, start to finish.' },
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        console.log('MongoDB connected');

        let h = await HomeSections.findOne();

        if (!h) {
            h = await HomeSections.create({ statsCards: STATS_CARDS });
            console.log('Notun HomeSections document create hoyeche, statsCards soho.');
        } else {
            h.statsCards = STATS_CARDS;
            await h.save();
            console.log('statsCards update hoyeche existing document e (onno field touch hoyni).');
        }

        STATS_CARDS.forEach(c => console.log('Added:', c.label));
        console.log('Done! Shob stats card add hoye geche.');

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

run();