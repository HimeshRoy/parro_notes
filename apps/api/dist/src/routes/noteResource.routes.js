import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import { createNoteResourceController, deleteNoteResourceController, getNoteResourceByIdController, getNoteResourcesController, updateNoteResourceController, } from "../controllers/noteResource.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", upload.single("file"), requireAdmin, createNoteResourceController);
router.get("/note/:noteId", getNoteResourcesController);
router.put("/:id", upload.single("file"), requireAdmin, updateNoteResourceController);
router.get("/:id", getNoteResourceByIdController);
router.delete("/:id", requireAdmin, deleteNoteResourceController);
export default router;
//# sourceMappingURL=noteResource.routes.js.map