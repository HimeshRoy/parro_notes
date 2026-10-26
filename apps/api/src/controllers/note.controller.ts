import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNoteBySlug,
  getNotes,
  topicExists,
  updateNote,
} from "../services/note.service.js";

export async function createNoteController(
  req: Request,
  res: Response,
) {
  try {
    const {
      title,
      slug,
      description,
      topicId,
    } = req.body;

    const parentExists = await topicExists(topicId);

    if (!parentExists) {
      res.status(404).json({
        success: false,
        message: "Topic not found",
      });
      return;
    }

    const note = await createNote(
      title,
      slug,
      topicId,
      description,
    );

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Create note failed:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        success: false,
        message: "Note with this slug already exists for this topic",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to create note",
    });
  }
}

export async function getNotesController(
  req: Request,
  res: Response,
) {
  try {
    const topicId =
      typeof req.query.topicId === "string"
        ? req.query.topicId
        : undefined;

    const notes = await getNotes(topicId);

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Get notes failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
}

export async function getNoteByIdController(
  req: Request,
  res: Response,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
      return;
    }

    const note = await getNoteById(id);

    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
      return;
    }

    res.json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Get note failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
    });
  }
}

export async function getNoteBySlugController(
  req: Request,
  res: Response,
) {
  try {
    const {
      educationLevelSlug,
      programSlug,
      subjectSlug,
      topicSlug,
      noteSlug,
    } = req.params;

    if (
      typeof educationLevelSlug !== "string" ||
      typeof programSlug !== "string" ||
      typeof subjectSlug !== "string" ||
      typeof topicSlug !== "string" ||
      typeof noteSlug !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid note path",
      });
      return;
    }

    const note = await getNoteBySlug(
      educationLevelSlug,
      programSlug,
      subjectSlug,
      topicSlug,
      noteSlug,
    );

    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
      return;
    }

    res.json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Get note by slug failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
    });
  }
}

export async function updateNoteController(
  req: Request,
  res: Response,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
      return;
    }

    const {
      title,
      slug,
      description,
      topicId,
    } = req.body;

    const existingNote = await getNoteById(id);

    if (!existingNote) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
      return;
    }

    const parentExists = await topicExists(topicId);

    if (!parentExists) {
      res.status(404).json({
        success: false,
        message: "Topic not found",
      });
      return;
    }

    const note = await updateNote(
      id,
      title,
      slug,
      topicId,
      description,
    );

    res.json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Update note failed:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        success: false,
        message: "Note with this slug already exists for this topic",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to update note",
    });
  }
}

export async function deleteNoteController(
  req: Request,
  res: Response,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
      return;
    }

    const existingNote = await getNoteById(id);

    if (!existingNote) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
      return;
    }

    await deleteNote(id);

    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete note",
    });
  }
}