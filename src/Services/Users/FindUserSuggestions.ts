import { prismaClient } from "../../database/prisma";

export async function findUserSuggestions(userId: string) {
  const users = await prismaClient.user.findMany({
    where: {
      id: { not: userId },
      follower: {
        none: {
          followingId: userId,
        },
      },
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      image: true,
    },
    take: 3,
  });

  return users;
}
