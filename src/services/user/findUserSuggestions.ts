import { prismaClient } from "../../database/prisma";

export async function findUserSuggestions(userUsername: string) {
  const users = await prismaClient.user.findMany({
    where: {
      username: { not: userUsername },
      follower: {
        none: {
          followingUsername: userUsername,
        },
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
      follower: {
        select: {
          followingUsername: true,
          followerUsername: true,
        },
      },
    },
    take: 3,
  });

  return users;
}
