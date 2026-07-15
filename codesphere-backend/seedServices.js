/**
 * FULL SEED SCRIPT — covers every static piece of text across:
 *   1. Homepage Services section     (Services.jsx)
 *   2. /services listing page        (ServicesPage.jsx)
 *   3. /services/:slug detail page   (ServiceDetails.jsx)
 *
 * SETUP:
 *   - Place this file in your backend ROOT folder (same level as .env and models/)
 *   - Adjust require() paths below if your model files are named/located differently
 *
 * RUN:  node seedServices.js
 * Safe to re-run — everything is upserted, no duplicates created.
 */

require('dotenv').config();
const mongoose = require('mongoose');

// ---- ADJUST THESE IF YOUR MODEL FILE NAMES/PATHS DIFFER ----
const Service = require('./models/Service');
const HomeSection = require('./models/HomeSections');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI not found in .env — make sure this script is in the backend root folder.');
    process.exit(1);
}

// =====================================================================
// 1) SERVICES — homepage cards, /services listing cards, detail pages
// =====================================================================
const SERVICES = [
    {
        slug: 'web-application-development',
        icon: 'FiCode',
        color: '#6366f1',
        title: 'Web Application Development',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80',
        description: 'Custom, full-stack web apps built on the MERN stack.',
        body: 'We design and build web applications from the ground up using React, Node.js, Express, and MongoDB. Every project starts with the actual workflow your business runs on — not a generic template — so the final product fits how your team already works.',
        features: [
            'React front-ends with fast, accessible interfaces',
            'Node.js & Express APIs built for scale',
            'MongoDB data modeling for real business logic',
            'Authentication, roles, and access control',
        ],
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Vercel'],
        order: 1,
        isActive: true,
    },
    {
        slug: 'ecommerce-solutions',
        icon: 'FiShoppingCart',
        color: '#f59e0b',
        title: 'E-commerce Solutions',
        image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1600&q=80',
        description: 'Storefronts that are built to convert and easy to manage.',
        body: 'From product catalog to checkout, we build online stores that are fast on mobile and simple to manage from the back end. Payment gateways, inventory tracking, and order management are built in from day one, not bolted on later.',
        features: [
            'Custom checkout, cart & payment gateway integration',
            'Inventory and order management dashboards',
            'Fast, mobile-first shopping experience',
            'Discounts, coupons, and order status tracking',
        ],
        stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'SSLCommerz'],
        order: 2,
        isActive: true,
    },
    {
        slug: 'ui-ux-design',
        icon: 'FiLayout',
        color: '#ec4899',
        title: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80',
        description: 'Interfaces designed around how people actually use them.',
        body: 'Good interfaces get out of the way. We start with wireframes and prototypes to validate the flow before writing any code, then build a design system so every new screen stays consistent with the last.',
        features: [
            'Wireframes and prototypes before a line of code',
            'Design systems that keep products consistent',
            'Usability-first, not decoration-first',
            'Mobile-first responsive layouts',
        ],
        stack: ['Figma', 'React', 'CSS Grid', 'Design Tokens'],
        order: 3,
        isActive: true,
    },
    {
        slug: 'custom-software-saas',
        icon: 'FiServer',
        color: '#14b8a6',
        title: 'Custom Software & SaaS',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80',
        description: 'Internal tools and multi-tenant platforms built from scratch.',
        body: "Whether it's an internal tool for your team or a multi-tenant SaaS product for customers, we build with an API-first approach so the platform can grow without a rewrite. Role-based access and billing are handled from the start.",
        features: [
            'Admin panels, dashboards, and internal tools',
            'Role-based access and subscription billing',
            'API-first architecture for future integrations',
            'Multi-tenant data isolation',
        ],
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
        order: 4,
        isActive: true,
    },
    {
        slug: 'deployment-cloud-hosting',
        icon: 'FiCloud',
        color: '#0ea5e9',
        title: 'Deployment & Cloud Hosting',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=80',
        description: 'From local build to production, handled end-to-end.',
        body: 'We handle the full path from a working build on your machine to a live, monitored production environment — CI/CD pipelines, environment variables, secrets, and uptime checks all set up before we hand over the keys.',
        features: [
            'CI/CD pipelines with Vercel, Render & MongoDB Atlas',
            'Environment configuration & secrets management',
            'Monitoring and uptime support after launch',
            'Custom domain & SSL setup',
        ],
        stack: ['Vercel', 'Render', 'MongoDB Atlas', 'GitHub Actions'],
        order: 5,
        isActive: true,
    },
    {
        slug: 'maintenance-support',
        icon: 'FiSmartphone',
        color: '#84cc16',
        title: 'Maintenance & Support',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
        description: 'Software that keeps working after we ship it.',
        body: "Launch day isn't the finish line. We stay on for bug fixes, security patches, and new features as your business needs change — and you talk directly to the people who built it, not a support queue.",
        features: [
            'Bug fixes and security patches',
            'Feature additions as your business grows',
            'Direct communication, no ticket queues',
            'Regular dependency and security updates',
        ],
        stack: ['Git', 'GitHub', 'Node.js', 'MongoDB'],
        order: 6,
        isActive: true,
    },
];

