import { Prisma } from "../../generated/prisma/client.js";
import { programExists, createSubject, deleteSubject, getSubjectById, getSubjects, updateSubject, } from "../services/subject.service.js";
export async function createSubjectController(req, res) {
    try {
        const { name, slug, code, description, programId } = req.body;
        if (!name || !slug || !programId) {
            res.status(400).json({
                success: false,
                message: "Name, slug, and programId are required",
            });
            return;
        }
        const parentExists = await programExists(programId);
        if (!parentExists) {
            res.status(404).json({
                success: false,
                message: "Program not found",
            });
            return;
        }
        const subject = await createSubject(name, slug, programId, code, description);
        res.status(201).json({
            success: true,
            data: subject,
        });
    }
    catch (error) {
        console.error("Create subject failed:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            res.status(409).json({
                success: false,
                message: "Subject with this name or slug already exists",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Failed to create subject",
        });
    }
}
export async function getSubjectsController(_req, res) {
    try {
        const subjects = await getSubjects();
        res.json({
            success: true,
            data: subjects,
        });
    }
    catch (error) {
        console.error("Get subjects failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch subjects",
        });
    }
}
export async function getSubjectByIdController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid subject ID",
            });
            return;
        }
        const subject = await getSubjectById(id);
        if (!subject) {
            res.status(404).json({
                success: false,
                message: "Subject not found",
            });
            return;
        }
        res.json({
            success: true,
            data: subject,
        });
    }
    catch (error) {
        console.error("Get subject failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch subject",
        });
    }
}
export async function updateSubjectController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid subject ID",
            });
            return;
        }
        const { name, slug, code, description, programId } = req.body;
        if (!name || !slug || !programId) {
            res.status(400).json({
                success: false,
                message: "Name, slug, and programId are required",
            });
            return;
        }
        const existingSubject = await getSubjectById(id);
        if (!existingSubject) {
            res.status(404).json({
                success: false,
                message: "Subject not found",
            });
            return;
        }
        const parentExists = await programExists(programId);
        if (!parentExists) {
            res.status(404).json({
                success: false,
                message: "Program not found",
            });
            return;
        }
        const subject = await updateSubject(id, name, slug, programId, code, description);
        res.json({
            success: true,
            data: subject,
        });
    }
    catch (error) {
        console.error("Update subject failed:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            res.status(409).json({
                success: false,
                message: "Subject with this name or slug already exists",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Failed to update subject",
        });
    }
}
export async function deleteSubjectController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid subject ID",
            });
            return;
        }
        const existingSubject = await getSubjectById(id);
        if (!existingSubject) {
            res.status(404).json({
                success: false,
                message: "Subject not found",
            });
            return;
        }
        await deleteSubject(id);
        res.json({
            success: true,
            message: "Subject deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete subject failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete subject",
        });
    }
}
//# sourceMappingURL=subject.controller.js.map