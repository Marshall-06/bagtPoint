const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads/avatars";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `avatar-${Date.now()}${ext}`);
    },
});

const imageFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG, and WEBP images are allowed"), false);
    }
};

const multerUpload = multer({
    storage: avatarStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
}).single("avatar_img");

// ✅ wrap in promise so errors are caught by controller
const uploadAvatar = (req, res, next) => {
    multerUpload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        // ✅ ensure req.body is never undefined
        req.body = req.body || {};
        next();
    });
};

module.exports = { uploadAvatar };