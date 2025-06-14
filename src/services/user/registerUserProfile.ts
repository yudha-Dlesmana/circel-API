import { prismaClient } from "../../prisma/client";

interface Profile {
  name: string;
  bio: string;
}

export async function registerUserProfile(
  userId: string,
  profile: Profile,
  imagePublicUrl: string
) {
  const userProfile = await prismaClient.profile.create({
    data: {
      userId,
      name: profile.name,
      bio: profile.bio,
      image: imagePublicUrl,
    },
  });
  return userProfile;
}
