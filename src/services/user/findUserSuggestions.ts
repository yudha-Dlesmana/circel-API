import { prismaClient } from "../../database/prisma";

export async function findUserSuggestions(userId: string) {
  const users = await prismaClient.user.findMany({
    where: {
      id: { not: userId },
      follower: {
        none: {
          followerId: userId,
        },
      },
    },
    select: {
      username: true,
      profile: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    take: 3,
  });

  return users;
}
