// // // const mongoose = require('mongoose');

// // // const homeSectionsSchema = new mongoose.Schema({
// // //     whatWeOffer: {
// // //         label: { type: String, default: 'What We Offer' },
// // //         title: { type: String, default: 'We Make Different Solutions' },
// // //         subtext: { type: String, default: 'From web development to cloud deployment, we offer a dynamic suite of technological services to drive your business success.' },
// // //         image: { type: String, default: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80' },
// // //         imagePublicId: { type: String, default: '' },
// // //         btnText: { type: String, default: 'Learn More Us' },
// // //     },

// // //     keyCompetency: {
// // //         label: { type: String, default: 'Key Competency' },
// // //         title: { type: String, default: "We're Professional and More Experience" },
// // //         subtext: { type: String, default: 'Stay ahead with our best MERN stack development team in Bangladesh — the perfect blend of cutting-edge technologies and industry expertise.' },
// // //         image: { type: String, default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80' },
// // //         imagePublicId: { type: String, default: '' },
// // //         caption: { type: String, default: '2+ years of combined experience in this field' },
// // //         skills: [{
// // //             label: { type: String },
// // //             value: { type: Number },
// // //         }],
// // //     },

// // //     whyChooseUs: {
// // //         label: { type: String, default: 'Why Choose Us' },
// // //         title: { type: String, default: 'IT Services BD — Skyrocket Your Business' },
// // //         subtext: { type: String, default: 'Unlock your business potential with our IT service expertise, reliability, and passion for delivering exceptional results.' },
// // //         btnText: { type: String, default: 'Learn More Us' },
// // //         images: [{
// // //             url: { type: String },
// // //             publicId: { type: String },
// // //             caption: { type: String },
// // //         }],
// // //     },

// // //     latestActivities: {
// // //         label: { type: String, default: 'Our Recent Activities' },
// // //         title: { type: String, default: 'Latest Activities' },
// // //         btnText: { type: String, default: 'Learn More' },
// // //     },

// // //     testimonialsHeader: {
// // //         label: { type: String, default: 'Clients Testimonials' },
// // //         titlePrefix: { type: String, default: 'What Our ' },
// // //         titleHighlight: { type: String, default: 'Clients Say' },
// // //         titleSuffix: { type: String, default: ' About Us' },
// // //     },

// // //     teamHeader: {
// // //         label: { type: String, default: 'Our Team' },
// // //         title: { type: String, default: 'Meet The Founder' },
// // //         subtext: { type: String, default: 'Driven by passion, guided by excellence — bringing hands-on technical leadership to every project we take on.' },
// // //         executiveGroupTitle: { type: String, default: 'Executive Leader' },
// // //         coreGroupTitle: { type: String, default: 'Core Team' },
// // //     },

// // //     servicesHeader: {
// // //         label: { type: String, default: 'What We Offer' },
// // //         titlePrefix: { type: String, default: 'Services That ' },
// // //         titleHighlight: { type: String, default: 'Drive Results' },
// // //         subtext: { type: String, default: 'From idea to launch — we build complete digital products with cutting-edge tech.' },
// // //     },

// // //     portfolioHeader: {
// // //         label: { type: String, default: 'Our Work' },
// // //         titlePrefix: { type: String, default: 'Recent ' },
// // //         titleHighlight: { type: String, default: 'Projects' },
// // //         subtext: { type: String, default: 'Real products built for real clients — from startups to enterprises.' },
// // //     },

// // //     statsCards: [{
// // //         value: { type: String },
// // //         label: { type: String },
// // //         desc: { type: String },
// // //     }],
// // // }, { timestamps: true });

// // // module.exports = mongoose.model('HomeSections', homeSectionsSchema);
// // const mongoose = require('mongoose');

// // const homeSectionsSchema = new mongoose.Schema({
// //     whatWeOffer: {
// //         label: { type: String, default: 'What We Offer' },
// //         title: { type: String, default: 'We Make Different Solutions' },
// //         subtext: { type: String, default: 'From web development to cloud deployment, we offer a dynamic suite of technological services to drive your business success.' },
// //         image: { type: String, default: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80' },
// //         imagePublicId: { type: String, default: '' },
// //         btnText: { type: String, default: 'Learn More Us' },
// //     },

