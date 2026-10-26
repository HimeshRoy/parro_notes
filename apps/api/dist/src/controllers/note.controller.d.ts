import type { Request, Response } from "express";
export declare function createNoteController(req: Request, res: Response): Promise<void>;
export declare function getNotesController(_req: Request, res: Response): Promise<void>;
export declare function getNoteByIdController(req: Request, res: Response): Promise<void>;
export declare function updateNoteController(req: Request, res: Response): Promise<void>;
export declare function deleteNoteController(req: Request, res: Response): Promise<void>;
