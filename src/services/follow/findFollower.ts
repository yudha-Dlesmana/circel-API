import { prismaClient } from "../../database/prisma";

export async function findFollowers(username: string, cursor?: string) {
  const follower = await prismaClient.user.findMany({
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

  return follower;
}
