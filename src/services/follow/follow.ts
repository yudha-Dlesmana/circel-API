import { prismaClient } from "../../database/prisma";

export async function follow(userId: string, targetId: string) {
  await prismaClient.follows.create({
    data: {
      followingId: userId,
      followerId: targetId,
    },
  });
}
