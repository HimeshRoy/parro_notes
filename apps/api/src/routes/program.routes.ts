import { Router } from "express";
import {
  createProgramController,
  deleteProgramController,
  getProgramByIdController,
  getProgramBySlugController,
  getProgramsController,
  updateProgramController,
} from "../controllers/program.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", requireAdmin, createProgramController);

router.get("/", getProgramsController);

/*
 * Specific route must come before /:id.
 */
router.get(
  "/slug/:educationLevelSlug/:programSlug",
  getProgramBySlugController,
);

router.get("/:id", getProgramByIdController);

router.put("/:id", requireAdmin, updateProgramController);

router.delete("/:id", requireAdmin, deleteProgramController);

export default router;
