import { Request, Response, NextFunction } from "express";
import { findUser, findUserProfile } from "../services/user/findUserProfile";
import { findUserSuggestions } from "../services/user/findUserSuggestions";
import { findFollowers } from "../services/follow/findFollower";
import { findFollowing } from "../services/follow/findFollowed";
import { searchUsers } from "../services/user/searchUser";
import { getUsername } from "../services/user/getUserProperties";

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

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const { username } = req.params;
  try {
    const user = await findUser(username);
    const payload = {
      username: user.username,
      image: user.profile?.image,
      bio: user.profile?.bio,
      follower: user._count.follower,
      following: user._count.following,
    };
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getSearchUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const query = req.query.name as string;
  try {
    const user = await searchUsers(query);
    const payload = user.map((user) => ({
      username: user.username,
      image: user.profile?.image,
      bio: user.profile?.bio,
    }));

    res.status(200).json(payload);
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
      image: item.profile?.image,
      bio: item.profile?.bio,
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
      image: item.profile?.image,
      bio: item.profile?.bio,
    }));

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}
