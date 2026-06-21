const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (base64) => {
    if (!base64 || !base64.startsWith('data:')) return { url: base64, publicId: '' };
    const result = await cloudinary.uploader.upload(base64, { folder: 'codesphere' });
    return { url: result.secure_url, publicId: result.public_id };
};

const deleteImage = async (publicId) => {
    if (publicId) await cloudinary.uploader.destroy(publicId);
};

const createCRUD = (Model, imageField = null) => ({
    getAll: async (req, res) => {
        try {
            const items = await Model.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: -1 });
            res.json(items);
        } catch (err) { res.status(500).json({ message: err.message }); }
    },
    getOne: async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Not found' });
            res.json(item);
        } catch (err) { res.status(500).json({ message: err.message }); }
    },
    create: async (req, res) => {
        try {
            let data = { ...req.body };
            if (imageField && data[imageField]?.startsWith('data:')) {
                const { url, publicId } = await uploadImage(data[imageField]);
                data[imageField] = url;
                data[imageField + 'PublicId'] = publicId;
            }
            const item = await Model.create(data);
            res.status(201).json(item);
        } catch (err) { res.status(400).json({ message: err.message }); }
    },
    update: async (req, res) => {
        try {
            let data = { ...req.body };
            const existing = await Model.findById(req.params.id);
            if (!existing) return res.status(404).json({ message: 'Not found' });
            if (imageField && data[imageField]?.startsWith('data:')) {
                if (existing[imageField + 'PublicId']) await deleteImage(existing[imageField + 'PublicId']);
                const { url, publicId } = await uploadImage(data[imageField]);
                data[imageField] = url;
                data[imageField + 'PublicId'] = publicId;
            }
            const updated = await Model.findByIdAndUpdate(req.params.id, data, { new: true });
            res.json(updated);
        } catch (err) { res.status(400).json({ message: err.message }); }
    },
    remove: async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Not found' });
            if (imageField && item[imageField + 'PublicId']) await deleteImage(item[imageField + 'PublicId']);
            await item.deleteOne();
            res.json({ message: 'Deleted' });
        } catch (err) { res.status(500).json({ message: err.message }); }
    },
});

module.exports = { createCRUD, uploadImage };