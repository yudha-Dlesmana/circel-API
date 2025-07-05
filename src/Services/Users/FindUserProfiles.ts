import { prismaClient } from "../../database/prisma";

export async function findUserProfile(userId: string) {
  const userProfile = await prismaClient.user.findUniqueOrThrow({
    where: { id: userId },
    include: {
      profile: {
        select: {
          bio: true,
          image: true,
          background: true,
        },
      },
      _count: {
        select: {
          follower: true,
          following: true,
        },
      },
    },
  });
  return userProfile;
}

export async function findUser(username: string) {
  const userProfile = await prismaClient.user.findUniqueOrThrow({
    where: { username },
    select: {
      username: true,
      name: true,
      profile: {
        select: {
          bio: true,
          image: true,
          background: true,
        },
      },
      _count: {
        select: {
          follower: true,
          following: true,
        },
      },
    },
  });
  return userProfile;
}
