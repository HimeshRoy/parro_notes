import { Router } from "express";
import { createNoteController, deleteNoteController, getNoteByIdController, getNotesController, updateNoteController, } from "../controllers/note.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", requireAdmin, createNoteController);
router.get("/", getNotesController);
router.get("/:id", getNoteByIdController);
router.put("/:id", requireAdmin, updateNoteController);
router.delete("/:id", requireAdmin, deleteNoteController);
export default router;
//# sourceMappingURL=note.routes.js.map