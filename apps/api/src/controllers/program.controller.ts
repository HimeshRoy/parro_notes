import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";

import {
  createProgram,
  deleteProgram,
  educationLevelExists,
  getProgramById,
  getProgramBySlug,
  getPrograms,
  updateProgram,
} from "../services/program.service.js";

export async function createProgramController(req: Request, res: Response) {
  try {
    const { name, slug, description, educationLevelId } = req.body;

    if (!name || !slug || !educationLevelId) {
      res.status(400).json({
        success: false,
        message: "Name, slug, and education level are required",
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

    const program = await createProgram(
      name,
      slug,
      educationLevelId,
      description,
    );

    res.status(201).json({
      success: true,
      data: program,
    });
  } catch (error) {
    console.error("Create program failed:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
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

/* ============================================================
   GET PROGRAMS

   Optional:
   ?educationLevelId=<id>
============================================================ */

export async function getProgramsController(req: Request, res: Response) {
  try {
    const educationLevelId =
      typeof req.query.educationLevelId === "string"
        ? req.query.educationLevelId
        : undefined;

    const programs = await getPrograms(educationLevelId);

    res.json({
      success: true,
      data: programs,
    });
  } catch (error) {
    console.error("Get programs failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch programs",
    });
  }
}

export async function getProgramByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const program = await getProgramById(id as string);

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
  } catch (error) {
    console.error("Get program failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch program",
    });
  }
}

/* ============================================================
   GET PROGRAM BY HIERARCHICAL SLUG

   Example:
   /slug/school/class-10
============================================================ */

export async function getProgramBySlugController(req: Request, res: Response) {
  try {
    const { educationLevelSlug, programSlug } = req.params;

    const program = await getProgramBySlug(
      educationLevelSlug as string,
      programSlug as string,
    );

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
  } catch (error) {
    console.error("Get program by slug failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch program",
    });
  }
}

export async function updateProgramController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { name, slug, description, educationLevelId } = req.body;

    const existingProgram = await getProgramById(id as string);

    if (!existingProgram) {
      res.status(404).json({
        success: false,
        message: "Program not found",
      });

      return;
    }

    if (!name || !slug || !educationLevelId) {
      res.status(400).json({
        success: false,
        message: "Name, slug, and education level are required",
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

    const program = await updateProgram(
      id as string,
      name,
      slug,
      educationLevelId,
      description,
    );

    res.json({
      success: true,
      data: program,
    });
  } catch (error) {
    console.error("Update program failed:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
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

export async function deleteProgramController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const existingProgram = await getProgramById(id as string);

    if (!existingProgram) {
      res.status(404).json({
        success: false,
        message: "Program not found",
      });

      return;
    }

    await deleteProgram(id as string);

    res.json({
      success: true,
      message: "Program deleted successfully",
    });
  } catch (error) {
    console.error("Delete program failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete program",
    });
  }
}
