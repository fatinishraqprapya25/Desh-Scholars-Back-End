const path = require("path");
const multer = require("multer");
const fs = require("fs");

const uploader = (folder, allowedFileTypes, maxSize) => {
    const uploadPath = path.join(__dirname, "../uploads", folder);

    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    });

    const fileFilter = (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Only ${allowedFileTypes.join(", ")} are allowed!`), false);
        }
    };

    return multer({
        storage,
        limits: { fileSize: maxSize * 1024 * 1024 },
        fileFilter
    });
};

module.exports = uploader;
