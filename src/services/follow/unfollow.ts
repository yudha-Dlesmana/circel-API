import { prismaClient } from "../../database/prisma";

export async function unfollow(userId: string, targetId: string) {
  await prismaClient.follows.delete({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: targetId,
      },
    },
  });
}
