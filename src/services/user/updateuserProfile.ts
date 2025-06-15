import { prismaClient } from "../../database/prisma";

interface Payload {
  name?: string;
  bio?: string;
  image?: string;
}

export async function updateUserProfile(userId: string, payload: Payload) {
  const profile = await prismaClient.profile.update({
    where: { userId },
    data: {
      name: payload.name,
      bio: payload.bio,
      image: payload.image,
    },
  });

  return profile;
}
