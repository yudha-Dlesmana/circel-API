import { prismaClient } from "../../database/prisma";

export async function findFollows(userId: string, targetId: string) {
  const isfollow = await prismaClient.follows.findFirst({
    where: {
      followerId: targetId,
      followingId: userId,
    },
  });
  return !!isfollow;
}
