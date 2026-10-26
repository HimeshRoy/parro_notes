import type { Request, Response } from "express";
export declare function createNoteResourceController(req: Request, res: Response): Promise<void>;
export declare function getNoteResourcesController(req: Request, res: Response): Promise<void>;
export declare function getNoteResourceByIdController(req: Request, res: Response): Promise<void>;
export declare function updateNoteResourceController(req: Request, res: Response): Promise<void>;
export declare function deleteNoteResourceController(req: Request, res: Response): Promise<void>;
