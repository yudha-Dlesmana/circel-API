import { prismaClient } from "../../database/prisma";
interface payload {
  username: string;
  text: string;
  image?: string;
}

export async function createTweets(payload: payload) {
  const tweets = await prismaClient.tweet.create({
    data: {
      username: payload.username,
      text: payload.text,
      image: payload.image,
    },
  });

  return tweets;
}
