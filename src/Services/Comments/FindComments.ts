import { prismaClient } from "../../database/prisma";

export async function findComments(tweetId: number, cursor?: number) {
  const comment = await prismaClient.comment.findMany({
    where: {
      tweetId,
      parentId: null,
    },
    select: {
      id: true,
      text: true,
      image: true,
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
      _count: {
        select: {
          like: true,
          replies: true,
        },
      },
      createAt: true,
    },
    take: 5,
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
  return comment;
}

export async function findReplies(parentId: number, cursor?: number) {
  const replies = await prismaClient.comment.findMany({
    where: {
      parentId,
    },
    select: {
      id: true,
      text: true,
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
      _count: {
        select: {
          like: true,
        },
      },
      createAt: true,
    },
    take: 3,
    skip: cursor ? 1 : 0,
    ...(cursor && {
      cursor: { id: cursor },
    }),
    orderBy: {
      createAt: "desc",
    },
  });
  return replies;
}