// =====================================================================
// 2) HOMEPAGE — Services section header (Services.jsx)
// =====================================================================
const SERVICES_HEADER = {
    label: 'What We Offer',
    titlePrefix: 'Services That ',
    titleHighlight: 'Drive Results',
    subtext: 'From idea to launch — we build complete digital products with cutting-edge tech.',
};

// =====================================================================
// 3) /services LISTING PAGE (ServicesPage.jsx)
// =====================================================================
const SERVICES_PAGE_HEADER = {
    heroTitle: 'Our Services',
    heroSubtitle: 'MERN stack development, e-commerce, and custom software — built by a team that ships and stays around to support it.',
    introHeading: 'Software That Fits the Way You Actually Work',
    introText: "AMANAH IT builds full-stack web applications, e-commerce platforms, and custom software using the MERN stack — React, Node.js, Express, and MongoDB. Every project is scoped around a real business problem, not a template. Below is what we handle end-to-end, from the first wireframe to production deployment.",
};

const SERVICES_PAGE_BENEFITS = {
    heading: 'Why Work With AMANAH IT',
    subtext: 'Three things clients consistently point to when they come back for a second project.',
    items: [
        {
            icon: 'FiZap',
            title: 'Built for Speed',
            text: 'We ship working software in weeks, not quarters — with clear milestones you can track.',
        },
        {
            icon: 'FiShield',
            title: 'Transparent Process',
            text: 'Fixed scope, fixed price where possible, and no surprise revisions hidden in the fine print.',
        },
        {
            icon: 'FiHeadphones',
            title: 'Support After Launch',
            text: "A project isn't done at deployment. We stay reachable for fixes, updates, and questions.",
        },
    ],
};

const SERVICES_PAGE_CTA_STRIP = {
    title: 'Have a project in mind?',
    buttonText: 'Talk to Us',
    buttonLink: '/contact',
};

const SERVICES_PAGE_BOTTOM_CTA = {
    eyebrow: 'Request a Quote',
    heading: 'Need a Custom Solution for Your Business?',
    buttonText: 'Start a Project',
    buttonLink: '/contact',
};

// =====================================================================
// 4) /services/:slug DETAIL PAGE (ServiceDetails.jsx)
//    — shared across all service detail pages (not per-service)
// =====================================================================
const SERVICE_DETAIL_PROCESS = {
    heading: 'How We Work',
    steps: [
        { step: '01', title: 'Discovery', text: 'We map out your workflow, users, and constraints before any design or code.' },
        { step: '02', title: 'Design & Build', text: 'Wireframes, then a working build in short, reviewable milestones.' },
        { step: '03', title: 'Test & Launch', text: 'QA across devices, then deployment to production with monitoring in place.' },
        { step: '04', title: 'Support', text: 'We stay reachable after launch for fixes and new features.' },
    ],
};

const SERVICE_DETAIL_SIDEBAR_CTA = {
    heading: 'Need this for your business?',
    text: "Tell us what you're building and we'll get back within a day.",
    buttonText: 'Request a Quote',
    buttonLink: '/contact',
};

const SERVICE_DETAIL_BOTTOM_CTA = {
    eyebrow: 'Get Started',
    headingPrefix: 'Ready to Build ',   // frontend appends {service.title} + "?"
    buttonText: 'Start a Project',
    buttonLink: '/contact',
};

// =====================================================================
// SEED RUNNER
// =====================================================================
async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // ---- Services ----
    for (const svc of SERVICES) {
        await Service.findOneAndUpdate(
            { slug: svc.slug },
            { $set: svc },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log(`Upserted service: ${svc.title}`);
    }

    // ---- Single shared HomeSection document holding everything else ----
    await HomeSection.findOneAndUpdate(
        {},
        {
            $set: {
                servicesHeader: SERVICES_HEADER,
                servicesPageHeader: SERVICES_PAGE_HEADER,
                servicesPageBenefits: SERVICES_PAGE_BENEFITS,
                servicesPageCtaStrip: SERVICES_PAGE_CTA_STRIP,
                servicesPageBottomCta: SERVICES_PAGE_BOTTOM_CTA,
                serviceDetailProcess: SERVICE_DETAIL_PROCESS,
                serviceDetailSidebarCta: SERVICE_DETAIL_SIDEBAR_CTA,
                serviceDetailBottomCta: SERVICE_DETAIL_BOTTOM_CTA,
            },
        },
        { upsert: true, new: true }
    );
    console.log('Upserted all HomeSection service-related content');

    console.log('\nSeeding complete — nothing left out.');
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});