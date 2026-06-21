const router = require('express').Router();
const Hero = require('../models/Hero');
const { protect } = require('../middleware/authMiddleware');
router.get('/', async (req, res) => {
    try {
        let h = await Hero.findOne();
        if (!h) h = await Hero.create({ typedWords: ['Web Applications', 'E-commerce Stores', 'SaaS Platforms', 'Custom Software'] });
        res.json(h);
    } catch (err) { res.status(500).json({ message: err.message }); }
});
router.put('/', protect, async (req, res) => {
    try {
        let h = await Hero.findOne();
        if (!h) h = new Hero();
        Object.assign(h, req.body);
        await h.save();
        res.json(h);
    } catch (err) { res.status(500).json({ message: err.message }); }
});
module.exports = router;