import { prismaClient } from "../../database/prisma";

export async function deleteLike(tweetId: number, username: string) {
  await prismaClient.like.delete({
    where: {
      tweetId_username: {
        tweetId,
        username,
      },
    },
  });
}
