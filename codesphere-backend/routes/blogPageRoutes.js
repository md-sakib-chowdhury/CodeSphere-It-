const router = require('express').Router();
const BlogPageSettings = require('../models/BlogPageSettings');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/crudFactory');

router.get('/', async (req, res) => {
    try {
        let s = await BlogPageSettings.findOne();
        if (!s) s = await BlogPageSettings.create({});
        res.json(s);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, checkPermission('manageBlog'), async (req, res) => {
    try {
        let s = await BlogPageSettings.findOne();
        if (!s) s = new BlogPageSettings();

        const data = { ...req.body };
        // Banner image base64 hole Cloudinary te upload kore URL bosano
        if (data.bannerImage?.startsWith('data:')) {
            const { url, publicId } = await uploadImage(data.bannerImage);
            data.bannerImage = url;
            data.bannerImagePublicId = publicId;
        }

        Object.assign(s, data);
        await s.save();
        res.json(s);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;