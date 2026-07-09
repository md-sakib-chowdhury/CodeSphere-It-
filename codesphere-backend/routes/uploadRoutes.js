const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { upload, useCloudinary, uploadBufferToCloudinary } = require('../middleware/upload');

// POST /api/upload  (field name: "image")
router.post('/', protect, upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'Kono file upload hoyni' });

    try {
        if (useCloudinary) {
            // Cloudinary mode: file ta memory te ache (req.file.buffer), cloud e pathanor pore URL pabo
            const result = await uploadBufferToCloudinary(req.file.buffer);
            return res.json({ url: result.secure_url });
        }

        // Local disk mode: file already save hoye geche, URL banachi
        const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ url });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;