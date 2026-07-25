// const router = require('express').Router();
// const ExplorePage = require('../models/ExplorePage');
// const { protect, checkPermission } = require('../middleware/authMiddleware');
// const { uploadImage } = require('../controllers/crudFactory');
// const cloudinary = require('cloudinary').v2;

// router.get('/', async (req, res) => {
//     try {
//         let p = await ExplorePage.findOne();
//         if (!p) p = await ExplorePage.create({});
//         res.json(p);
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });

// router.put('/', protect, checkPermission('manageExploreUs'), async (req, res) => {
//     try {
//         let p = await ExplorePage.findOne();
//         if (!p) p = new ExplorePage();
//         const data = { ...req.body };

//         const sections = ['aboutUs', 'mission', 'vision', 'workplace'];
//         for (const key of sections) {
//             if (data[key]?.image?.startsWith('data:')) {
//                 if (p[key]?.imagePublicId) {
//                     await cloudinary.uploader.destroy(p[key].imagePublicId).catch(() => { });
//                 }
//                 const { url, publicId } = await uploadImage(data[key].image);
//                 data[key].image = url;
//                 data[key].imagePublicId = publicId;
//             }
//         }

//         Object.assign(p, data);
//         await p.save();
//         res.json(p);
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });

// module.exports = router;
const router = require('express').Router();
const ExplorePage = require('../models/ExplorePage');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/crudFactory');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
    try {
        let p = await ExplorePage.findOne();
        if (!p) p = await ExplorePage.create({});
        res.json(p);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, checkPermission('manageExploreUs'), async (req, res) => {
    try {
        let p = await ExplorePage.findOne();
        if (!p) p = new ExplorePage();
        const data = { ...req.body };

        // Top-level banner image (not nested under a section)
        if (data.bannerImage?.startsWith('data:')) {
            if (p.bannerImagePublicId) {
                await cloudinary.uploader.destroy(p.bannerImagePublicId).catch(() => { });
            }
            const { url, publicId } = await uploadImage(data.bannerImage);
            data.bannerImage = url;
            data.bannerImagePublicId = publicId;
        }

        const sections = ['aboutUs', 'mission', 'vision', 'workplace'];
        for (const key of sections) {
            if (data[key]?.image?.startsWith('data:')) {
                if (p[key]?.imagePublicId) {
                    await cloudinary.uploader.destroy(p[key].imagePublicId).catch(() => { });
                }
                const { url, publicId } = await uploadImage(data[key].image);
                data[key].image = url;
                data[key].imagePublicId = publicId;
            }
        }

        Object.assign(p, data);
        await p.save();
        res.json(p);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;