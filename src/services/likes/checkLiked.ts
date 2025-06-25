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