// //     keyCompetency: {
// //         label: { type: String, default: 'Key Competency' },
// //         title: { type: String, default: "We're Professional and More Experience" },
// //         subtext: { type: String, default: 'Stay ahead with our best MERN stack development team in Bangladesh — the perfect blend of cutting-edge technologies and industry expertise.' },
// //         image: { type: String, default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80' },
// //         imagePublicId: { type: String, default: '' },
// //         caption: { type: String, default: '2+ years of combined experience in this field' },
// //         skills: [{
// //             label: { type: String },
// //             value: { type: Number },
// //         }],
// //     },

// //     whyChooseUs: {
// //         label: { type: String, default: 'Why Choose Us' },
// //         title: { type: String, default: 'IT Services BD — Skyrocket Your Business' },
// //         subtext: { type: String, default: 'Unlock your business potential with our IT service expertise, reliability, and passion for delivering exceptional results.' },
// //         btnText: { type: String, default: 'Learn More Us' },
// //         images: [{
// //             url: { type: String },
// //             publicId: { type: String },
// //             caption: { type: String },
// //         }],
// //     },

// //     latestActivities: {
// //         label: { type: String, default: 'Our Recent Activities' },
// //         title: { type: String, default: 'Latest Activities' },
// //         btnText: { type: String, default: 'Learn More' },
// //     },

// //     testimonialsHeader: {
// //         label: { type: String, default: 'Clients Testimonials' },
// //         titlePrefix: { type: String, default: 'What Our ' },
// //         titleHighlight: { type: String, default: 'Clients Say' },
// //         titleSuffix: { type: String, default: ' About Us' },
// //     },

// //     teamHeader: {
// //         label: { type: String, default: 'Our Team' },
// //         title: { type: String, default: 'Meet The Founder' },
// //         subtext: { type: String, default: 'Driven by passion, guided by excellence — bringing hands-on technical leadership to every project we take on.' },
// //         executiveGroupTitle: { type: String, default: 'Executive Leader' },
// //         coreGroupTitle: { type: String, default: 'Core Team' },
// //     },

// //     servicesHeader: {
// //         label: { type: String, default: 'What We Offer' },
// //         titlePrefix: { type: String, default: 'Services That ' },
// //         titleHighlight: { type: String, default: 'Drive Results' },
// //         subtext: { type: String, default: 'From idea to launch — we build complete digital products with cutting-edge tech.' },
// //     },

// //     portfolioHeader: {
// //         label: { type: String, default: 'Our Work' },
// //         titlePrefix: { type: String, default: 'Recent ' },
// //         titleHighlight: { type: String, default: 'Projects' },
// //         subtext: { type: String, default: 'Real products built for real clients — from startups to enterprises.' },
// //     },

// //     statsCards: [{
// //         value: { type: String },
// //         label: { type: String },
// //         desc: { type: String },
// //         tone: { type: Number, default: 1, min: 1, max: 4 }, // 1-4: card er color tone (CSS e defined)
// //     }],
// // }, { timestamps: true });

// // module.exports = mongoose.model('HomeSections', homeSectionsSchema);
// const mongoose = require('mongoose');

// const homeSectionsSchema = new mongoose.Schema({
//     whatWeOffer: {
//         label: { type: String, default: 'What We Offer' },
//         title: { type: String, default: 'We Make Different Solutions' },
//         subtext: { type: String, default: 'From web development to cloud deployment, we offer a dynamic suite of technological services to drive your business success.' },
//         image: { type: String, default: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80' },
//         imagePublicId: { type: String, default: '' },
//         btnText: { type: String, default: 'Learn More Us' },
//     },

//     keyCompetency: {
//         label: { type: String, default: 'Key Competency' },
//         title: { type: String, default: "We're Professional and More Experience" },
//         subtext: { type: String, default: 'Stay ahead with our best MERN stack development team in Bangladesh — the perfect blend of cutting-edge technologies and industry expertise.' },
//         image: { type: String, default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80' },
//         imagePublicId: { type: String, default: '' },
//         caption: { type: String, default: '2+ years of combined experience in this field' },
//         skills: [{
//             label: { type: String },
//             value: { type: Number },
//         }],
//     },

