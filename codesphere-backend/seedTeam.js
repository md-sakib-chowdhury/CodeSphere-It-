// seedTeam.js
// seedProjects.js / seedBlogs.js er same pattern — run korle Team member gula
// database e boshe jabe। Erpor jokhon mon chaibe, admin panel theke
// notun member add/edit/delete kora jabe।
//
// Kivabe run korba (codesphere-backend root e, jekhane server.js ache):
//   node seedTeam.js

require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./models/Team');

const PLACEHOLDER = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80';

const TEAM_MEMBERS = [
    {
        name: 'Sakib Chowdhury',
        designation: 'Executive Leader',
        bio: 'Driven by passion, guided by excellence — bringing hands-on technical leadership to every project we take on.',
        image: PLACEHOLDER,
        linkedin: '',
        github: '',
        twitter: '',
        skills: ['MERN Stack', 'System Architecture', 'Team Leadership'],
        order: 0,
        isActive: true,
    },
    {
        name: 'Core Member One',
        designation: 'Frontend Developer',
        bio: 'Focused on building clean, responsive user interfaces with React.',
        image: PLACEHOLDER,
        linkedin: '',
        github: '',
        twitter: '',
        skills: ['React', 'JavaScript', 'Tailwind CSS'],
        order: 1,
        isActive: true,
    },
    {
        name: 'Core Member Two',
        designation: 'Backend Developer',
        bio: 'Builds and maintains scalable server-side systems and APIs.',
        image: PLACEHOLDER,
        linkedin: '',
        github: '',
        twitter: '',
        skills: ['Node.js', 'Express', 'MongoDB'],
        order: 2,
        isActive: true,
    },
    {
        name: 'Core Member Three',
        designation: 'UI/UX Designer',
        bio: 'Designs intuitive, user-centered digital experiences.',
        image: PLACEHOLDER,
        linkedin: '',
        github: '',
        twitter: '',
        skills: ['Figma', 'UI/UX', 'Prototyping'],
        order: 3,
        isActive: true,
    },
    {
        name: 'Core Member Four',
        designation: 'QA Engineer',
        bio: 'Ensures every release is stable, tested, and production-ready.',
        image: PLACEHOLDER,
        linkedin: '',
        github: '',
        twitter: '',
        skills: ['Testing', 'QA Automation', 'Debugging'],
        order: 4,
        isActive: true,
    },
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        console.log('MongoDB connected');

        for (const member of TEAM_MEMBERS) {
            const exists = await Team.findOne({ name: member.name });
            if (exists) {
                console.log('Skipped (already exists):', member.name);
                continue;
            }
            await Team.create(member);
            console.log('Added:', member.name);
        }

        console.log('Done! Shob team member add hoye geche.');
        console.log('Note: image ekhon placeholder — admin panel theke real chhobi upload kore dio.');

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

run();