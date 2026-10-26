import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
export declare function registerAdminController(req: Request, res: Response): Promise<void>;
export declare function loginAdminController(req: Request, res: Response): Promise<void>;
export declare function getCurrentAdminController(req: AuthenticatedRequest, res: Response): Promise<void>;
