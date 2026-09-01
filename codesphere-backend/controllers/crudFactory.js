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
    const result = await cloudinary.uploader.upload(base64, {
        folder: 'codesphere',
        // 🔴 FIX: auto-optimize — quality/format Cloudinary nijei best choose kore,
        // ar khub boro image hole max 1920px width e resize kore. Eta upload
        // size onek kome (kajei site e load hoyeo fast hoy), original quality
        // te kono lokkhoniyo pathok chokhe pore na.
        quality: 'auto',
        fetch_format: 'auto',
        width: 1920,
        crop: 'limit',
    });
    return { url: result.secure_url, publicId: result.public_id };
};

const deleteImage = async (publicId) => {
    if (publicId) await cloudinary.uploader.destroy(publicId);
};

// req theke socket.io instance ber kore shob connected client ke event pathano
const emitUpdate = (req, modelName, action, payload) => {
    const io = req.app.get('io');
    if (io) io.emit('dataUpdated', { model: modelName, action, payload });
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
            emitUpdate(req, Model.modelName, 'create', item);
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
            emitUpdate(req, Model.modelName, 'update', updated);
            res.json(updated);
        } catch (err) { res.status(400).json({ message: err.message }); }
    },
    remove: async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Not found' });
            if (imageField && item[imageField + 'PublicId']) await deleteImage(item[imageField + 'PublicId']);
            await item.deleteOne();
            emitUpdate(req, Model.modelName, 'delete', { _id: req.params.id });
            res.json({ message: 'Deleted' });
        } catch (err) { res.status(500).json({ message: err.message }); }
    },
});

module.exports = { createCRUD, uploadImage };