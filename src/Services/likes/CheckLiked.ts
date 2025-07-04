import { prismaClient } from "../../database/prisma";

export async function isLikedTweet(userId: string, tweetId: number) {
  const isLiked = await prismaClient.like.findFirst({
    where: {
      tweetId,
      userId,
    },
  });
  return !!isLiked;
}
export async function countTweetLikes(tweetId: number) {
  const likes = await prismaClient.like.count({
    where: {
      tweetId,
    },
  });
  return likes;
}

export async function isLikedComment(userId: string, commentId: number) {
  const isLiked = await prismaClient.like.findFirst({
    where: {
      userId,
      commentId,
    },
  });
  return !!isLiked;
}
export async function countCommentLikes(commentId: number) {
  const likes = await prismaClient.like.count({
    where: { commentId },
  });
  return likes;
}
