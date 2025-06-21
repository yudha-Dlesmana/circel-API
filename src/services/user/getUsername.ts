import { prismaClient } from "../../database/prisma";

export async function getUsername(userId: string) {
  const username = await prismaClient.user.findUniqueOrThrow({
    select: { username: true },

    where: { id: userId },
  });
  return username;
}
