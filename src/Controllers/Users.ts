import { Request, Response, NextFunction } from "express";
import { findUser, findUserProfile } from "../Services/Users/FindUserProfiles";
import { findUserSuggestions } from "../Services/Users/FindUserSuggestions";
import { findFollowers } from "../Services/Follows/FindFollowers";
import { findFollowing } from "../Services/Follows/FindFollowings";
import { searchUsers } from "../Services/Users/SearchUsers";
import { getUsername } from "../Services/Users/GetUserProperties";
import { createResponse, Status } from "../Utils/Response";

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
      name: userProfile.name,
      email: userProfile.email,
      ...profile,
      ...follows,
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
      bio: user.profile?.bio,
      image: user.profile?.image,
      background: user.profile?.background,
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
      username: user.username,
      name: user.name,
      image: user.profile?.image,
      bio: user.profile?.bio,
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
      username: item.username,
      email: item.email,
      name: item.name,
      image: item.profile?.image,
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
      follower: follower.map((item) => ({
        name: item.name,
        username: item.username,
        bio: item.profile?.bio,
        image: item.profile?.image,
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
        image: item.profile?.image,
        bio: item.profile?.bio,
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
