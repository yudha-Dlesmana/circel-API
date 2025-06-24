import { prismaClient } from "../../database/prisma";

export async function deleteTweet(id: number, username: string) {
  await prismaClient.tweet.delete({
    where: {
      id,
      username,
    },
  });
}
