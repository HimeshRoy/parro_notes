import { Router } from "express";
import { loginAdminController, getCurrentAdminController, } from "../controllers/auth.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
// router.post("/register", registerAdminController);
router.post("/login", loginAdminController);
router.get("/me", requireAdmin, getCurrentAdminController);
export default router;
//# sourceMappingURL=auth.routes.js.map