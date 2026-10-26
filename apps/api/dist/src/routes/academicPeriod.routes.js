import { Router } from "express";
import { createAcademicPeriodController, deleteAcademicPeriodController, getAcademicPeriodByIdController, getAcademicPeriodsController, updateAcademicPeriodController, } from "../controllers/academicPeriod.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", requireAdmin, createAcademicPeriodController);
router.get("/", getAcademicPeriodsController);
router.get("/:id", getAcademicPeriodByIdController);
router.put("/:id", requireAdmin, updateAcademicPeriodController);
router.delete("/:id", requireAdmin, deleteAcademicPeriodController);
export default router;
//# sourceMappingURL=academicPeriod.routes.js.map