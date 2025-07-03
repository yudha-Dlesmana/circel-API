import { prismaClient } from "../../database/prisma";

export async function findFollowing(username: string) {
  const followed = await prismaClient.user.findMany({
    where: {
      follower: {
        some: { followingUsername: username },
      },
    },
    select: {
      username: true,
      profile: {
        select: {
          image: true,
          bio: true,
        },
      },
    },
    take: 15,
  });

  return followed;
}
