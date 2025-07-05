import { prismaClient } from "../../database/prisma";

export async function createTweetLike(userId: string, tweetId: number) {
  const like = await prismaClient.like.create({
    data: {
      userId,
      tweetId,
    },
  });
  return like;
}
export async function createCommentLike(
  userId: string,
  commentId: number
  // tweetId: number,
) {
  // const istrue = await prismaClient.comment.findFirst({
  //   where: {
  //     id: commentId,
  //     tweetId,
  //   },
  // });
  // if (!istrue) throw new Error("invalid comment");

  const like = await prismaClient.like.create({
    data: {
      userId,
      commentId,
    },
  });
  return like;
}
