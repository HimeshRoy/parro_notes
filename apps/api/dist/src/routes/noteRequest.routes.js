import { Router } from "express";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { createNoteRequestController, deleteNoteRequestController, getAllNoteRequestsController, getNoteRequestByIdController, updateNoteRequestStatusController, } from "../controllers/noteRequest.controller.js";
const router = Router();
// Student/public endpoint
router.post("/", createNoteRequestController);
// Admin-only endpoints
router.get("/", requireAdmin, getAllNoteRequestsController);
router.get("/:id", requireAdmin, getNoteRequestByIdController);
router.patch("/:id/status", requireAdmin, updateNoteRequestStatusController);
router.delete("/:id", requireAdmin, deleteNoteRequestController);
export default router;
//# sourceMappingURL=noteRequest.routes.js.map