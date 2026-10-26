import { Router } from "express";
import {
  createTopicController,
  deleteTopicController,
  getTopicByIdController,
  getTopicBySlugController,
  getTopicsController,
  updateTopicController,
} from "../controllers/topic.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", requireAdmin, createTopicController);

router.get("/", getTopicsController);

router.get(
  "/slug/:educationLevelSlug/:programSlug/:subjectSlug/:topicSlug",
  getTopicBySlugController,
);

router.get("/:id", getTopicByIdController);

router.put("/:id", requireAdmin, updateTopicController);

router.delete("/:id", requireAdmin, deleteTopicController);

export default router;
