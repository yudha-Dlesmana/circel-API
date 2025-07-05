import { supabase } from "../Utils/SupabaseClient";
import { Request, Response, NextFunction } from "express";
import { createTweets } from "../Services/Tweets/CreateTweet";
import {
  findAllTweets,
  findTweet,
  findUserTweets,
} from "../Services/Tweets/FindTweets";
import { findFollowers } from "../Services/Follows/FindFollowers";
import { findFollowing } from "../Services/Follows/FindFollowings";
import { createResponse, Status } from "../Utils/Response";

export async function postTweets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { text } = req.body;
  const tweetUrl = (req as any).tweetUrl;
  const tweetPath = (req as any).tweetPath;
  const userId = (req as any).user.id;
  const payload = {
    text,
    image: tweetUrl,
  };
  try {
    const tweet = await createTweets(userId, payload);
    res.statusCode = 201;
    res.statusMessage = "created";
    res.json(createResponse(Status.success, 200, "create tweet", tweet));
  } catch (error) {
    await supabase.storage.from("tweets").remove([tweetPath]);
    next(error);
  }
}

export async function getTweet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const tweet = await findTweet(Number(id));
    const payload = {
      id: tweet.id,
      text: tweet.text,
      image: tweet.image,
      createAt: tweet.createAt,
      username: tweet.user.username,
      name: tweet.user.name,
      userImage: tweet.user.profile?.image,
      comments: tweet._count.comment,
    };
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(createResponse(Status.success, 200, "get tweet", payload));
  } catch (error) {
    next(error);
  }
}

export async function getAlltweets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const { cursor } = req.query;

  const follower = await findFollowers(userId);
  const following = await findFollowing(userId);
  const followerId = follower.map((follower) => follower.id);
  const followingId = following.map((following) => following.id);

  try {
    const tweets = await findAllTweets(
      userId,
      followingId,
      followerId,
      Number(cursor)
    );

    const payload = {
      tweets: tweets.map((tweet) => ({
        id: tweet.id,
        text: tweet.text,
        image: tweet.image,
        createAt: tweet.createAt,
        username: tweet.user.username,
        name: tweet.user.name,
        userImage: tweet.user.profile?.image,
        comments: tweet._count.comment,
      })),
      cursor: tweets.length == 13 ? tweets[tweets.length - 1].id : undefined,
    };
    res.json(createResponse(Status.success, 200, "get all tweets", payload));
  } catch (error) {
    next(error);
  }
}

export async function getUserTweets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  const { cursor } = req.query;
  try {
    const tweets = await findUserTweets(userId, Number(cursor));

    const payload = {
      tweets: tweets.map((tweet) => ({
        id: tweet.id,
        text: tweet.text,
        image: tweet.image,
        createAt: tweet.createAt,
        username: tweet.user.username,
        name: tweet.user.name,
        userImage: tweet.user.profile?.image,
        likes: tweet._count.like,
        comments: tweet._count.comment,
      })),
      nextCursor: tweets.length ? tweets[tweets.length - 1].id : undefined,
    };
    res.json(createResponse(Status.success, 200, "User's tweets", payload));
  } catch (error) {
    next(error);
  }
}
