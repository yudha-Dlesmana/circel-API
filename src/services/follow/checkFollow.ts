import { prismaClient } from "../../database/prisma";

export async function findFollows(username: string, targetUsername: string) {
  const follow = await prismaClient.follows.findFirstOrThrow({
    where: {
      followerUsername: username,
      followingUsername: targetUsername,
    },
  });
  return !!follow;
}
