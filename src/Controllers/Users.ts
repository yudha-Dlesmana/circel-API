import { Request, Response, NextFunction } from "express";
import { findUser, findUserProfile } from "../Services/Users/FindUserProfiles";
import { findUserSuggestions } from "../Services/Users/FindUserSuggestions";
import { findFollowers } from "../Services/Follows/FindFollowers";
import { findFollowing } from "../Services/Follows/FindFollowings";
import { searchUsers } from "../Services/Users/SearchUsers";

import { createResponse, Status } from "../Utils/Response";

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    const userProfile = await findUserProfile(userId);
    const follows = userProfile._count;

    const payload = {
      username: userProfile.username,
      name: userProfile.name,
      bio: userProfile.bio,
      image: userProfile.image,
      background: userProfile.background,
      ...userProfile._count,
    };
    res.statusCode = 200;
    req.statusMessage = "OK";
    res.json(
      createResponse(Status.success, 200, "get your userprofile", payload)
    );
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
      name: user.name,
      bio: user.bio,
      image: user.image,
      background: user.background,
      follower: user._count.follower,
      following: user._count.following,
    };
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createResponse(Status.success, 200, `get ${username} profile`, payload)
    );
  } catch (error) {
    next(error);
  }
}

export async function getSearchUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const nameQuery = req.query.name as string;
  const userId = (req as any).userId;
  try {
    const user = await searchUsers(userId, nameQuery);
    const payload = user.map((user) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      image: user.image,
      bio: user.bio,
    }));
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createResponse(
        Status.success,
        200,
        `Search user with name: ${nameQuery}`,
        payload
      )
    );
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
    const suggestion = await findUserSuggestions(userId);
    const payload = suggestion.map((item) => ({
      id: item.id,
      username: item.username,
      name: item.name,
      image: item.image,
    }));
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(createResponse(Status.success, 200, "suggested users", payload));
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
  const { cursor } = req.query;
  try {
    const follower = await findFollowers(userId, cursor as string);
    const payload = {
      followers: follower.map((item) => ({
        id: item.id,
        name: item.name,
        username: item.username,
        bio: item.bio,
        image: item.image,
      })),
      cursor:
        follower.length == 10
          ? follower[follower.length - 1].username
          : undefined,
    };
    (res.statusCode = 200), (res.statusMessage = "OK");
    res.json(createResponse(Status.success, 200, "get followers", payload));
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
  const { cursor } = req.query;
  try {
    const following = await findFollowing(userId, cursor as string);

    const payload = {
      following: following.map((item) => ({
        name: item.name,
        username: item.username,
        image: item.image,
        bio: item.bio,
      })),
      cursor:
        following.length == 10
          ? following[following.length - 1].username
          : undefined,
    };
    res.statusCode = 200;
    res.statusMessage = "OK";

    res.json(createResponse(Status.success, 200, "get following", payload));
  } catch (error) {
    next(error);
  }
}
