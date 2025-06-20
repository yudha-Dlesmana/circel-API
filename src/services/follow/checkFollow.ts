import { prismaClient } from "../../database/prisma";

export async function findFollows(userId: string, targetId: string) {
  const follow = await prismaClient.follows.findFirstOrThrow({
    where: {
      followerId: userId,
      followingId: targetId,
    },
  });
  return !!follow;
}
