import type { UploadApiResponse } from "cloudinary";
export declare function uploadFileToCloudinary(buffer: Buffer, originalName: string, resourceType: "image" | "video" | "raw"): Promise<UploadApiResponse>;
export declare function deleteFileFromCloudinary(publicId: string, resourceType: "image" | "video" | "raw"): Promise<any>;
