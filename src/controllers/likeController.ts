import { Request, Response, NextFunction } from "express";
import { getUsername } from "../services/user/getUserProperties";
import { createLike } from "../services/likes/createLike";
import { deleteLike } from "../services/likes/deleteLike";
import { checkLiked, countLikes } from "../services/likes/checkLiked";

export async function like(req: Request, res: Response, next: NextFunction) {
  const { tweetId } = req.query;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;

  try {
    const like = await createLike(Number(tweetId), username);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
}

export async function unlike(req: Request, res: Response, next: NextFunction) {
  const { tweetId } = req.query;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;
  try {
    await deleteLike(Number(tweetId), username);
    res.status(200).json("unlike");
  } catch (error) {
    next(error);
  }
}

export async function isLiked(req: Request, res: Response, next: NextFunction) {
  const { tweetId } = req.query;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;
  try {
    const isLiked = await checkLiked(Number(tweetId), username);
    const countlikes = await countLikes(Number(tweetId));
    res.status(200).json({ isLiked, countlikes });
  } catch (error) {
    next(error);
  }
}
