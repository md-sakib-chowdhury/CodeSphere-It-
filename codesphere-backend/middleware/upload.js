const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cloudinary env variable thakle cloud e upload hobe,
// na thakle server er nijer disk e (uploads/ folder) save hobe.
const useCloudinary = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

let upload;
let cloudinary;

if (useCloudinary) {
    // multer-storage-cloudinary use na kore, Cloudinary v2 SDK direct use kora hocche
    // (eta version conflict avoid kore, karon multer-storage-cloudinary cloudinary v1 chay)
    cloudinary = require('cloudinary').v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // File ke memory te rakhbe (disk e na), tarpor amra manually cloudinary te pathabo
    upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 8 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) cb(null, true);
            else cb(new Error('Shudhu image file upload kora jabe'));
        },
    });

    console.log('📤 Image upload: Cloudinary mode active');
} else {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadDir),
        filename: (req, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, unique + path.extname(file.originalname));
        },
    });

    upload = multer({
        storage,
        limits: { fileSize: 8 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) cb(null, true);
            else cb(new Error('Shudhu image file upload kora jabe'));
        },
    });

    console.log('📤 Image upload: Local disk mode active (uploads/ folder)');
}

// Cloudinary mode e buffer ke cloud e pathanor helper function
function uploadBufferToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'codesphere-uploads' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(buffer);
    });
}

module.exports = { upload, useCloudinary, uploadBufferToCloudinary };