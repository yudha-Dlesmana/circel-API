import { prismaClient } from "../../database/prisma";

export async function findUserProfile(userId: string) {
  const userProfile = await prismaClient.user.findUnique({
    where: { id: userId },
    include: {
      profile: {
        select: {
          name: true,
          bio: true,
          image: true,
        },
      },
    },
  });
  return userProfile;
}
