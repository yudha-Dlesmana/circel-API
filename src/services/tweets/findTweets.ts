import { prismaClient } from "../../database/prisma";

export async function findAllTweets(
  userUsername: string,
  followingUsername: string[],
  followerUsername: string[]
) {
  const tweet = await prismaClient.tweet.findMany({
    where: {
      OR: [
        { username: userUsername },
        { username: { in: followingUsername } },
        { username: { in: followerUsername } },
      ],
    },

    orderBy: { createAt: "desc" },
  });
  return tweet;
}

export async function findTweet(id: number) {
  const tweet = await prismaClient.tweet.findUniqueOrThrow({
    where: { id },
  });
  return tweet;
}

export async function findUserTweets(username: string) {
  const tweet = await prismaClient.tweet.findMany({
    where: { username },
    orderBy: {
      createAt: "desc",
    },
  });
  return tweet;
}