//     whyChooseUs: {
//         label: { type: String, default: 'Why Choose Us' },
//         title: { type: String, default: 'IT Services BD — Skyrocket Your Business' },
//         subtext: { type: String, default: 'Unlock your business potential with our IT service expertise, reliability, and passion for delivering exceptional results.' },
//         btnText: { type: String, default: 'Learn More Us' },
//         images: [{
//             url: { type: String },
//             publicId: { type: String },
//             caption: { type: String },
//         }],
//     },

//     latestActivities: {
//         label: { type: String, default: 'Our Recent Activities' },
//         title: { type: String, default: 'Latest Activities' },
//         btnText: { type: String, default: 'Learn More' },
//         cards: [{
//             image: { type: String },
//             imagePublicId: { type: String },
//             tag: { type: String, default: 'News' },
//             title: { type: String },
//             excerpt: { type: String },
//             date: { type: String }, // display text, e.g. "Jul 11, 2026"
//         }],
//     },

//     testimonialsHeader: {
//         label: { type: String, default: 'Clients Testimonials' },
//         titlePrefix: { type: String, default: 'What Our ' },
//         titleHighlight: { type: String, default: 'Clients Say' },
//         titleSuffix: { type: String, default: ' About Us' },
//     },

//     teamHeader: {
//         label: { type: String, default: 'Our Team' },
//         title: { type: String, default: 'Meet The Founder' },
//         subtext: { type: String, default: 'Driven by passion, guided by excellence — bringing hands-on technical leadership to every project we take on.' },
//         executiveGroupTitle: { type: String, default: 'Executive Leader' },
//         coreGroupTitle: { type: String, default: 'Core Team' },
//     },

//     servicesHeader: {
//         label: { type: String, default: 'What We Offer' },
//         titlePrefix: { type: String, default: 'Services That ' },
//         titleHighlight: { type: String, default: 'Drive Results' },
//         subtext: { type: String, default: 'From idea to launch — we build complete digital products with cutting-edge tech.' },
//     },

//     portfolioHeader: {
//         label: { type: String, default: 'Our Work' },
//         titlePrefix: { type: String, default: 'Recent ' },
//         titleHighlight: { type: String, default: 'Projects' },
//         subtext: { type: String, default: 'Real products built for real clients — from startups to enterprises.' },
//     },

//     statsCards: [{
//         value: { type: String },
//         label: { type: String },
//         desc: { type: String },
//         tone: { type: Number, default: 1, min: 1, max: 4 },
//     }],
// }, { timestamps: true });

// module.exports = mongoose.model('HomeSections', homeSectionsSchema);
const mongoose = require('mongoose');

