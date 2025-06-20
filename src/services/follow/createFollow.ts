import { prismaClient } from "../../database/prisma";

export async function createFollow(userId: string, targetId: string) {
  await prismaClient.follows.create({
    data: {
      followerId: userId,
      followingId: targetId,
    },
  });
}
