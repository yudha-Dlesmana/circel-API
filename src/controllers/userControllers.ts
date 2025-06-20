import { Request, Response, NextFunction } from "express";
import { findUserProfile } from "../services/user/findUserProfile";
import { findUserSuggestions } from "../services/user/findUserSuggestions";
import { findFollowers } from "../services/follow/findFollower";
import { findFollowed } from "../services/follow/findFollowed";

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    const userProfile = await findUserProfile(userId);

    const profile = userProfile.profile;

    const payload = {
      username: userProfile.username,
      email: userProfile.email,
      ...profile,
    };

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getSuggestedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    const suggestion = await findUserSuggestions(userId);

    res.status(200).json(suggestion);
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
    const follower = await findFollowers(userId);
    res.status(200).json(follower);
  } catch (error) {
    next(error);
  }
}

export async function getFollowed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    const followed = await findFollowed(userId);
    res.status(200).json(followed);
  } catch (error) {
    next(error);
  }
}
