const router = require('express').Router();
const { createCRUD } = require('../controllers/crudFactory');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/authMiddleware');
const c = createCRUD(Blog, 'image');
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) { res.status(500).json({ message: err.message }); }
});
router.get('/all', protect, async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) { res.status(500).json({ message: err.message }); }
});
router.get('/:id', c.getOne);
router.post('/', protect, c.create);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);
module.exports = router;