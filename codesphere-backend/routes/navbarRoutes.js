// const router = require('express').Router();
// const Navbar = require('../models/Navbar');
// const { protect, checkPermission } = require('../middleware/authMiddleware');

// router.get('/', async (req, res) => {
//     try {
//         let n = await Navbar.findOne();
//         if (!n) {
//             n = await Navbar.create({
//                 menuLinks: [
//                     { label: 'Home', path: '/' },
//                     { label: 'Explore Us', path: '/explore-us' },
//                     { label: 'Services', path: '/services' },
//                     { label: 'Solutions', path: '/solutions' },
//                     { label: 'Latest Articles', path: '/latest-articles' },
//                     { label: 'Contact', path: '/contact' },
//                 ],
//                 socialLinks: [
//                     { platform: 'Facebook', url: 'https://facebook.com/amanahit' },
//                     { platform: 'Instagram', url: 'https://instagram.com/amanahit' },
//                     { platform: 'LinkedIn', url: 'https://linkedin.com/company/amanahit' },
//                     { platform: 'Twitter', url: 'https://twitter.com/amanahit' },
//                     { platform: 'YouTube', url: 'https://youtube.com/@amanahit' },
//                 ],
//             });
//         }
//         res.json(n);
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });

// router.put('/', protect, checkPermission('manageNavbar'), async (req, res) => {
//     try {
//         let n = await Navbar.findOne();
//         if (!n) n = new Navbar();
//         Object.assign(n, req.body);
//         await n.save();
//         res.json(n);
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });

// module.exports = router;
const router = require('express').Router();
const Navbar = require('../models/Navbar');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/crudFactory');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
    try {
        let n = await Navbar.findOne();
        if (!n) {
            n = await Navbar.create({
                menuLinks: [
                    { label: 'Home', path: '/' },
                    { label: 'Explore Us', path: '/explore-us' },
                    { label: 'Services', path: '/services' },
                    { label: 'Solutions', path: '/solutions' },
                    { label: 'Latest Articles', path: '/latest-articles' },
                    { label: 'Contact', path: '/contact' },
                ],
                socialLinks: [
                    { platform: 'Facebook', url: 'https://facebook.com/amanahit' },
                    { platform: 'Instagram', url: 'https://instagram.com/amanahit' },
                    { platform: 'LinkedIn', url: 'https://linkedin.com/company/amanahit' },
                    { platform: 'Twitter', url: 'https://twitter.com/amanahit' },
                    { platform: 'YouTube', url: 'https://youtube.com/@amanahit' },
                ],
                servicesMenu: [
                    {
                        label: 'IT Consultancy', items: [
                            { title: 'IT Strategy and Planning', desc: 'Assisting clients in aligning their IT initiatives with their overall business objectives.' },
                            { title: 'IT Project Management', desc: 'Managing and overseeing IT projects from initiation to completion.' },
                            { title: 'Software Development and Integration', desc: 'Assisting clients in developing custom software solutions.' },
                            { title: 'Data Analytics and Business Intelligence', desc: 'Helping clients make data-driven decisions by implementing analytics solutions.' },
                        ]
                    },
                    {
                        label: 'Managed IT', items: [
                            { title: '24/7 Infrastructure Monitoring', desc: 'Round-the-clock monitoring to keep your systems running smoothly.' },
                            { title: 'Network & Server Management', desc: 'Proactive management of your network and server infrastructure.' },
                            { title: 'Helpdesk Support', desc: 'Responsive helpdesk support for your team whenever issues arise.' },
                            { title: 'Backup & Disaster Recovery', desc: 'Reliable backup solutions to protect your business data.' },
                        ]
                    },
                    {
                        label: 'Digital Marketing', items: [
                            { title: 'SEO Optimization', desc: 'Rank higher on search engines and attract organic traffic.' },
                            { title: 'Social Media Marketing', desc: 'Engage your audience across platforms with curated content.' },
                            { title: 'PPC & Ad Campaigns', desc: 'Targeted paid campaigns that maximize your return on investment.' },
                            { title: 'Content Marketing', desc: 'Compelling content strategies that build brand authority.' },
                        ]
                    },
                    {
                        label: 'Brand & Promotion', items: [
                            { title: 'Brand Identity Design', desc: 'Distinct visual identity that reflects your business values.' },
                            { title: 'Promotional Campaigns', desc: 'Creative campaigns to boost visibility and engagement.' },
                        ]
                    },
                    {
                        label: 'Domain & Hosting', items: [
                            { title: 'Domain Registration', desc: 'Secure the perfect domain name for your brand.' },
                            { title: 'Cloud Hosting', desc: 'Secure cloud hosting with 99.9% uptime guarantee.' },
                            { title: 'CI/CD Pipeline', desc: 'Automated deployment pipelines for faster and reliable releases.' },
                        ]
                    },
                    {
                        label: 'Technology Training', items: [
                            { title: 'Corporate IT Training', desc: 'Upskill your team with hands-on technology training programs.' },
                            { title: 'Developer Workshops', desc: 'In-depth workshops on modern frameworks and best practices.' },
                        ]
                    },
                    {
                        label: 'Offshore Development', items: [
                            { title: 'Dedicated Development Teams', desc: 'Scalable offshore teams working as an extension of your business.' },
                            { title: 'Cost-Effective Outsourcing', desc: 'High-quality development at competitive offshore rates.' },
                        ]
                    },
                ],
                solutionsMenu: [
                    {
                        label: 'For Startups', items: [
                            { title: 'MVP Development', desc: 'Launch your product fast with a minimum viable product built to scale.' },
                            { title: 'Product Strategy', desc: 'From idea to execution — we help you plan your digital product roadmap.' },
                        ]
                    },
                    {
                        label: 'For Enterprise', items: [
                            { title: 'Digital Transformation', desc: 'Modernize legacy systems and digitize business operations.' },
                            { title: 'ERP Integration', desc: 'Seamlessly integrate ERP systems for better operational efficiency.' },
                        ]
                    },
                    {
                        label: 'E-Commerce', items: [
                            { title: 'Online Store Setup', desc: 'Complete e-commerce setup from design to payment integration.' },
                            { title: 'Inventory Management', desc: 'Smart inventory tools to keep your stock always in control.' },
                        ]
                    },
                    {
                        label: 'Education & Training', items: [
                            { title: 'LMS Development', desc: 'Custom learning management systems for online education platforms.' },
                            { title: 'Corporate Training Portal', desc: 'Internal training portals to upskill your workforce.' },
                        ]
                    },
                ],
            });
        }
        res.json(n);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, checkPermission('manageNavbar'), async (req, res) => {
    try {
        let n = await Navbar.findOne();
        if (!n) n = new Navbar();
        const data = { ...req.body };

        // Logo image upload (jodi notun base64 image dewa hoy)
        if (data.logoImage?.startsWith('data:')) {
            if (n.logoImagePublicId) {
                await cloudinary.uploader.destroy(n.logoImagePublicId).catch(() => { });
            }
            const { url, publicId } = await uploadImage(data.logoImage);
            data.logoImage = url;
            data.logoImagePublicId = publicId;
        }

        Object.assign(n, data);
        await n.save();
        res.json(n);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;