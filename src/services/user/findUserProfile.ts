import { prismaClient } from "../../prisma/client";

export async function findUserProfile(userId: string) {
  const userProfile = await prismaClient.user.findUniqueOrThrow({
    where: { id: userId },
    include: {
      profile: true,
    },
  });
  return userProfile;
}
