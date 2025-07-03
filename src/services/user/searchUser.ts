import { prismaClient } from "../../database/prisma";

export async function searchUsers(name: string | undefined) {
  if (name) {
    const users = await prismaClient.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        username: true,
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
