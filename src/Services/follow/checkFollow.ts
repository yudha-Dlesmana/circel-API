import { prismaClient } from "../../database/prisma";

export async function findFollows(username: string, targetUsername: string) {
  const isfollow = await prismaClient.follows.findFirst({
    where: {
      followerUsername: targetUsername,
      followingUsername: username,
    },
  });
  return !!isfollow;
}
