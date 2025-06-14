import { NextFunction, Request, Response } from "express";
import { registerUserProfile } from "../services/user/registerUserProfile";
import { findUserProfile } from "../services/user/findUserProfile";

export async function postProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).id;
  const profile = req.body;
  const imagePublicUrl = (req as any).imagePublicUrl;
  try {
    await registerUserProfile(userId, profile, imagePublicUrl);
    res.status(200).json({ message: `user profile registered ` });
  } catch (error) {
    next(error);
  }
}

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).userId;
  try {
    const userProfile = await findUserProfile(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
}
