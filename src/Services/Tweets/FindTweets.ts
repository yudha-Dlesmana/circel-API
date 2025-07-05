import { prismaClient } from "../../database/prisma";

export async function findTweet(id: number) {
  const tweet = await prismaClient.tweet.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      text: true,
      image: true,
      createAt: true,
      _count: {
        select: {
          comment: true,
          like: true,
        },
      },
      user: {
        select: {
          name: true,
          username: true,
          profile: {
            select: {
              image: true,
            },
          },
        },
      },
    },
  });
  return tweet;
}

export async function findAllTweets(
  userId: string,
  followingId: string[],
  followerId: string[],
  cursor?: number
) {
  const tweet = await prismaClient.tweet.findMany({
    where: {
      OR: [
        { userId: userId },
        { userId: { in: followingId } },
        { userId: { in: followerId } },
      ],
    },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          username: true,
          profile: {
            select: {
              image: true,
            },
          },
        },
      },
      createAt: true,
      text: true,
      image: true,
      _count: {
        select: {
          comment: true,
        },
      },
    },
    take: 13,
    skip: cursor ? 1 : 0,
    ...(cursor && {
      cursor: {
        id: cursor,
      },
    }),
    orderBy: { createAt: "desc" },
  });
  return tweet;
}

export async function findUserTweets(userId: string, cursor?: number) {
  const tweet = await prismaClient.tweet.findMany({
    where: { userId },
    select: {
      id: true,
      text: true,
      image: true,
      createAt: true,
      _count: {
        select: {
          comment: true,
          like: true,
        },
      },
      user: {
        select: {
          name: true,
          username: true,
          profile: {
            select: {
              image: true,
            },
          },
        },
      },
    },
    skip: cursor ? 1 : 0,
    ...(cursor && {
      cursor: {
        id: cursor,
      },
    }),
    orderBy: {
      createAt: "desc",
    },
  });
  return tweet;
}
