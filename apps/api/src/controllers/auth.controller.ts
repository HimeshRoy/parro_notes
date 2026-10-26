import type { Request, Response } from "express";

import {
  loginAdmin,
  registerAdmin,
  updateAdminProfileService,
  changeAdminPasswordService,
} from "../services/auth.service.js";

import {
  findAdminById,
} from "../services/admin.service.js";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

export async function registerAdminController(
  req: Request,
  res: Response,
) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Name, email and password are required",
      });
      return;
    }

    if (name.trim().length < 2) {
      res.status(400).json({
        success: false,
        message:
          "Name must be at least 2 characters",
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters",
      });
      return;
    }

    const admin = await registerAdmin(
      name.trim(),
      email.trim().toLowerCase(),
      password,
    );

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "ADMIN_ALREADY_EXISTS"
    ) {
      res.status(409).json({
        success: false,
        message:
          "An admin with this email already exists",
      });
      return;
    }

    console.error(
      "Admin registration failed:",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
}

export async function loginAdminController(
  req: Request,
  res: Response,
) {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
      return;
    }

    const result = await loginAdmin(
      email.trim().toLowerCase(),
      password,
    );

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "ADMIN_INACTIVE"
    ) {
      res.status(403).json({
        success: false,
        message:
          "Admin account is inactive",
      });
      return;
    }

    console.error(
      "Admin login failed:",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
}

export async function getCurrentAdminController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.adminId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const admin = await findAdminById(
      req.adminId,
    );

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Admin account not found",
      });
      return;
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error(
      "Get current admin failed:",
      error,
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch current admin",
    });
  }
}

export async function updateCurrentAdminController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.adminId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const {
      name,
      email,
    } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Name and email are required",
      });
      return;
    }

    const trimmedName = name.trim();
    const normalizedEmail =
      email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      res.status(400).json({
        success: false,
        message:
          "Name must be at least 2 characters",
      });
      return;
    }

    if (!normalizedEmail) {
      res.status(400).json({
        success: false,
        message:
          "Email is required",
      });
      return;
    }

    const admin =
      await updateAdminProfileService(
        req.adminId,
        trimmedName,
        normalizedEmail,
      );

    res.json({
      success: true,
      message:
        "Profile updated successfully",
      data: admin,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_IN_USE"
    ) {
      res.status(409).json({
        success: false,
        message:
          "This email is already being used by another admin",
      });
      return;
    }

    console.error(
      "Update admin profile failed:",
      error,
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update profile",
    });
  }
}

export async function changeAdminPasswordController(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.adminId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Current password and new password are required",
      });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        success: false,
        message:
          "New password must be at least 8 characters",
      });
      return;
    }

    const admin =
      await changeAdminPasswordService(
        req.adminId,
        currentPassword,
        newPassword,
      );

    res.json({
      success: true,
      message:
        "Password changed successfully",
      data: admin,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "CURRENT_PASSWORD_INCORRECT"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Current password is incorrect",
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message ===
        "PASSWORD_SAME_AS_CURRENT"
    ) {
      res.status(400).json({
        success: false,
        message:
          "New password must be different from your current password",
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "ADMIN_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message:
          "Admin account not found",
      });
      return;
    }

    console.error(
      "Change admin password failed:",
      error,
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to change password",
    });
  }
}