import { prismaClient } from "../../database/prisma";

export interface Payload {
  name: string;
  bio?: string;
  image?: string;
}

export async function registerUserProfile(userId: string, payload: Payload) {
  const userProfile = await prismaClient.profile.create({
    data: {
      userId,
      name: payload.name,
      bio: payload.bio,
      image: payload.image,
    },
  });
  return userProfile;
}
