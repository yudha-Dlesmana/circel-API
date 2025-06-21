import { prismaClient } from "../../database/prisma";

export async function findFollowing(username: string) {
  const followed = await prismaClient.user.findMany({
    where: {
      following: {
        some: { followerUsername: username },
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
    take: 15,
  });

  return followed;
}
