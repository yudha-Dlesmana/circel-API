import { prismaClient } from "../../database/prisma";

export async function searchUsers(userId: string, name: string | undefined) {
  if (name) {
    const users = await prismaClient.user.findMany({
      where: {
        id: { not: userId },
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        username: true,
        name: true,
        profile: {
          select: {
            image: true,
            bio: true,
          },
        },
      },
    });

    return users;
  } else {
    return [];
  }
}
