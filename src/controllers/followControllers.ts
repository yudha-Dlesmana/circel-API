import { Request, Response, NextFunction } from "express";

export async function follow(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user.id;
  const targetIf = req.body;
  try {
  } catch (error) {
    next(error);
  }
}
