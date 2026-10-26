import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      status: "ok",
      database: "connected",
      service: "Parro Notes API",
    });
  } catch (error) {
    console.error("Health check failed:", error);

    res.status(503).json({
      success: false,
      status: "error",
      database: "disconnected",
      service: "Parro Notes API",
    });
  }
});

export default router;