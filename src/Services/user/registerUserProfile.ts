import { prismaClient } from "../../database/prisma";
import type { Profile } from "../../Schme/ProfileSchema";

export async function registerUserProfile(userId: string, payload: Profile) {
  const userProfile = await prismaClient.profile.create({
    data: {
      userId,
      bio: payload.bio,
      image: payload.image,
    },
  });
  return userProfile;
}
