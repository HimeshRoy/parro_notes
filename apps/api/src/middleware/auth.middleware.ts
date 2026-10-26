import type { NextFunction, Request, Response } from "express";
import { verifyAdminToken } from "../utils/jwt.js";
import { findAdminById } from "../services/admin.service.js";

export interface AuthenticatedRequest
  extends Request {
  adminId?: string;
}

export async function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization =
      req.headers.authorization;

    if (
      typeof authorization !== "string" ||
      !authorization.startsWith("Bearer ")
    ) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const token =
      authorization.slice(7).trim();

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const payload =
      verifyAdminToken(token);

    const admin =
      await findAdminById(payload.adminId);

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Admin account not found",
      });
      return;
    }

    if (!admin.isActive) {
      res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
      return;
    }

    req.adminId = admin.id;

    next();
  } catch (error) {
    console.error(
      "Admin authentication failed:",
      error,
    );

    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
}