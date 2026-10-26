import { Router } from "express";

import {
  loginAdminController,
  registerAdminController,
  getCurrentAdminController,
  updateCurrentAdminController,
  changeAdminPasswordController,
} from "../controllers/auth.controller.js";

import {
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

// router.post("/register", registerAdminController);

router.post(
  "/login",
  loginAdminController,
);

router.get(
  "/me",
  requireAdmin,
  getCurrentAdminController,
);

router.patch(
  "/me",
  requireAdmin,
  updateCurrentAdminController,
);

router.patch(
  "/change-password",
  requireAdmin,
  changeAdminPasswordController,
);

export default router;