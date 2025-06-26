import { prismaClient } from "../../database/prisma";

export async function checkLiked(tweetId: number, username: string) {
  const isLiked = await prismaClient.like.findFirst({
    where: {
      tweetId,
      username,
    },
  });
  return !!isLiked;
}

export async function countLikes(tweetId: number) {
  const likes = await prismaClient.like.count({
    where: {
      tweetId,
    },
  });
  return likes;
}
