import type { Request, Response } from "express";
import {
  createEducationLevel,
  deleteEducationLevel,
  getEducationLevelById,
  getEducationLevelBySlug,
  getEducationLevels,
  updateEducationLevel,
} from "../services/educationLevel.service.js";
import { Prisma } from "../../generated/prisma/client.js";

export async function createEducationLevelController(
  req: Request,
  res: Response,
) {
  try {
    const { name, slug, description } = req.body;

    const educationLevel = await createEducationLevel(name, slug, description);

    res.status(201).json({
      success: true,
      data: educationLevel,
    });
  } catch (error) {
    console.error("Create education level failed:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        success: false,
        message: "Education level with this name or slug already exists",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to create education level",
    });
  }
}

export async function getEducationLevelsController(
  _req: Request,
  res: Response,
) {
  try {
    const educationLevels = await getEducationLevels();

    res.json({
      success: true,
      data: educationLevels,
    });
  } catch (error) {
    console.error("Get education levels failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch education levels",
    });
  }
}

export async function getEducationLevelByIdController(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params;

    const educationLevel = await getEducationLevelById(id as string);

    if (!educationLevel) {
      res.status(404).json({
        success: false,
        message: "Education level not found",
      });

      return;
    }

    res.json({
      success: true,
      data: educationLevel,
    });
  } catch (error) {
    console.error("Get education level failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch education level",
    });
  }
}

export async function getEducationLevelBySlugController(
  req: Request,
  res: Response,
) {
  try {
    const { slug } = req.params;

    const educationLevel = await getEducationLevelBySlug(slug as string);

    if (!educationLevel) {
      res.status(404).json({
        success: false,
        message: "Education level not found",
      });

      return;
    }

    res.json({
      success: true,
      data: educationLevel,
    });
  } catch (error) {
    console.error("Get education level by slug failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch education level",
    });
  }
}

export async function updateEducationLevelController(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    const existingEducationLevel = await getEducationLevelById(id as string);

    if (!existingEducationLevel) {
      res.status(404).json({
        success: false,
        message: "Education level not found",
      });

      return;
    }

    const educationLevel = await updateEducationLevel(
      id as string,
      name,
      slug,
      description,
    );

    res.json({
      success: true,
      data: educationLevel,
    });
  } catch (error) {
    console.error("Update education level failed:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        success: false,
        message: "Education level with this name or slug already exists",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to update education level",
    });
  }
}

export async function deleteEducationLevelController(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params;

    const existingEducationLevel = await getEducationLevelById(id as string);

    if (!existingEducationLevel) {
      res.status(404).json({
        success: false,
        message: "Education level not found",
      });

      return;
    }

    await deleteEducationLevel(id as string);

    res.json({
      success: true,
      message: "Education level deleted successfully",
    });
  } catch (error) {
    console.error("Delete education level failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete education level",
    });
  }
}
