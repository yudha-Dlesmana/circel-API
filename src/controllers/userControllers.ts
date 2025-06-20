import { Request, Response, NextFunction } from "express";
import { findUserProfile } from "../services/user/findUserProfile";

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
