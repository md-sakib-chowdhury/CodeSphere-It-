const router = require('express').Router();
const HomeSections = require('../models/HomeSections');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/crudFactory');

router.get('/', async (req, res) => {
    try {
        let h = await HomeSections.findOne();
        if (!h) {
            h = await HomeSections.create({
                keyCompetency: {
                    skills: [
                        { label: 'Web Development', value: 96 },
                        { label: 'UI/UX Design', value: 93 },
                        { label: 'Cyber Security', value: 88 },
                    ],
                },
                whyChooseUs: {
                    images: [
                        { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', caption: 'Professional Strategy' },
                        { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80', caption: 'Great Communication' },
                    ],
                },
            });
        }
        res.json(h);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, checkPermission('manageHomeSections'), async (req, res) => {
    try {
        let h = await HomeSections.findOne();
        if (!h) h = new HomeSections();
        const data = { ...req.body };

        // WhatWeOffer image upload (jodi notun base64 image dewa hoy)
        if (data.whatWeOffer?.image?.startsWith('data:')) {
            if (h.whatWeOffer?.imagePublicId) {
                const cloudinary = require('cloudinary').v2;
                await cloudinary.uploader.destroy(h.whatWeOffer.imagePublicId).catch(() => { });
            }
            const { url, publicId } = await uploadImage(data.whatWeOffer.image);
            data.whatWeOffer.image = url;
            data.whatWeOffer.imagePublicId = publicId;
        }

        // KeyCompetency image upload
        if (data.keyCompetency?.image?.startsWith('data:')) {
            if (h.keyCompetency?.imagePublicId) {
                const cloudinary = require('cloudinary').v2;
                await cloudinary.uploader.destroy(h.keyCompetency.imagePublicId).catch(() => { });
            }
            const { url, publicId } = await uploadImage(data.keyCompetency.image);
            data.keyCompetency.image = url;
            data.keyCompetency.imagePublicId = publicId;
        }

        // WhyChooseUs images upload (array of 2)
        if (Array.isArray(data.whyChooseUs?.images)) {
            for (let i = 0; i < data.whyChooseUs.images.length; i++) {
                const img = data.whyChooseUs.images[i];
                if (img.url?.startsWith('data:')) {
                    const oldPublicId = h.whyChooseUs?.images?.[i]?.publicId;
                    if (oldPublicId) {
                        const cloudinary = require('cloudinary').v2;
                        await cloudinary.uploader.destroy(oldPublicId).catch(() => { });
                    }
                    const { url, publicId } = await uploadImage(img.url);
                    data.whyChooseUs.images[i].url = url;
                    data.whyChooseUs.images[i].publicId = publicId;
                }
            }
        }

        Object.assign(h, data);
        await h.save();
        res.json(h);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;