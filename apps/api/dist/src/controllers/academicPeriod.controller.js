import { Prisma } from "../../generated/prisma/client.js";
import { createAcademicPeriod, deleteAcademicPeriod, getAcademicPeriodById, getAcademicPeriods, programExists, updateAcademicPeriod, } from "../services/academicPeriod.service.js";
export async function createAcademicPeriodController(req, res) {
    try {
        const { name, slug, description, programId } = req.body;
        const parentExists = await programExists(programId);
        if (!parentExists) {
            res.status(404).json({
                success: false,
                message: "Program not found",
            });
            return;
        }
        const academicPeriod = await createAcademicPeriod(name, slug, programId, description);
        res.status(201).json({
            success: true,
            data: academicPeriod,
        });
    }
    catch (error) {
        console.error("Create academic period failed:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            res.status(409).json({
                success: false,
                message: "Academic period with this name or slug already exists",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Failed to create academic period",
        });
    }
}
export async function getAcademicPeriodsController(_req, res) {
    try {
        const academicPeriods = await getAcademicPeriods();
        res.json({
            success: true,
            data: academicPeriods,
        });
    }
    catch (error) {
        console.error("Get academic periods failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch academic periods",
        });
    }
}
export async function getAcademicPeriodByIdController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid academic period ID",
            });
            return;
        }
        const academicPeriod = await getAcademicPeriodById(id);
        if (!academicPeriod) {
            res.status(404).json({
                success: false,
                message: "Academic period not found",
            });
            return;
        }
        res.json({
            success: true,
            data: academicPeriod,
        });
    }
    catch (error) {
        console.error("Get academic period failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch academic period",
        });
    }
}
export async function updateAcademicPeriodController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid academic period ID",
            });
            return;
        }
        const { name, slug, description, programId } = req.body;
        const existingAcademicPeriod = await getAcademicPeriodById(id);
        if (!existingAcademicPeriod) {
            res.status(404).json({
                success: false,
                message: "Academic period not found",
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
        const academicPeriod = await updateAcademicPeriod(id, name, slug, programId, description);
        res.json({
            success: true,
            data: academicPeriod,
        });
    }
    catch (error) {
        console.error("Update academic period failed:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            res.status(409).json({
                success: false,
                message: "Academic period with this name or slug already exists",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Failed to update academic period",
        });
    }
}
export async function deleteAcademicPeriodController(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid academic period ID",
            });
            return;
        }
        const existingAcademicPeriod = await getAcademicPeriodById(id);
        if (!existingAcademicPeriod) {
            res.status(404).json({
                success: false,
                message: "Academic period not found",
            });
            return;
        }
        await deleteAcademicPeriod(id);
        res.json({
            success: true,
            message: "Academic period deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete academic period failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete academic period",
        });
    }
}
//# sourceMappingURL=academicPeriod.controller.js.map