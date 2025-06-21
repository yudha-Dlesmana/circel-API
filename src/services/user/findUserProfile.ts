import { prismaClient } from "../../database/prisma";

export async function findUserProfile(userId: string) {
  const userProfile = await prismaClient.user.findUniqueOrThrow({
    where: { id: userId },
    include: {
      profile: {
        select: {
          name: true,
          bio: true,
          image: true,
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
