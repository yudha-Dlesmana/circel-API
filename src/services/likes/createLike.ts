import { prismaClient } from "../../database/prisma";

export async function createTweetLike(username: string, tweetId: number) {
  const like = await prismaClient.like.create({
    data: {
      username,
      tweetId,
    },
  });
  return like;
}
export async function createCommentLike(
  username: string,
  tweetId: number,
  commentId: number
) {
  const istrue = await prismaClient.comment.findFirst({
    where: {
      id: commentId,
      tweetId,
    },
  });
  if (!istrue) throw new Error("invalid comment");

  const like = await prismaClient.like.create({
    data: {
      username,
      commentId,
    },
  });
  return like;
}
