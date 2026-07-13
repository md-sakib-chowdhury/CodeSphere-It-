// // const router = require('express').Router();
// // const HomeSections = require('../models/HomeSections');
// // const { protect, checkPermission } = require('../middleware/authMiddleware');
// // const { uploadImage } = require('../controllers/crudFactory');

// // router.get('/', async (req, res) => {
// //     try {
// //         let h = await HomeSections.findOne();
// //         if (!h) {
// //             h = await HomeSections.create({
// //                 keyCompetency: {
// //                     skills: [
// //                         { label: 'Web Development', value: 96 },
// //                         { label: 'UI/UX Design', value: 93 },
// //                         { label: 'Cyber Security', value: 88 },
// //                     ],
// //                 },
// //                 whyChooseUs: {
// //                     images: [
// //                         { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', caption: 'Professional Strategy' },
// //                         { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80', caption: 'Great Communication' },
// //                     ],
// //                 },
// //             });
// //         }
// //         res.json(h);
// //     } catch (err) { res.status(500).json({ message: err.message }); }
// // });

// // router.put('/', protect, checkPermission('manageHomeSections'), async (req, res) => {
// //     try {
// //         let h = await HomeSections.findOne();
// //         if (!h) h = new HomeSections();
// //         const data = { ...req.body };

// //         // WhatWeOffer image upload (jodi notun base64 image dewa hoy)
// //         if (data.whatWeOffer?.image?.startsWith('data:')) {
// //             if (h.whatWeOffer?.imagePublicId) {
// //                 const cloudinary = require('cloudinary').v2;
// //                 await cloudinary.uploader.destroy(h.whatWeOffer.imagePublicId).catch(() => { });
// //             }
// //             const { url, publicId } = await uploadImage(data.whatWeOffer.image);
// //             data.whatWeOffer.image = url;
// //             data.whatWeOffer.imagePublicId = publicId;
// //         }

// //         // KeyCompetency image upload
// //         if (data.keyCompetency?.image?.startsWith('data:')) {
// //             if (h.keyCompetency?.imagePublicId) {
// //                 const cloudinary = require('cloudinary').v2;
// //                 await cloudinary.uploader.destroy(h.keyCompetency.imagePublicId).catch(() => { });
// //             }
// //             const { url, publicId } = await uploadImage(data.keyCompetency.image);
// //             data.keyCompetency.image = url;
// //             data.keyCompetency.imagePublicId = publicId;
// //         }

// //         // WhyChooseUs images upload (array of 2)
// //         if (Array.isArray(data.whyChooseUs?.images)) {
// //             for (let i = 0; i < data.whyChooseUs.images.length; i++) {
// //                 const img = data.whyChooseUs.images[i];
// //                 if (img.url?.startsWith('data:')) {
// //                     const oldPublicId = h.whyChooseUs?.images?.[i]?.publicId;
// //                     if (oldPublicId) {
// //                         const cloudinary = require('cloudinary').v2;
// //                         await cloudinary.uploader.destroy(oldPublicId).catch(() => { });
// //                     }
// //                     const { url, publicId } = await uploadImage(img.url);
// //                     data.whyChooseUs.images[i].url = url;
// //                     data.whyChooseUs.images[i].publicId = publicId;
// //                 }
// //             }
// //         }

// //         Object.assign(h, data);
// //         await h.save();
// //         res.json(h);
// //     } catch (err) { res.status(500).json({ message: err.message }); }
// // });

// // module.exports = router;
// const router = require('express').Router();
// const HomeSections = require('../models/HomeSections');
// const { protect, checkPermission } = require('../middleware/authMiddleware');
// const { uploadImage } = require('../controllers/crudFactory');

