import { prismaClient } from "../../database/prisma";

export async function findUsers(cursor?: string) {
  let users;
  if (cursor) {
    users = await prismaClient.user.findMany({
      take: 15,
      skip: 1,
      cursor: {
        id: cursor,
      },
    });
  } else {
    users = await prismaClient.user.findMany({
      take: 15,
    });
  }

  return users;
}
