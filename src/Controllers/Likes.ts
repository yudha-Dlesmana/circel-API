import { Request, Response, NextFunction } from "express";
import {
  createCommentLike,
  createTweetLike,
} from "../Services/Likes/CreateLike";
import {
  deleteCommentLike,
  deleteTweetLike,
} from "../Services/Likes/DeleteLike";
import {
  isLikedTweet,
  countTweetLikes,
  isLikedComment,
  countCommentLikes,
} from "../Services/Likes/CheckLiked";
import { createResponse, Status } from "../Utils/Response";

export async function likeTweet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tweetId } = req.params;
  const userId = (req as any).user.id;

  try {
    const like = await createTweetLike(userId, Number(tweetId));
    res.statusCode = 201;
    res.statusMessage = "CREATED";
    res.json(createResponse(Status.success, 201, "Like Post", {}));
  } catch (error) {
    next(error);
  }
}
export async function likeComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { commentId } = req.params;
  const userId = (req as any).user.id;

  try {
    const like = await createCommentLike(userId, Number(commentId));
    res.statusCode = 201;
    res.statusMessage = "CREATED";
    res.json(createResponse(Status.success, 201, "like comment", like));
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
  try {
    await deleteTweetLike(userId, Number(tweetId));
    res.statusCode = 204;
    res.statusMessage = "No Content";
    res.json(createResponse(Status.success, 204, "remove like", {}));
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
  try {
    await deleteCommentLike(userId, Number(commentId));
    res.statusCode = 204;
    res.statusMessage = "No Content";
    res.json(createResponse(Status.success, 204, "remove like", {}));
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
  try {
    const isLiked = await isLikedTweet(userId, Number(tweetId));
    const countlikes = await countTweetLikes(Number(tweetId));
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createResponse(
        Status.success,
        200,
        "check isLiked and cound total like",
        { isLiked, countlikes }
      )
    );
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

  try {
    const isLiked = await isLikedComment(userId, Number(commentId));
    const countlikes = await countCommentLikes(Number(commentId));
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createResponse(
        Status.success,
        200,
        "check isLiked and cound total like",
        { isLiked, countlikes }
      )
    );
  } catch (error) {
    next(error);
  }
}
