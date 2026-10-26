import { Router } from "express";
import { createSubjectController, deleteSubjectController, getSubjectByIdController, getSubjectsController, updateSubjectController, } from "../controllers/subject.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", requireAdmin, createSubjectController);
router.get("/", getSubjectsController);
router.get("/:id", getSubjectByIdController);
router.put("/:id", requireAdmin, updateSubjectController);
router.delete("/:id", requireAdmin, deleteSubjectController);
export default router;
//# sourceMappingURL=subject.routes.js.map