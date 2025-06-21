import { Request, Response, NextFunction } from "express";
import { findUserProfile } from "../services/user/findUserProfile";
import { findUserSuggestions } from "../services/user/findUserSuggestions";
import { findFollowers } from "../services/follow/findFollower";
import { findFollowing } from "../services/follow/findFollowed";
import { findUsers } from "../services/user/findUsers";
import { getUsername } from "../services/user/getUsername";

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    const userProfile = await findUserProfile(userId);

    const profile = userProfile.profile;
    const follows = userProfile._count;

    const payload = {
      username: userProfile.username,
      email: userProfile.email,
      ...profile,
      ...follows,
    };

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUsers();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getSuggestionUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    const { username } = await getUsername(userId);

    const suggestion = await findUserSuggestions(username);
    const payload = suggestion.map((item) => ({
      username: item.username,
      name: item.profile?.name,
      image: item.profile?.image,
      ...item.follower,
    }));

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getFollower(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    const { username } = await getUsername(userId);
    const follower = await findFollowers(username);
    const payload = follower.map((item) => ({
      username: item.username,
      name: item.profile?.name,
      image: item.profile?.image,
    }));

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getFollowing(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    const { username } = await getUsername(userId);
    const following = await findFollowing(username);
    const payload = following.map((item) => ({
      username: item.username,
      name: item.profile?.name,
      image: item.profile?.image,
    }));

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}
