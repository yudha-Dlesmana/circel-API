import { prismaClient } from "../../database/prisma";

export async function findComments(tweetId: number) {
  const comment = await prismaClient.comment.findMany({
    where: {
      tweetId,
      parentId: null,
    },
    select: {
      id: true,
      text: true,
      image: true,
      username: true,
      user: {
        select: {
          profile: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
      createAt: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return comment;
}

export async function findReplies(parentId: number) {
  const replies = await prismaClient.comment.findMany({
    where: {
      parentId,
    },
    select: {
      id: true,
      text: true,
      username: true,
      user: {
        select: {
          profile: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      createAt: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return replies;
}
