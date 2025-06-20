import { prismaClient } from "../../database/prisma";

export async function findFollowers(userId: string) {
  const follower = await prismaClient.user.findMany({
    where: {
      following: {
        some: { followingId: userId },
      },
    },
    select: {
      username: true,
      profile: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return follower;
}
