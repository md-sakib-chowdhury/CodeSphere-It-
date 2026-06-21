const router = require('express').Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/authMiddleware');
router.post('/', async (req, res) => {
    try {
        const c = await Contact.create(req.body);
        res.status(201).json({ message: 'Message sent!', id: c._id });
    } catch (err) { res.status(400).json({ message: err.message }); }
});
router.get('/', protect, async (req, res) => {
    const msgs = await Contact.find().sort({ createdAt: -1 });
    res.json(msgs);
});
router.put('/:id', protect, async (req, res) => {
    const c = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
});
router.delete('/:id', protect, async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});
module.exports = router;