const homeSectionsSchema = new mongoose.Schema({
    whatWeOffer: {
        label: { type: String, default: 'What We Offer' },
        title: { type: String, default: 'We Make Different Solutions' },
        subtext: { type: String, default: 'From web development to cloud deployment, we offer a dynamic suite of technological services to drive your business success.' },
        image: { type: String, default: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80' },
        imagePublicId: { type: String, default: '' },
        btnText: { type: String, default: 'Learn More Us' },
    },

    keyCompetency: {
        label: { type: String, default: 'Key Competency' },
        title: { type: String, default: "We're Professional and More Experience" },
        subtext: { type: String, default: 'Stay ahead with our best MERN stack development team in Bangladesh — the perfect blend of cutting-edge technologies and industry expertise.' },
        image: { type: String, default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80' },
        imagePublicId: { type: String, default: '' },
        caption: { type: String, default: '2+ years of combined experience in this field' },
        skills: [{
            label: { type: String },
            value: { type: Number },
        }],
    },

    whyChooseUs: {
        label: { type: String, default: 'Why Choose Us' },
        title: { type: String, default: 'IT Services BD — Skyrocket Your Business' },
        subtext: { type: String, default: 'Unlock your business potential with our IT service expertise, reliability, and passion for delivering exceptional results.' },
        btnText: { type: String, default: 'Learn More Us' },
        images: [{
            url: { type: String },
            publicId: { type: String },
            caption: { type: String },
        }],
    },

    latestActivities: {
        label: { type: String, default: 'Our Recent Activities' },
        title: { type: String, default: 'Latest Activities' },
        btnText: { type: String, default: 'Learn More' },
        cards: [{
            image: { type: String },
            imagePublicId: { type: String },
            tag: { type: String, default: 'News' },
            title: { type: String },
            excerpt: { type: String },
            date: { type: String }, // display text, e.g. "Jul 11, 2026"
        }],
    },

    testimonialsHeader: {
        label: { type: String, default: 'Clients Testimonials' },
        titlePrefix: { type: String, default: 'What Our ' },
        titleHighlight: { type: String, default: 'Clients Say' },
        titleSuffix: { type: String, default: ' About Us' },
    },

    teamHeader: {
        label: { type: String, default: 'Our Team' },
        title: { type: String, default: 'Meet The Founder' },
        subtext: { type: String, default: 'Driven by passion, guided by excellence — bringing hands-on technical leadership to every project we take on.' },
        executiveGroupTitle: { type: String, default: 'Executive Leader' },
        coreGroupTitle: { type: String, default: 'Core Team' },
    },

    servicesHeader: {
        label: { type: String, default: 'What We Offer' },
        titlePrefix: { type: String, default: 'Services That ' },
        titleHighlight: { type: String, default: 'Drive Results' },
        subtext: { type: String, default: 'From idea to launch — we build complete digital products with cutting-edge tech.' },
    },

    portfolioHeader: {
        label: { type: String, default: 'Our Work' },
        titlePrefix: { type: String, default: 'Recent ' },
        titleHighlight: { type: String, default: 'Projects' },
        subtext: { type: String, default: 'Real products built for real clients — from startups to enterprises.' },
    },

    statsCards: [{
        value: { type: String },
        label: { type: String },
        desc: { type: String },
        tone: { type: Number, default: 1, min: 1, max: 4 },
    }],

    // ===================================================================
    // /services listing page — managed from Admin > Services tab
    // ===================================================================

    servicesPageHeader: {
        heroTitle: { type: String, default: 'Our Services' },
        heroSubtitle: { type: String, default: 'MERN stack development, e-commerce, and custom software — built by a team that ships and stays around to support it.' },
        introHeading: { type: String, default: 'Software That Fits the Way You Actually Work' },
        introText: { type: String, default: '' },
    },

    servicesPageBenefits: {
        heading: { type: String, default: 'Why Work With AMANAH IT' },
        subtext: { type: String, default: '' },
        items: [{
            icon: { type: String, default: 'FiZap' },
            title: { type: String },
            text: { type: String },
        }],
    },

    servicesPageCtaStrip: {
        title: { type: String, default: 'Have a project in mind?' },
        buttonText: { type: String, default: 'Talk to Us' },
        buttonLink: { type: String, default: '/contact' },
    },

    servicesPageBottomCta: {
        eyebrow: { type: String, default: 'Request a Quote' },
        heading: { type: String, default: 'Need a Custom Solution for Your Business?' },
        buttonText: { type: String, default: 'Start a Project' },
        buttonLink: { type: String, default: '/contact' },
    },

    // ===================================================================
    // /services/:slug detail page — managed from Admin > Services tab
    // ===================================================================

    serviceDetailProcess: {
        heading: { type: String, default: 'How We Work' },
        steps: [{
            step: { type: String },
            title: { type: String },
            text: { type: String },
        }],
    },

    // "Benefits" section — sits after the Process/CTA on every service detail
    // page. heading + intro paragraph + card grid, then an optional banner
    // image and closing paragraph underneath it.
    serviceDetailBenefits: {
        heading: { type: String, default: 'Benefits' },
        intro: { type: String, default: '' },
        items: [{
            icon: { type: String, default: 'FiCheckCircle' },
            title: { type: String },
            text: { type: String },
        }],
        image: { type: String, default: '' },
        imagePublicId: { type: String, default: '' },
        closingText: { type: String, default: '' },
    },

    serviceDetailSidebarCta: {
        heading: { type: String, default: 'Need this for your business?' },
        text: { type: String, default: '' },
        buttonText: { type: String, default: 'Request a Quote' },
        buttonLink: { type: String, default: '/contact' },
    },

    serviceDetailBottomCta: {
        eyebrow: { type: String, default: 'Get Started' },
        headingPrefix: { type: String, default: 'Ready to Build ' },
        buttonText: { type: String, default: 'Start a Project' },
        buttonLink: { type: String, default: '/contact' },
    },

}, { timestamps: true });

module.exports = mongoose.model('HomeSections', homeSectionsSchema);