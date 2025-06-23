import { prismaClient } from "../../database/prisma";

export async function deleteFollow(username: string, targetUsername: string) {
  await prismaClient.follows.delete({
    where: {
      followerUsername_followingUsername: {
        followerUsername: targetUsername,
        followingUsername: username,
      },
    },
  });
}
