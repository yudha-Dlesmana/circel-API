import { prismaClient } from "../../database/prisma";

export async function deleteFollow(userId: string, targetId: string) {
  await prismaClient.follows.delete({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: targetId,
      },
    },
  });
}
