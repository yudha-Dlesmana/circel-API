import { prismaClient } from "../../database/prisma";

interface payload {
  text: string;
  image?: string;
  deleteImage?: boolean;
}
export async function editTweet(
  id: number,
  username: string,
  payload: payload
) {
  const tweetEdited = prismaClient.tweet.update({
    where: {
      id,
      username,
    },
    data: {
      text: payload.text,
      image: !!payload.image ? payload.image : null,
    },
  });
  return tweetEdited;
}
