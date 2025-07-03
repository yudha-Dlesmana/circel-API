import { prismaClient } from "../../database/prisma";

interface Payload {
  name: string;
  username: string;
  bio: string;
  image?: string;
  deleteImage?: boolean;
}

export async function updateUserProfile(userId: string, payload: Payload) {
  const profile = await prismaClient.user.update({
    where: { id: userId },
    data: {
      username: payload.username,
      profile: {
        update: {
          bio: payload.bio,
          image: payload.deleteImage ? null : payload.image,
        },
      },
    },
    include: {
      profile: true,
    },
  });
  return profile;
}
