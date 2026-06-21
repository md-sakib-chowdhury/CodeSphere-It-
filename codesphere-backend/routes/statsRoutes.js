const router = require('express').Router();
const Stats = require('../models/Stats');
const { protect } = require('../middleware/authMiddleware');
router.get('/', async (req, res) => {
    try {
        let s = await Stats.findOne();
        if (!s) s = await Stats.create({});
        res.json(s);
    } catch (err) { res.status(500).json({ message: err.message }); }
});
router.put('/', protect, async (req, res) => {
    try {
        let s = await Stats.findOne();
        if (!s) s = new Stats();
        Object.assign(s, req.body);
        await s.save();
        res.json(s);
    } catch (err) { res.status(500).json({ message: err.message }); }
});
module.exports = router;