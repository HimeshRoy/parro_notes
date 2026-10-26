import multer from "multer";
const storage = multer.memoryStorage();
const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/webm",
];
const fileFilter = (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        cb(new Error("Unsupported file type. Allowed: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, WEBP, MP4, WEBM"));
        return;
    }
    cb(null, true);
};
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
});
export default upload;
//# sourceMappingURL=upload.middleware.js.map