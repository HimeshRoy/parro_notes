import { uploadFileToCloudinary } from "../services/cloudinary.service.js";
function getCloudinaryResourceType(mimetype) {
    if (mimetype.startsWith("image/")) {
        return "image";
    }
    if (mimetype.startsWith("video/")) {
        return "video";
    }
    return "raw";
}
export async function uploadFileController(req, res) {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
            return;
        }
        const resourceType = getCloudinaryResourceType(req.file.mimetype);
        const result = await uploadFileToCloudinary(req.file.buffer, req.file.originalname, resourceType);
        res.status(201).json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                resourceType: result.resource_type,
                format: result.format,
                originalName: req.file.originalname,
                size: req.file.size,
            },
        });
    }
    catch (error) {
        console.error("File upload failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload file",
        });
    }
}
//# sourceMappingURL=upload.controller.js.map