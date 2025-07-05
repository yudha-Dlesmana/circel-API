import { prismaClient } from "../../database/prisma";

export async function createFollow(userId: string, targetUserId: string) {
  const follows = await prismaClient.follows.create({
    data: {
      followerId: targetUserId,
      followingId: userId,
    },
  });
  return follows;
}
