import { Router } from "express";

import { getDashboardController } from "../controllers/dashboard.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAdmin, getDashboardController);

export default router;