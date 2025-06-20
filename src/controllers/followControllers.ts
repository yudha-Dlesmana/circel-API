import { Request, Response, NextFunction } from "express";
import { createFollow } from "../services/follow/createFollow";
import { deleteFollow } from "../services/follow/deleteFollow";
import { findFollows } from "../services/follow/checkFollow";

export async function follow(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user.id;
  const { targetId } = req.params;
  try {
    await createFollow(userId, targetId);
    res.status(200).json({ message: "following" });
  } catch (error) {
    next(error);
  }
}

export async function unfollow(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const { targetId } = req.params;
  try {
    await deleteFollow(userId, targetId);
    res.status(200).json({ message: "unfollow" });
  } catch (error) {
    next(error);
  }
}

export async function checkFollow(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const { targetId } = req.body;
  try {
    const isFollowed = await findFollows(userId, targetId);

    res.status(200).json(isFollowed);
  } catch (error) {
    next(error);
  }
}
