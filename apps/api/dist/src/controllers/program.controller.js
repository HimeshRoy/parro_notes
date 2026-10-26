import { Prisma } from "../../generated/prisma/client.js";
import { createProgram, deleteProgram, educationLevelExists, getProgramById, getPrograms, updateProgram, } from "../services/program.service.js";
export async function createProgramController(req, res) {
    try {
        const { name, slug, description, educationLevelId } = req.body;
        const parentExists = await educationLevelExists(educationLevelId);
        if (!parentExists) {
            res.status(404).json({
                success: false,
                message: "Education level not found",
            });
            return;
        }
        const program = await createProgram(name, slug, educationLevelId, description);
        res.status(201).json({
            success: true,
            data: program,
        });
    }
    catch (error) {
        console.error("Create program failed:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            res.status(409).json({
                success: false,
                message: "Program with this name or slug already exists",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Failed to create program",
        });
    }
}
export async function getProgramsController(_req, res) {
    try {
        const programs = await getPrograms();
        res.json({
            success: true,
            data: programs,
        });
    }
    catch (error) {
        console.error("Get programs failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch programs",
        });
    }
}
export async function getProgramByIdController(req, res) {
    try {
        const { id } = req.params;
        const program = await getProgramById(id);
        if (!program) {
            res.status(404).json({
                success: false,
                message: "Program not found",
            });
            return;
        }
        res.json({
            success: true,
            data: program,
        });
    }
    catch (error) {
        console.error("Get program failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch program",
        });
    }
}
export async function updateProgramController(req, res) {
    try {
        const { id } = req.params;
        const { name, slug, description, educationLevelId } = req.body;
        const existingProgram = await getProgramById(id);
        if (!existingProgram) {
            res.status(404).json({
                success: false,
                message: "Program not found",
            });
            return;
        }
        const parentExists = await educationLevelExists(educationLevelId);
        if (!parentExists) {
            res.status(404).json({
                success: false,
                message: "Education level not found",
            });
            return;
        }
        const program = await updateProgram(id, name, slug, educationLevelId, description);
        res.json({
            success: true,
            data: program,
        });
    }
    catch (error) {
        console.error("Update program failed:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            res.status(409).json({
                success: false,
                message: "Program with this name or slug already exists",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Failed to update program",
        });
    }
}
export async function deleteProgramController(req, res) {
    try {
        const { id } = req.params;
        const existingProgram = await getProgramById(id);
        if (!existingProgram) {
            res.status(404).json({
                success: false,
                message: "Program not found",
            });
            return;
        }
        await deleteProgram(id);
        res.json({
            success: true,
            message: "Program deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete program failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete program",
        });
    }
}
//# sourceMappingURL=program.controller.js.map