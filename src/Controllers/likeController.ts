import { Request, Response, NextFunction } from "express";
import { getUsername } from "../Services/user/getUserProperties";
import {
  createCommentLike,
  createTweetLike,
} from "../Services/likes/createLike";
import {
  deleteCommentLike,
  deleteTweetLike,
} from "../Services/likes/deleteLike";
import {
  isLikedTweet,
  countTweetLikes,
  isLikedComment,
  countCommentLikes,
} from "../Services/likes/checkLiked";

export async function likeTweet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tweetId } = req.params;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;

  try {
    const like = await createTweetLike(username, Number(tweetId));
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
}
export async function likeComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tweetId, commentId } = req.params;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;

  try {
    const like = await createCommentLike(
      username,
      Number(tweetId),
      Number(commentId)
    );
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
}

export async function removeTweetLike(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tweetId } = req.params;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;
  try {
    await deleteTweetLike(username, Number(tweetId));
    res.status(200).json("remove like");
  } catch (error) {
    next(error);
  }
}
export async function removeCommentLike(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { commentId } = req.params;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;
  try {
    await deleteCommentLike(username, Number(commentId));
    res.status(200).json("remove like");
  } catch (error) {
    next(error);
  }
}

export async function checkTweetLiked(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tweetId } = req.params;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;
  try {
    const isLiked = await isLikedTweet(username, Number(tweetId));
    const countlikes = await countTweetLikes(Number(tweetId));
    res.status(200).json({ isLiked, countlikes });
  } catch (error) {
    next(error);
  }
}
export async function checkCommentLiked(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { commentId } = req.params;
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;
  try {
    const isLiked = await isLikedComment(username, Number(commentId));
    const countlikes = await countCommentLikes(Number(commentId));
    res.status(200).json({ isLiked, countlikes });
  } catch (error) {
    next(error);
  }
}
