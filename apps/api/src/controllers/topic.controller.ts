import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import {
  createTopic,
  deleteTopic,
  getTopicById,
  getTopicBySlug,
  getTopics,
  subjectExists,
  updateTopic,
} from "../services/topic.service.js";

export async function createTopicController(
  req: Request,
  res: Response,
) {
  try {
    const {
      name,
      slug,
      description,
      subjectId,
    } = req.body;

    const parentExists = await subjectExists(subjectId);

    if (!parentExists) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });
      return;
    }

    const topic = await createTopic(
      name,
      slug,
      subjectId,
      description,
    );

    res.status(201).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error("Create topic failed:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        success: false,
        message: "Topic with this name or slug already exists",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to create topic",
    });
  }
}

export async function getTopicsController(
  req: Request,
  res: Response,
) {
  try {
    const subjectId =
      typeof req.query.subjectId === "string"
        ? req.query.subjectId
        : undefined;

    const topics = await getTopics(subjectId);

    res.json({
      success: true,
      data: topics,
    });
  } catch (error) {
    console.error("Get topics failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch topics",
    });
  }
}

export async function getTopicByIdController(
  req: Request,
  res: Response,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid topic ID",
      });
      return;
    }

    const topic = await getTopicById(id);

    if (!topic) {
      res.status(404).json({
        success: false,
        message: "Topic not found",
      });
      return;
    }

    res.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error("Get topic failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch topic",
    });
  }
}

export async function getTopicBySlugController(
  req: Request,
  res: Response,
) {
  try {
    const {
      educationLevelSlug,
      programSlug,
      subjectSlug,
      topicSlug,
    } = req.params;

    if (
      typeof educationLevelSlug !== "string" ||
      typeof programSlug !== "string" ||
      typeof subjectSlug !== "string" ||
      typeof topicSlug !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid topic path",
      });
      return;
    }

    const topic = await getTopicBySlug(
      educationLevelSlug,
      programSlug,
      subjectSlug,
      topicSlug,
    );

    if (!topic) {
      res.status(404).json({
        success: false,
        message: "Topic not found",
      });
      return;
    }

    res.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error("Get topic by slug failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch topic",
    });
  }
}

export async function updateTopicController(
  req: Request,
  res: Response,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid topic ID",
      });
      return;
    }

    const {
      name,
      slug,
      description,
      subjectId,
    } = req.body;

    const existingTopic = await getTopicById(id);

    if (!existingTopic) {
      res.status(404).json({
        success: false,
        message: "Topic not found",
      });
      return;
    }

    const parentExists = await subjectExists(subjectId);

    if (!parentExists) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });
      return;
    }

    const topic = await updateTopic(
      id,
      name,
      slug,
      subjectId,
      description,
    );

    res.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error("Update topic failed:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        success: false,
        message: "Topic with this name or slug already exists",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to update topic",
    });
  }
}

export async function deleteTopicController(
  req: Request,
  res: Response,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid topic ID",
      });
      return;
    }

    const existingTopic = await getTopicById(id);

    if (!existingTopic) {
      res.status(404).json({
        success: false,
        message: "Topic not found",
      });
      return;
    }

    await deleteTopic(id);

    res.json({
      success: true,
      message: "Topic deleted successfully",
    });
  } catch (error) {
    console.error("Delete topic failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete topic",
    });
  }
}