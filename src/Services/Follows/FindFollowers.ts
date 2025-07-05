import { prismaClient } from "../../database/prisma";

export async function findFollowers(userId: string, cursor?: string) {
  const follower = await prismaClient.user.findMany({
    where: {
      following: {
        some: { followerId: userId },
      },
    },
    select: {
      id: true,
      username: true,
      name: true,
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
  return follower;
  // const follower = await prismaClient.follows.findMany({
  //   where: {
  //     followingId :userId
  //   },
  //   select: {
  //     following: {
  //       select: {
  //         name:true,
  //       }
  //     }
  //   }
  // })
  // return follower;
}
