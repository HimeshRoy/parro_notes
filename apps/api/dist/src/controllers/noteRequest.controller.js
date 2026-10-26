import { createNoteRequest, deleteNoteRequest, getAllNoteRequests, getNoteRequestById, updateNoteRequestStatus, } from "../services/noteRequest.service.js";
import { isNonEmptyString, isValidEmail, isValidUuid, } from "../utils/validation.js";
const VALID_STATUSES = [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "REJECTED",
];
export async function createNoteRequestController(req, res) {
    try {
        const { name, email, message, educationLevelId, programId, subjectId, topicId, } = req.body;
        if (!isNonEmptyString(name) ||
            !isValidEmail(email) ||
            !isNonEmptyString(message)) {
            res.status(400).json({
                success: false,
                message: "Valid name, email and message are required",
            });
            return;
        }
        if (name.trim().length < 2) {
            res.status(400).json({
                success: false,
                message: "Name must be at least 2 characters",
            });
            return;
        }
        if (message.trim().length < 5) {
            res.status(400).json({
                success: false,
                message: "Message must be at least 5 characters",
            });
            return;
        }
        const optionalIds = [
            educationLevelId,
            programId,
            subjectId,
            topicId,
        ];
        for (const id of optionalIds) {
            if (id !== undefined && (!isNonEmptyString(id) || !isValidUuid(id))) {
                res.status(400).json({
                    success: false,
                    message: "Invalid education hierarchy ID",
                });
                return;
            }
        }
        const request = await createNoteRequest(name.trim(), email.trim().toLowerCase(), message.trim(), typeof educationLevelId === "string"
            ? educationLevelId
            : undefined, typeof programId === "string"
            ? programId
            : undefined, typeof subjectId === "string"
            ? subjectId
            : undefined, typeof topicId === "string"
            ? topicId
            : undefined);
        res.status(201).json({
            success: true,
            message: "Note request submitted successfully",
            data: request,
        });
    }
    catch (error) {
        console.error("Create note request failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit note request",
        });
    }
}
export async function getAllNoteRequestsController(req, res) {
    try {
        const pageParam = req.query.page;
        const limitParam = req.query.limit;
        const statusParam = req.query.status;
        const page = typeof pageParam === "string"
            ? Number(pageParam)
            : 1;
        const limit = typeof limitParam === "string"
            ? Number(limitParam)
            : 20;
        if (!Number.isInteger(page) || page < 1) {
            res.status(400).json({
                success: false,
                message: "Page must be a positive integer",
            });
            return;
        }
        if (!Number.isInteger(limit) ||
            limit < 1 ||
            limit > 100) {
            res.status(400).json({
                success: false,
                message: "Limit must be an integer between 1 and 100",
            });
            return;
        }
        if (statusParam !== undefined &&
            typeof statusParam !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid status",
            });
            return;
        }
        if (typeof statusParam === "string" &&
            !VALID_STATUSES.includes(statusParam)) {
            res.status(400).json({
                success: false,
                message: "Invalid status. Allowed: PENDING, IN_PROGRESS, COMPLETED, REJECTED",
            });
            return;
        }
        const status = typeof statusParam === "string"
            ? statusParam
            : undefined;
        const result = await getAllNoteRequests(page, limit, status);
        res.json({
            success: true,
            data: result.requests,
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit),
            },
        });
    }
    catch (error) {
        console.error("Get note requests failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch note requests",
        });
    }
}
export async function getNoteRequestByIdController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string" ||
            !isValidUuid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid note request ID",
            });
            return;
        }
        const request = await getNoteRequestById(id);
        if (!request) {
            res.status(404).json({
                success: false,
                message: "Note request not found",
            });
            return;
        }
        res.json({
            success: true,
            data: request,
        });
    }
    catch (error) {
        console.error("Get note request failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch note request",
        });
    }
}
export async function updateNoteRequestStatusController(req, res) {
    try {
        const id = req.params.id;
        const { status } = req.body;
        if (typeof id !== "string" ||
            !isValidUuid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid note request ID",
            });
            return;
        }
        if (typeof status !== "string" ||
            !VALID_STATUSES.includes(status)) {
            res.status(400).json({
                success: false,
                message: "Invalid status. Allowed: PENDING, IN_PROGRESS, COMPLETED, REJECTED",
            });
            return;
        }
        const request = await updateNoteRequestStatus(id, status);
        res.json({
            success: true,
            message: "Note request status updated successfully",
            data: request,
        });
    }
    catch (error) {
        console.error("Update note request status failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update note request status",
        });
    }
}
export async function deleteNoteRequestController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string" ||
            !isValidUuid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid note request ID",
            });
            return;
        }
        await deleteNoteRequest(id);
        res.json({
            success: true,
            message: "Note request deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete note request failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete note request",
        });
    }
}
//# sourceMappingURL=noteRequest.controller.js.map