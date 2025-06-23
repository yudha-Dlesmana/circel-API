import { prismaClient } from "../../database/prisma";

export async function searchUsers(name: string | undefined) {
  if (name) {
    const users = await prismaClient.user.findMany({
      where: {
        profile: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      },
      select: {
        username: true,
        profile: {
          select: {
            name: true,
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
