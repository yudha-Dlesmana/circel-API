import { Request, Response, NextFunction } from "express";
import { createComment } from "../services/comment/createComment";
import { getUsername } from "../services/user/getUserProperties";
import { supabase } from "../utils/supabaseClient";
import { findComments, findReplies } from "../services/comment/findComments";

export async function comment(req: Request, res: Response, next: NextFunction) {
  const { text } = req.body;
  const ImagePublicUrl = (req as any).ImagePublicUrl;
  const filePath = (req as any).filePath;

  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;
  const { tweetId } = req.params;

  const payload = {
    text,
    image: ImagePublicUrl,
  };
  const relation = {
    username,
    tweetId: Number(tweetId),
  };

  try {
    const comment = await createComment(payload, relation);
    res.status(200).json(comment);
  } catch (error) {
    await supabase.storage.from("tweets").remove([filePath]);
    next(error);
  }
}

export async function repliesComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { text } = req.body;

  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;
  const { tweetId, parentId } = req.params;

  const payload = {
    text,
  };
  const relation = {
    username,
    tweetId: Number(tweetId),
    parentId: Number(parentId),
  };

  try {
    const replies = await createComment(payload, relation);
    res.status(200).json(replies);
  } catch (error) {
    next(error);
  }
}

export async function getComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tweetId } = req.params;
  try {
    const comments = await findComments(Number(tweetId));
    const payload = comments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      name: comment.user.profile?.name,
      userImage: comment.user.profile?.image,
      text: comment.text,
      image: comment.image,
      createAt: comment.createAt,
      likes: comment._count.like,
      replies: comment._count.replies,
    }));
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}
export async function getRepliesComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { parentId } = req.params;
  try {
    const replies = await findReplies(Number(parentId));
    const payload = replies.map((reply) => ({
      id: reply.id,
      username: reply.username,
      name: reply.user.profile?.name,
      userImage: reply.user.profile?.image,
      text: reply.text,
      createAt: reply.createAt,
      likes: reply._count.like,
    }));
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}