// router.get('/', async (req, res) => {
//     try {
//         let h = await HomeSections.findOne();
//         if (!h) {
//             h = await HomeSections.create({
//                 keyCompetency: {
//                     skills: [
//                         { label: 'Web Development', value: 96 },
//                         { label: 'UI/UX Design', value: 93 },
//                         { label: 'Cyber Security', value: 88 },
//                     ],
//                 },
//                 whyChooseUs: {
//                     images: [
//                         { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', caption: 'Professional Strategy' },
//                         { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80', caption: 'Great Communication' },
//                     ],
//                 },
//                 statsCards: [
//                     { value: '28+', label: 'Projects Built', desc: 'Real-world MERN stack projects shipped and deployed.' },
//                     { value: '2+', label: 'Years of Craft', desc: 'Building with the MERN stack since 2024.' },
//                     { value: 'MERN', label: 'Core Stack', desc: 'MongoDB, Express, React, Node — our specialty end to end.' },
//                     { value: '100%', label: 'Commitment', desc: 'Every project gets our full focus, start to finish.' },
//                 ],
//             });
//         }
//         res.json(h);
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });

// router.put('/', protect, checkPermission('manageHomeSections'), async (req, res) => {
//     try {
//         let h = await HomeSections.findOne();
//         if (!h) h = new HomeSections();
//         const data = { ...req.body };

//         // WhatWeOffer image upload (jodi notun base64 image dewa hoy)
//         if (data.whatWeOffer?.image?.startsWith('data:')) {
//             if (h.whatWeOffer?.imagePublicId) {
//                 const cloudinary = require('cloudinary').v2;
//                 await cloudinary.uploader.destroy(h.whatWeOffer.imagePublicId).catch(() => { });
//             }
//             const { url, publicId } = await uploadImage(data.whatWeOffer.image);
//             data.whatWeOffer.image = url;
//             data.whatWeOffer.imagePublicId = publicId;
//         }

//         // KeyCompetency image upload
//         if (data.keyCompetency?.image?.startsWith('data:')) {
//             if (h.keyCompetency?.imagePublicId) {
//                 const cloudinary = require('cloudinary').v2;
//                 await cloudinary.uploader.destroy(h.keyCompetency.imagePublicId).catch(() => { });
//             }
//             const { url, publicId } = await uploadImage(data.keyCompetency.image);
//             data.keyCompetency.image = url;
//             data.keyCompetency.imagePublicId = publicId;
//         }

//         // WhyChooseUs images upload (array of 2)
//         if (Array.isArray(data.whyChooseUs?.images)) {
//             for (let i = 0; i < data.whyChooseUs.images.length; i++) {
//                 const img = data.whyChooseUs.images[i];
//                 if (img.url?.startsWith('data:')) {
//                     const oldPublicId = h.whyChooseUs?.images?.[i]?.publicId;
//                     if (oldPublicId) {
//                         const cloudinary = require('cloudinary').v2;
//                         await cloudinary.uploader.destroy(oldPublicId).catch(() => { });
//                     }
//                     const { url, publicId } = await uploadImage(img.url);
//                     data.whyChooseUs.images[i].url = url;
//                     data.whyChooseUs.images[i].publicId = publicId;
//                 }
//             }
//         }

//         Object.assign(h, data);
//         await h.save();
//         res.json(h);
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });

// module.exports = router;
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
                statsCards: [
                    { value: '28+', label: 'Projects Built', desc: 'Real-world MERN stack projects shipped and deployed.', tone: 1 },
                    { value: '2+', label: 'Years of Craft', desc: 'Building with the MERN stack since 2024.', tone: 2 },
                    { value: 'MERN', label: 'Core Stack', desc: 'MongoDB, Express, React, Node — our specialty end to end.', tone: 3 },
                    { value: '100%', label: 'Commitment', desc: 'Every project gets our full focus, start to finish.', tone: 4 },
                ],
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

        // LatestActivities cards image upload (jotota card thake totota loop hobe)
        if (Array.isArray(data.latestActivities?.cards)) {
            for (let i = 0; i < data.latestActivities.cards.length; i++) {
                const card = data.latestActivities.cards[i];
                if (card.image?.startsWith('data:')) {
                    const oldPublicId = h.latestActivities?.cards?.[i]?.imagePublicId;
                    if (oldPublicId) {
                        const cloudinary = require('cloudinary').v2;
                        await cloudinary.uploader.destroy(oldPublicId).catch(() => { });
                    }
                    const { url, publicId } = await uploadImage(card.image);
                    data.latestActivities.cards[i].image = url;
                    data.latestActivities.cards[i].imagePublicId = publicId;
                }
            }
        }

        Object.assign(h, data);
        await h.save();
        res.json(h);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;