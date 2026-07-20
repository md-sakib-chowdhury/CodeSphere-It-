const router = require('express').Router();
const Footer = require('../models/Footer');
const { protect, checkPermission } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        let f = await Footer.findOne();
        if (!f) {
            f = await Footer.create({
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
            });
        }
        res.json(f);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, checkPermission('manageFooter'), async (req, res) => {
    try {
        let f = await Footer.findOne();
        if (!f) f = new Footer();
        Object.assign(f, req.body);
        await f.save();
        res.json(f);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;