const mongoose = require('mongoose');

const explorePageSchema = new mongoose.Schema({
    bannerTitle: { type: String, default: 'Explore Us' },

    aboutUs: {
        heading: { type: String, default: 'About Us' },
        paragraph1: { type: String, default: 'AMANAH IT is a modern software development and IT consultancy firm based in Bangladesh, specializing in full-stack MERN web applications, e-commerce platforms, and custom digital solutions. The name "Amanah" means trust — and that principle guides every line of code we write and every relationship we build with our clients.' },
        paragraph2: { type: String, default: "We work with startups, growing businesses, and enterprises to design, build, and maintain technology that actually moves their business forward — combining technical excellence with honest, transparent communication at every step of the project." },
        image: { type: String, default: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80' },
        imagePublicId: { type: String, default: '' },
    },

    mission: {
        heading: { type: String, default: 'Our Mission' },
        intro: { type: String, default: "To help businesses grow by delivering secure, scalable, and well-engineered software — built on trust, transparency, and a genuine understanding of each client's goals. AMANAH IT's mission includes:" },
        bullets: {
            type: [String],
            default: [
                "Providing high-quality web development, e-commerce, and custom software solutions that improve our clients' business operations.",
                'Making technology more accessible and secure for small and growing businesses.',
                'Maintaining honest, clear communication throughout every project we take on.',
                'Delivering real value for every taka invested by our clients.',
                'Creating a workplace where our team can grow, learn, and do meaningful work.',
            ],
        },
        image: { type: String, default: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80' },
        imagePublicId: { type: String, default: '' },
    },

    vision: {
        heading: { type: String, default: 'Our Vision' },
        paragraph1: { type: String, default: "To become one of Bangladesh's most trusted MERN stack development partners — known not just for clean code, but for reliability, honesty, and long-term client relationships." },
        paragraph2: { type: String, default: 'We believe technology should be built with the same care as a promise kept. As we grow, we remain committed to staying hands-on, technically sharp, and always ready to take on the next challenge — for our clients and for ourselves.' },
        image: { type: String, default: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80' },
        imagePublicId: { type: String, default: '' },
    },

    workplace: {
        label: { type: String, default: 'Innovative Workplace' },
        title: { type: String, default: 'Corporate Environment / Creativity at Work' },
        paragraph1: { type: String, default: "Behind every project we deliver is a team that genuinely enjoys solving problems together. We've built a workplace culture rooted in collaboration, curiosity, and continuous learning — where junior and senior developers alike are encouraged to question, experiment, and improve." },
        paragraph2: { type: String, default: "As AMANAH IT grows, we stay committed to innovation and steady improvement. We believe there's no ceiling on how good our work can get — that mindset pushes us to explore new tools, adopt modern practices, and refine what we offer so it keeps exceeding what our clients expect." },
        image: { type: String, default: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80' },
        imagePublicId: { type: String, default: '' },
    },
}, { timestamps: true });

module.exports = mongoose.model('ExplorePage', explorePageSchema);