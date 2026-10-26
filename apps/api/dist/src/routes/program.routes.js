import { Router } from "express";
import { createProgramController, deleteProgramController, getProgramByIdController, getProgramsController, updateProgramController, } from "../controllers/program.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", requireAdmin, createProgramController);
router.get("/", getProgramsController);
router.get("/:id", getProgramByIdController);
router.put("/:id", requireAdmin, updateProgramController);
router.delete("/:id", requireAdmin, deleteProgramController);
export default router;
//# sourceMappingURL=program.routes.js.map