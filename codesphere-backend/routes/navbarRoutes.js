const router = require('express').Router();
const Navbar = require('../models/Navbar');
const { protect, checkPermission } = require('../middleware/authMiddleware');

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
            });
        }
        res.json(n);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, checkPermission('manageNavbar'), async (req, res) => {
    try {
        let n = await Navbar.findOne();
        if (!n) n = new Navbar();
        Object.assign(n, req.body);
        await n.save();
        res.json(n);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;