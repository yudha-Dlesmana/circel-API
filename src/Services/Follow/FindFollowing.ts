import { prismaClient } from "../../database/prisma";

export async function findFollowing(userId: string, cursor?: string) {
  const followed = await prismaClient.user.findMany({
    where: {
      follower: {
        some: { followingId: userId },
      },
    },
    select: {
      id: true,
      name: true,
      username: true,
      profile: {
        select: {
          image: true,
          bio: true,
        },
      },
    },
    take: 10,
    skip: cursor ? 1 : 0,
    ...(cursor && {
      cursor: {
        username: cursor,
      },
    }),
  });

  return followed;
}
