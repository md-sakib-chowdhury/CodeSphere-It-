const router = require('express').Router();
const GalleryImage = require('../models/Gallery');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/crudFactory');
const cloudinary = require('cloudinary').v2;

// Public — shob image list, notun gula age
router.get('/', async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin — ekbare multiple image upload
router.post('/', protect, checkPermission('manageGallery'), async (req, res) => {
    try {
        const { images } = req.body; // [{ image: 'data:...', caption?: '' }, ...]
        if (!Array.isArray(images) || !images.length) {
            return res.status(400).json({ message: 'No images provided' });
        }

        const created = [];
        for (const item of images) {
            if (!item?.image?.startsWith('data:')) continue;
            const { url, publicId } = await uploadImage(item.image);
            const doc = await GalleryImage.create({ url, publicId, caption: item.caption || '' });
            created.push(doc);
        }

        res.status(201).json(created);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin — ekta image delete (cloudinary theke o remove hobe)
router.delete('/:id', protect, checkPermission('manageGallery'), async (req, res) => {
    try {
        const img = await GalleryImage.findById(req.params.id);
        if (!img) return res.status(404).json({ message: 'Image not found' });

        if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId).catch(() => { });
        }
        await img.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;