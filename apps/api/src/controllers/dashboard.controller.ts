import { Request, Response } from "express";

import { getDashboardStats } from "../services/dashboard.service.js";

export async function getDashboardController(
  _req: Request,
  res: Response,
) {
  try {
    const stats = await getDashboardStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(
      "Failed to load dashboard statistics:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics.",
    });
  }
}