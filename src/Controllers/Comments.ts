import { Request, Response, NextFunction } from "express";
import { createComment } from "../Services/Comments/CreateComment";
import { supabase } from "../Utils/SupabaseClient";
import { findComments, findReplies } from "../Services/Comments/FindComments";
import { createResponse, Status } from "../Utils/Response";

export async function commentTweet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { text } = req.body;
  const commentUrl = (req as any).commentUrl;
  const commentPath = (req as any).commentPath;

  const payload = {
    text,
    imageUrl: commentUrl,
  };

  const userId = (req as any).user.id;
  const { tweetId, parentId } = req.params;

  const relation: {
    userId: string;
    tweetId: number;
    parentId?: number;
  } = {
    userId,
    tweetId: Number(tweetId),
  };
  if (parentId) relation.parentId = Number(parentId);

  try {
    const comment = await createComment(payload, relation);
    res.statusCode = 201;
    res.statusMessage = "CREATE";
    res.json(
      createResponse(
        Status.success,
        201,
        parentId ? "Post Reply" : "Post Comment",
        comment
      )
    );
  } catch (error) {
    if (commentPath) {
      await supabase.storage.from("comment").remove([commentPath]);
    }
    next(error);
  }
  {
  }
}

export async function getComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tweetId } = req.params;
  const { cursor } = req.query;
  try {
    const comments = await findComments(Number(tweetId), Number(cursor));
    const payload = {
      comments: comments.map((comment) => ({
        id: comment.id,
        name: comment.user.name,
        username: comment.user.username,
        userImage: comment.user.image,
        text: comment.text,
        image: comment.image,
        createAt: comment.createAt,
        replies: comment._count.replies,
      })),
      cursor:
        comments.length == 5 ? comments[comments.length - 1].id : undefined,
    };
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(createResponse(Status.success, 200, "get Tweets", payload));
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
  const { cursor } = req.query;
  try {
    const replies = await findReplies(Number(parentId), Number(cursor));
    const payload = {
      replies: replies.map((reply) => ({
        id: reply.id,
        username: reply.user.username,
        name: reply.user.name,
        userImage: reply.user.image,
        text: reply.text,
        createAt: reply.createAt,
        likes: reply._count.like,
      })),
      cursor: replies.length == 3 ? replies[replies.length - 1].id : undefined,
    };
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(createResponse(Status.success, 200, "get Replies", payload));
  } catch (error) {
    next(error);
  }
}
