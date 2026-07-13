// const router = require('express').Router();
// const { createCRUD } = require('../controllers/crudFactory');
// const Team = require('../models/Team');
// const { protect } = require('../middleware/authMiddleware');
// const c = createCRUD(Team, 'image');
// router.get('/', c.getAll);
// router.get('/:id', c.getOne);
// router.post('/', protect, c.create);
// router.put('/:id', protect, c.update);
// router.delete('/:id', protect, c.remove);
// module.exports = router;
const router = require('express').Router();
const { createCRUD } = require('../controllers/crudFactory');
const Team = require('../models/Team');
const { protect } = require('../middleware/authMiddleware');
const c = createCRUD(Team, 'image');

router.get('/', c.getAll);

// Ei duita route /:id er UPORE thakte hobe, noile Express "/executives" ke
// id="executives" dhore /:id route e match kore felbe.
router.get('/executives', async (req, res) => {
    try {
        const members = await Team.find({ group: 'executive', isActive: true }).sort({ order: 1 });
        res.json(members);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/core', async (req, res) => {
    try {
        const members = await Team.find({ group: 'core', isActive: true }).sort({ order: 1 });
        res.json(members);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', c.getOne);
router.post('/', protect, c.create);
router.put('/:id', protect, c.update);
router.delete('/:id', protect, c.remove);
module.exports = router;