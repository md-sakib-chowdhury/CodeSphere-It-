const router = require('express').Router();
const Settings = require('../models/Settings');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/crudFactory');
const cloudinary = require('cloudinary').v2;

const SETTINGS_KEY = 'site-settings';

// Public — Gallery page banner image fetch korar jonno
router.get('/gallery-banner', async (req, res) => {
    try {
        const settings = await Settings.findOne({ key: SETTINGS_KEY });
        res.json({ imageUrl: settings?.galleryBannerImage || null });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin — banner image set/update kora (upload kora holei purano ta replace hoye jabe)
router.put('/gallery-banner', protect, checkPermission('manageGallery'), async (req, res) => {
    try {
        const { image } = req.body; // 'data:...' base64 string

        let settings = await Settings.findOne({ key: SETTINGS_KEY });
        if (!settings) settings = new Settings({ key: SETTINGS_KEY });

        if (image?.startsWith('data:')) {
            // Purano image thakle Cloudinary theke delete kore dao
            if (settings.galleryBannerImagePublicId) {
                await cloudinary.uploader.destroy(settings.galleryBannerImagePublicId).catch(() => { });
            }
            const { url, publicId } = await uploadImage(image);
            settings.galleryBannerImage = url;
            settings.galleryBannerImagePublicId = publicId;
        }

        await settings.save();
        res.json({ imageUrl: settings.galleryBannerImage });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin — banner image remove kore default gradient-e ferot jaoa
router.delete('/gallery-banner', protect, checkPermission('manageGallery'), async (req, res) => {
    try {
        const settings = await Settings.findOne({ key: SETTINGS_KEY });
        if (settings?.galleryBannerImagePublicId) {
            await cloudinary.uploader.destroy(settings.galleryBannerImagePublicId).catch(() => { });
        }
        if (settings) {
            settings.galleryBannerImage = '';
            settings.galleryBannerImagePublicId = '';
            await settings.save();
        }
        res.json({ message: 'Banner image removed' });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;