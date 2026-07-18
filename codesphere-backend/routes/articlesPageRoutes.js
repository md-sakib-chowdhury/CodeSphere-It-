const router = require('express').Router();
const ArticlesPage = require('../models/ArticlesPage');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/crudFactory');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
    try {
        let p = await ArticlesPage.findOne();
        if (!p) p = await ArticlesPage.create({});
        res.json(p);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, checkPermission('manageArticlesPage'), async (req, res) => {
    try {
        let p = await ArticlesPage.findOne();
        if (!p) p = new ArticlesPage();
        const data = { ...req.body };

        if (data.bannerImage?.startsWith('data:')) {
            if (p.bannerImagePublicId) {
                await cloudinary.uploader.destroy(p.bannerImagePublicId).catch(() => { });
            }
            const { url, publicId } = await uploadImage(data.bannerImage);
            data.bannerImage = url;
            data.bannerImagePublicId = publicId;
        }

        Object.assign(p, data);
        await p.save();
        res.json(p);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;