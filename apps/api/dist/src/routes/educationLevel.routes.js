import { Router } from "express";
import { createEducationLevelController, deleteEducationLevelController, getEducationLevelByIdController, getEducationLevelsController, updateEducationLevelController, } from "../controllers/educationLevel.controller.js";
import { validateCreateEducationLevel } from "../validators/educationLevel.validator.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", validateCreateEducationLevel, requireAdmin, createEducationLevelController);
router.get("/", getEducationLevelsController);
router.get("/:id", getEducationLevelByIdController);
router.put("/:id", requireAdmin, updateEducationLevelController);
router.delete("/:id", requireAdmin, deleteEducationLevelController);
export default router;
//# sourceMappingURL=educationLevel.routes.js.map