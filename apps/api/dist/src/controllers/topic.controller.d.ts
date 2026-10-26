import type { Request, Response } from "express";
export declare function createTopicController(req: Request, res: Response): Promise<void>;
export declare function getTopicsController(_req: Request, res: Response): Promise<void>;
export declare function getTopicByIdController(req: Request, res: Response): Promise<void>;
export declare function updateTopicController(req: Request, res: Response): Promise<void>;
export declare function deleteTopicController(req: Request, res: Response): Promise<void>;
