import { prismaClient } from "../../database/prisma";

export async function findFollowed(userId: string) {
  const followed = await prismaClient.user.findMany({
    where: {
      follower: {
        some: { followerId: userId },
      },
    },
  });

  return followed;
}
