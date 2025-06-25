import { prismaClient } from "../../database/prisma";

export async function createLike(tweetId: number, username: string) {
  const likes = await prismaClient.like.create({
    data: {
      tweetId,
      username,
    },
  });
  return likes;
}
