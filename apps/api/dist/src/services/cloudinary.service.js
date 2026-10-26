import cloudinary from "../lib/cloudinary.js";
export function uploadFileToCloudinary(buffer, originalName, resourceType) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: resourceType,
            folder: "parro-notes",
            use_filename: true,
            unique_filename: true,
            filename_override: originalName,
        }, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            if (!result) {
                reject(new Error("Cloudinary upload returned no result"));
                return;
            }
            resolve(result);
        });
        uploadStream.end(buffer);
    });
}
export async function deleteFileFromCloudinary(publicId, resourceType) {
    return cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
        invalidate: true,
    });
}
//# sourceMappingURL=cloudinary.service.js.map