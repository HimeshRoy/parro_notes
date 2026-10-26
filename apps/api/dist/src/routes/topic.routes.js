import { Router } from "express";
import { createTopicController, deleteTopicController, getTopicByIdController, getTopicsController, updateTopicController, } from "../controllers/topic.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", requireAdmin, createTopicController);
router.get("/", getTopicsController);
router.get("/:id", getTopicByIdController);
router.put("/:id", requireAdmin, updateTopicController);
router.delete("/:id", requireAdmin, deleteTopicController);
export default router;
//# sourceMappingURL=topic.routes.js.map