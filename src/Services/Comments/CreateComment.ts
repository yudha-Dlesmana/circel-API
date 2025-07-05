import { prismaClient } from "../../database/prisma";

interface payload {
  text: string;
  imageUrl?: string;
}
interface relation {
  userId: string;
  tweetId: number;
  parentId?: number;
}

export async function createComment(payload: payload, relation: relation) {
  const comment = await prismaClient.comment.create({
    data: {
      tweetId: relation.tweetId,
      userId: relation.userId,
      parentId: relation.parentId,
      text: payload.text,
      image: payload?.imageUrl,
    },
  });
  return comment;
}
