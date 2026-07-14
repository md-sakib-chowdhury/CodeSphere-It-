// seedServices.js
// 6 ta real service database e boshiye dey — homepage, /services listing,
// ar /services/:slug details page shobtai ei ekই data theke ashবে।
//
// Run korar niyom (codesphere-backend root e, jekhane server.js ache):
//   node seedServices.js

require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const SERVICES = [
    {
        title: 'Web Application Development',
        slug: 'web-application-development',
        icon: 'FiCode',
        color: '#6366f1',
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
        order: 0,
    },
    {
        title: 'E-commerce Solutions',
        slug: 'ecommerce-solutions',
        icon: 'FiShoppingCart',
        color: '#f59e0b',
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
        order: 1,
    },
    {
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        icon: 'FiLayout',
        color: '#ec4899',
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
        order: 2,
    },
    {
        title: 'Custom Software & SaaS',
        slug: 'custom-software-saas',
        icon: 'FiServer',
        color: '#14b8a6',
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
        order: 3,
    },
    {
        title: 'Deployment & Cloud Hosting',
        slug: 'deployment-cloud-hosting',
        icon: 'FiCloud',
        color: '#0ea5e9',
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
        order: 4,
    },
    {
        title: 'Maintenance & Support',
        slug: 'maintenance-support',
        icon: 'FiSmartphone',
        color: '#84cc16',
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
        order: 5,
    },
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        console.log('MongoDB connected');

        for (const svc of SERVICES) {
            const exists = await Service.findOne({ slug: svc.slug });
            if (exists) {
                console.log('Skipped (already exists):', svc.title);
                continue;
            }
            await Service.create(svc);
            console.log('Added:', svc.title);
        }

        console.log('Done! Shob service add hoye geche.');

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

run();