import type { Request, Response } from "express";
export declare function createProgramController(req: Request, res: Response): Promise<void>;
export declare function getProgramsController(_req: Request, res: Response): Promise<void>;
export declare function getProgramByIdController(req: Request, res: Response): Promise<void>;
export declare function updateProgramController(req: Request, res: Response): Promise<void>;
export declare function deleteProgramController(req: Request, res: Response): Promise<void>;
