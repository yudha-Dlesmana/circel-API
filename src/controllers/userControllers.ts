import { NextFunction, Request, Response } from "express";
import { registerUserProfile } from "../services/user/registerUserProfile";
import { findUserProfile } from "../services/user/findUserProfile";
import { profileSchema } from "../validation/profileValidation";
import { updateUserProfile } from "../services/user/updateuserProfile";

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  try {
    console.log(userId);

    const userProfile = await findUserProfile(userId);

    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
}

export async function postProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const input = req.body;
  const publicUrl = (req as any).publicUrl;
  const payload = { ...input, image: publicUrl };
  try {
    await profileSchema.validateAsync(payload);

    await registerUserProfile(userId, payload);
    res.status(200).json({ message: `user profile registered ` });
  } catch (error) {
    next(error);
  }
}

export async function patchProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const input = req.body;
  const publicUrl = (req as any).publicUrl || "";
  const payload = { ...input, image: publicUrl };
  try {
    await profileSchema.validateAsync(payload);

    const profile = await updateUserProfile(userId, payload);

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
}
