import { createNoteResource, deleteNoteResource, getNoteResourceById, getNoteResources, noteExists, updateNoteResource, } from "../services/noteResource.service.js";
import { deleteFileFromCloudinary, uploadFileToCloudinary, } from "../services/cloudinary.service.js";
const validResourceTypes = [
    "PDF",
    "DOCUMENT",
    "PRESENTATION",
    "IMAGE",
    "VIDEO",
    "EXTERNAL_LINK",
];
function getCloudinaryResourceTypeFromResourceType(type) {
    if (type === "IMAGE") {
        return "image";
    }
    if (type === "VIDEO") {
        return "video";
    }
    return "raw";
}
function isValidResourceType(type) {
    return (typeof type === "string" &&
        validResourceTypes.includes(type));
}
function getCloudinaryResourceType(mimetype) {
    if (mimetype.startsWith("image/")) {
        return "image";
    }
    if (mimetype.startsWith("video/")) {
        return "video";
    }
    return "raw";
}
function getResourceTypeFromMimeType(mimetype) {
    if (mimetype === "application/pdf") {
        return "PDF";
    }
    if (mimetype === "application/msword" ||
        mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        return "DOCUMENT";
    }
    if (mimetype === "application/vnd.ms-powerpoint" ||
        mimetype ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
        return "PRESENTATION";
    }
    if (mimetype.startsWith("image/")) {
        return "IMAGE";
    }
    if (mimetype.startsWith("video/")) {
        return "VIDEO";
    }
    return "EXTERNAL_LINK";
}
export async function createNoteResourceController(req, res) {
    try {
        const { noteId, title, type } = req.body;
        if (typeof noteId !== "string" || noteId.trim().length === 0) {
            res.status(400).json({
                success: false,
                message: "Note ID is required",
            });
            return;
        }
        const parentExists = await noteExists(noteId);
        if (!parentExists) {
            res.status(404).json({
                success: false,
                message: "Note not found",
            });
            return;
        }
        if (title !== undefined && title !== null && typeof title !== "string") {
            res.status(400).json({
                success: false,
                message: "Title must be a string",
            });
            return;
        }
        /*
         * EXTERNAL_LINK resources don't need a file.
         */
        if (type === "EXTERNAL_LINK") {
            const { url } = req.body;
            if (typeof url !== "string" || url.trim().length === 0) {
                res.status(400).json({
                    success: false,
                    message: "URL is required for external links",
                });
                return;
            }
            const resource = await createNoteResource(noteId, "EXTERNAL_LINK", url, title);
            res.status(201).json({
                success: true,
                data: resource,
            });
            return;
        }
        /*
         * All other resources require a real file.
         */
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "File is required",
            });
            return;
        }
        const detectedType = getResourceTypeFromMimeType(req.file.mimetype);
        if (isValidResourceType(type) && type !== detectedType) {
            res.status(400).json({
                success: false,
                message: `File type does not match resource type. Detected: ${detectedType}`,
            });
            return;
        }
        const cloudinaryResourceType = getCloudinaryResourceType(req.file.mimetype);
        const uploadResult = await uploadFileToCloudinary(req.file.buffer, req.file.originalname, cloudinaryResourceType);
        const resource = await createNoteResource(noteId, detectedType, uploadResult.secure_url, title, uploadResult.public_id);
        res.status(201).json({
            success: true,
            data: {
                ...resource,
                cloudinary: {
                    publicId: uploadResult.public_id,
                    resourceType: uploadResult.resource_type,
                    format: uploadResult.format,
                },
            },
        });
    }
    catch (error) {
        console.error("Create note resource failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create note resource",
        });
    }
}
export async function getNoteResourcesController(req, res) {
    try {
        const noteId = req.params.noteId;
        if (typeof noteId !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid note ID",
            });
            return;
        }
        const resources = await getNoteResources(noteId);
        res.json({
            success: true,
            data: resources,
        });
    }
    catch (error) {
        console.error("Get note resources failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch note resources",
        });
    }
}
export async function getNoteResourceByIdController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid note resource ID",
            });
            return;
        }
        const resource = await getNoteResourceById(id);
        if (!resource) {
            res.status(404).json({
                success: false,
                message: "Note resource not found",
            });
            return;
        }
        res.json({
            success: true,
            data: resource,
        });
    }
    catch (error) {
        console.error("Get note resource failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch note resource",
        });
    }
}
export async function updateNoteResourceController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid note resource ID",
            });
            return;
        }
        const existingResource = await getNoteResourceById(id);
        if (!existingResource) {
            res.status(404).json({
                success: false,
                message: "Note resource not found",
            });
            return;
        }
        const { title } = req.body;
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Replacement file is required",
            });
            return;
        }
        const detectedType = getResourceTypeFromMimeType(req.file.mimetype);
        if (detectedType === "EXTERNAL_LINK") {
            res.status(400).json({
                success: false,
                message: "Invalid replacement file type",
            });
            return;
        }
        const resourceType = getCloudinaryResourceType(req.file.mimetype);
        const uploadResult = await uploadFileToCloudinary(req.file.buffer, req.file.originalname, resourceType);
        const updatedResource = await updateNoteResource(id, detectedType, uploadResult.secure_url, title, uploadResult.public_id);
        if (existingResource.publicId) {
            const oldResourceType = getCloudinaryResourceTypeFromResourceType(existingResource.type);
            const deleteResult = await deleteFileFromCloudinary(existingResource.publicId, oldResourceType);
            if (deleteResult.result !== "ok" && deleteResult.result !== "not found") {
                console.error("Old Cloudinary file deletion failed:", deleteResult);
            }
        }
        res.json({
            success: true,
            message: "Note resource updated successfully",
            data: {
                ...updatedResource,
                cloudinary: {
                    publicId: uploadResult.public_id,
                    resourceType: uploadResult.resource_type,
                    format: uploadResult.format,
                },
            },
        });
    }
    catch (error) {
        console.error("Update note resource failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update note resource",
        });
    }
}
export async function deleteNoteResourceController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid note resource ID",
            });
            return;
        }
        const existingResource = await getNoteResourceById(id);
        if (!existingResource) {
            res.status(404).json({
                success: false,
                message: "Note resource not found",
            });
            return;
        }
        /*
         * Delete the Cloudinary file first.
         *
         * EXTERNAL_LINK resources have no publicId,
         * so there is nothing to delete from Cloudinary.
         */
        if (existingResource.publicId) {
            const cloudinaryResourceType = getCloudinaryResourceTypeFromResourceType(existingResource.type);
            const deleteResult = await deleteFileFromCloudinary(existingResource.publicId, cloudinaryResourceType);
            if (deleteResult.result !== "ok" && deleteResult.result !== "not found") {
                console.error("Cloudinary deletion failed:", deleteResult);
                res.status(500).json({
                    success: false,
                    message: "Failed to delete file from Cloudinary",
                });
                return;
            }
        }
        await deleteNoteResource(id);
        res.json({
            success: true,
            message: "Note resource and Cloudinary file deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete note resource failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete note resource",
        });
    }
}
//# sourceMappingURL=noteResource.controller.js.map