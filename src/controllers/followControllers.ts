import { Request, Response, NextFunction } from "express";
import { createFollow } from "../services/follow/createFollow";
import { deleteFollow } from "../services/follow/deleteFollow";
import { findFollows } from "../services/follow/checkFollow";
import { getUsername } from "../services/user/getUsername";

export async function follow(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user.id;
  const { targetUsername } = req.params;
  try {
    if (userId === targetUsername)
      throw new Error("Oops! You can't follow your own account.");
    const { username } = await getUsername(userId);
    const follow = await createFollow(username, targetUsername);
    res.status(200).json(follow);
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
  const { targetUsername } = req.params;
  try {
    if (userId === targetUsername)
      throw new Error("Oops! You can't follow your own account.");
    const { username } = await getUsername(userId);
    await deleteFollow(username, targetUsername);
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
  const { targetUsername } = req.params;
  try {
    const { username } = await getUsername(userId);

    const isFollowed = await findFollows(username, targetUsername);

    res.status(200).json(isFollowed);
  } catch (error) {
    next(error);
  }
}
