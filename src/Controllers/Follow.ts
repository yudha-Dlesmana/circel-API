import { Request, Response, NextFunction } from "express";
import { createFollow } from "../Services/Follow/CreateFollow";
import { deleteFollow } from "../Services/Follow/DeleteFollow";
import { findFollows } from "../Services/Follow/CheckFollow";
import { getUsername } from "../Services/User/GetUserProperties";
import { createResponse, Status } from "../Utils/Response";

export async function follow(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).user.id;
  const { targetId } = req.params;
  try {
    if (userId === targetId)
      throw new Error("Oops! You can't follow your own account.");
    const follow = await createFollow(userId, targetId);
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createResponse(Status.success, 200, `following ${follow.followerId}`, {})
    );
  } catch (error) {
    next(error);
  }
}

export async function unfollow(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const { targetId } = req.params;
  try {
    if (userId === targetId)
      throw new Error("Oops! You can't follow your own account.");
    await deleteFollow(userId, targetId);

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(createResponse(Status.success, 200, `unfollow ${targetId}`, {}));
  } catch (error) {
    next(error);
  }
}

export async function checkFollow(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const { targetUsername } = req.params;
  try {
    const { username } = await getUsername(userId);

    const isFollowed = await findFollows(username, targetUsername);
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(createResponse(Status.success, 200, "check follow", isFollowed));
  } catch (error) {
    next(error);
  }
}
