const path = require("path");
const multer = require("multer");

const uploader = (folder, allowedFileTypes, maxSize) => {
    // define storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${folder}`);
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    });

    // filtering files
    const fileFilter = (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`${allowedFileTypes.toString()} are allowed!`), false);
        }
    }

    // upload function
    const upload = multer({
        storage,
        limits: { fileSize: maxSize * 1024 * 1024 },
        fileFilter
    });

    return upload;
}

module.exports = uploader;