import type { Request, Response } from "express";
export declare function createNoteRequestController(req: Request, res: Response): Promise<void>;
export declare function getAllNoteRequestsController(req: Request, res: Response): Promise<void>;
export declare function getNoteRequestByIdController(req: Request, res: Response): Promise<void>;
export declare function updateNoteRequestStatusController(req: Request, res: Response): Promise<void>;
export declare function deleteNoteRequestController(req: Request, res: Response): Promise<void>;
