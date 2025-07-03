import { prismaClient } from "../../database/prisma";

export async function getUsername(userId: string) {
  const username = await prismaClient.user.findUniqueOrThrow({
    select: { username: true },

    where: { id: userId },
  });
  return username;
}

export async function getUsernameImage(userId: string) {
  const props = await prismaClient.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      username: true,
      profile: {
        select: {
          image: true,
        },
      },
    },
  });
  return {
    username: props.username,
    image: props.profile?.image,
  };
}
