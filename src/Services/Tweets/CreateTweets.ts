import { prismaClient } from "../../database/prisma";
import type { Tweet } from "../../Schema/tweetsValidation";

export async function createTweets(userId: string, payload: Tweet) {
  const post = await prismaClient.tweet.create({
    data: {
      userId,
      text: payload.text,
      image: payload.image,
    },
  });

  return post;
}
