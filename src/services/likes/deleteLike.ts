import { prismaClient } from "../../database/prisma";

export async function deleteTweetLike(username: string, tweetId: number) {
  await prismaClient.like.delete({
    where: {
      tweetId_username: {
        username,
        tweetId,
      },
    },
  });
}

export async function deleteCommentLike(username: string, commentId: number) {
  await prismaClient.like.delete({
    where: {
      commentId_username: {
        username,
        commentId,
      },
    },
  });
}
