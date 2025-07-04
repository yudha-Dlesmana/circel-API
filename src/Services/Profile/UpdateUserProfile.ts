import { prismaClient } from "../../database/prisma";
import type { EditProfile } from "../../Schemas/ProfileSchema";

export async function updateUserProfile(userId: string, payload: EditProfile) {
  const profile = await prismaClient.user.update({
    where: { id: userId },
    data: {
      username: payload.username,
      name: payload.name,
      profile: {
        update: {
          bio: payload.bio,
          image: payload.deleteImage ? null : payload.image,
          background: payload.deleteBackground ? null : payload.background,
        },
      },
    },
    include: {
      profile: true,
    },
  });
  return profile;
}
