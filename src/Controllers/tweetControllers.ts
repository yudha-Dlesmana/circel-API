import { supabase } from "../Utils/SupabaseClient";
import { Request, Response, NextFunction } from "express";
import { getUsername } from "../Services/User/GetUserProperties";
import { createTweets } from "../Services/tweets/createTweets";
import { deleteTweet } from "../Services/tweets/deleteTweets";
import {
  findAllTweets,
  findTweet,
  findUserTweets,
} from "../Services/tweets/findTweets";
import { editTweet } from "../Services/tweets/editTweets";
import { findFollowers } from "../Services/Follow/FindFollower";
import { findFollowing } from "../Services/Follow/FindFollowing";

export async function postTweets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { text } = req.body;
  const ImagePublicUrl = (req as any).ImagePublicUrl;
  const filePath = (req as any).filePath;

  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;

  const payload = {
    username,
    image: ImagePublicUrl,
    text,
  };

  try {
    const tweet = await createTweets(payload);
    res.status(200).json(tweet);
  } catch (error) {
    await supabase.storage.from("tweets").remove([filePath]);
    next(error);
  }
}

export async function deleteTweets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;

  const { id } = req.query;

  const tweet = await findTweet(Number(id));
  const latestpublicUrl = tweet?.image;

  try {
    await deleteTweet(Number(id), username);

    if (latestpublicUrl) {
      const filePath = (latestpublicUrl as string).split(
        "/object/public/tweets/"
      )[1];
      await supabase.storage.from("tweets").remove([filePath]);
    }
    res.status(200).json({ message: `post ${id} deleted` });
  } catch (error) {
    next(error);
  }
}

export async function patchTweets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const username = (await getUsername(userId)).username;

  const { id } = req.query;
  const { text } = req.body;

  const newImagePublicUrl = (req as any).ImagePublicUrl;
  const newFilePath = (req as any).filePath;

  const payload = {
    text,
    image: newImagePublicUrl,
  };

  const tweet = await findTweet(Number(id));
  const latestpublicUrl = tweet?.image;

  try {
    const editedTweet = await editTweet(Number(id), username, payload);
    if (latestpublicUrl) {
      const filePath = (latestpublicUrl as string).split(
        "/object/public/tweets/"
      )[1];
      const { error } = await supabase.storage
        .from("tweets")
        .remove([filePath]);
      if (error) console.log("gagal delete");
    }

    res.status(200).json(editedTweet);
  } catch (error) {
    await supabase.storage.from("tweets").remove([newFilePath]);
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
      username: tweet.username,
      name: tweet.user.profile?.name,
      userImage: tweet.user.profile?.image,
      comments: tweet._count.comment,
    };
    res.status(200).json(payload);
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
  const username = (await getUsername(userId)).username;
  const follower = await findFollowers(username);
  const following = await findFollowing(username);
  const followerUsername = follower.map((follower) => follower.username);
  const followingUsername = following.map((following) => following.username);

  try {
    const tweets = await findAllTweets(
      username,
      followerUsername,
      followingUsername
    );

    const payload = tweets.map((tweet) => ({
      id: tweet.id,
      text: tweet.text,
      image: tweet.image,
      createAt: tweet.createAt,
      username: tweet.username,

      userImage: tweet.user.profile?.image,
      comments: tweet._count.comment,
    }));
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getUserTweets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.params;
  try {
    const tweets = await findUserTweets(username);

    const payload = tweets.map((tweet) => ({
      id: tweet.id,
      text: tweet.text,
      image: tweet.image,
      createAt: tweet.createAt,
      username: tweet.username,
      name: tweet.user.profile?.name,
      userImage: tweet.user.profile?.image,
      likes: tweet._count.like,
      comments: tweet._count.comment,
    }));
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}
