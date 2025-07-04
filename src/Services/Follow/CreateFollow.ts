import { prismaClient } from "../../database/prisma";

export async function createFollow(username: string, targetUsername: string) {
  const follows = await prismaClient.follows.create({
    data: {
      followerUsername: targetUsername,
      followingUsername: username,
    },
  });
  return follows;
}
