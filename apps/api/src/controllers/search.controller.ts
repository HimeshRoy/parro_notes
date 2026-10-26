import type { Request, Response } from "express";

import { searchContent } from "../services/search.service.js";

export async function searchController(
  req: Request,
  res: Response,
) {
  try {
    const query =
      typeof req.query.q === "string"
        ? req.query.q.trim()
        : "";

    if (!query) {
      res.json({
        success: true,
        data: {
          query: "",
          results: [],
          total: 0,
        },
      });

      return;
    }

    if (query.length < 2) {
      res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters.",
      });

      return;
    }

    const results = await searchContent(query);

    res.json({
      success: true,
      data: {
        query,
        results,
        total: results.length,
      },
    });
  } catch (error) {
    console.error("Search failed:", error);

    res.status(500).json({
      success: false,
      message: "Search failed.",
    });
  }
}