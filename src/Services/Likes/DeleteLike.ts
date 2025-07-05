import { prismaClient } from "../../database/prisma";

export async function deleteTweetLike(userId: string, tweetId: number) {
  await prismaClient.like.delete({
    where: {
      tweetId_userId: {
        userId,
        tweetId,
      },
    },
  });
}

export async function deleteCommentLike(userId: string, commentId: number) {
  await prismaClient.like.delete({
    where: {
      commentId_userId: {
        userId,
        commentId,
      },
    },
  });
}
