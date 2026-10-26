import type { NextFunction, Request, Response } from "express";
export interface AuthenticatedRequest extends Request {
    adminId?: string;
}
export declare function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
