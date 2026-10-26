import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import { uploadFileController } from "../controllers/upload.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", upload.single("file"), requireAdmin, uploadFileController);
export default router;
//# sourceMappingURL=upload.routes.js.map