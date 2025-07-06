import { prismaClient } from "../../database/prisma";
import type { EditProfile } from "../../Schemas/Profiles";

export async function updateUserProfile(userId: string, payload: EditProfile) {
  const profile = await prismaClient.user.update({
    where: { id: userId },
    data: {
      username: payload.username,
      name: payload.name,
      bio: payload.bio,
      image: payload.deleteImage ? null : payload.image,
      background: payload.deleteBackground ? null : payload.background,
      updateAt: new Date(),
    },
  });
  return profile;
}
