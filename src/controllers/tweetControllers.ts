import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import { Request, Response, NextFunction } from "express";
import { getUsername } from "../services/user/getUsername";
import { tweetsSchema } from "../validation/tweetsValidation";
import { createTweets } from "../services/tweets/createTweets";

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
    await tweetsSchema.validateAsync(payload);

    const tweet = await createTweets(payload);
    res.status(200).json(tweet);
  } catch (error) {
    await supabase.storage.from("tweets").remove([filePath]);
    next(error);
  }
}
