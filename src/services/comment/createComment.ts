import { prismaClient } from "../../database/prisma";

interface payload {
  text: string;
  image?: string;
}
interface relation {
  username: string;
  tweetId: number;
  parentId?: number;
}

export async function createComment(payload: payload, relation: relation) {
  const comment = await prismaClient.comment.create({
    data: {
      username: relation.username,
      tweetId: relation.tweetId,
      parentId: relation.parentId,
      text: payload.text,
      image: payload?.image,
    },
  });
  return comment;
}
