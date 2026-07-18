const router = require('express').Router();
const ContactPage = require('../models/ContactPage');
const { protect, checkPermission } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        let p = await ContactPage.findOne();
        if (!p) p = await ContactPage.create({});
        res.json(p);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, checkPermission('manageContactPage'), async (req, res) => {
    try {
        let p = await ContactPage.findOne();
        if (!p) p = new ContactPage();
        Object.assign(p, req.body);
        await p.save();
        res.json(p);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;