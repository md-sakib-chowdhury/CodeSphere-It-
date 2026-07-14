// const router = require('express').Router();
// const { createCRUD } = require('../controllers/crudFactory');
// const Service = require('../models/Service');
// const { protect } = require('../middleware/authMiddleware');
// const c = createCRUD(Service);
// router.get('/', c.getAll);
// router.get('/:id', c.getOne);
// router.post('/', protect, c.create);
// router.put('/:id', protect, c.update);
// router.delete('/:id', protect, c.remove);
// module.exports = router;
const router = require('express').Router();
const Service = require('../models/Service');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/crudFactory');
const cloudinary = require('cloudinary').v2;

// Public — homepage, /services listing, ar /services/:slug details page — shobtai eta call kore
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ order: 1 });
        res.json(services);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin — shob (active + inactive) dekhar jonno
router.get('/all', protect, async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.json(services);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Not found' });
        res.json(service);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.image?.startsWith('data:')) {
            const { url, publicId } = await uploadImage(data.image);
            data.image = url;
            data.imagePublicId = publicId;
        }
        const service = await Service.create(data);
        res.status(201).json(service);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const existing = await Service.findById(req.params.id);
        if (!existing) return res.status(404).json({ message: 'Not found' });

        const data = { ...req.body };
        if (data.image?.startsWith('data:')) {
            if (existing.imagePublicId) {
                await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => { });
            }
            const { url, publicId } = await uploadImage(data.image);
            data.image = url;
            data.imagePublicId = publicId;
        }

        Object.assign(existing, data);
        await existing.save();
        res.json(existing);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Not found' });
        if (service.imagePublicId) {
            await cloudinary.uploader.destroy(service.imagePublicId).catch(() => { });
        }
        await service.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;