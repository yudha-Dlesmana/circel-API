import { NextFunction, Request, Response } from "express";
import { registerUserProfile } from "../services/user/registerUserProfile";
import {
  editProfileSchema,
  profileSchema,
} from "../validation/profileValidation";
import { updateUserProfile } from "../services/user/updateUserProfile";
import { supabase } from "../utils/supabaseClient";

export async function postProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const input = req.body;
  const publicUrl = (req as any).publicUrl;
  const filePath = (req as any).filePath;
  const payload = { ...input, image: publicUrl };
  try {
    await profileSchema.validateAsync(payload);

    const profile = await registerUserProfile(userId, payload);

    res.status(200).json({ message: `user profile registered `, profile });
  } catch (error) {
    await supabase.storage.from("profileimg").remove([filePath]);

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
  const filePath = (req as any).filePath;
  const publicUrl = (req as any).publicUrl;

  const payload = { ...input, image: publicUrl };
  try {
    await editProfileSchema.validateAsync(payload);

    const profile = await updateUserProfile(userId, payload);

    res.status(200).json(profile);
  } catch (error) {
    await supabase.storage.from("profileimg").remove(filePath);
    next(error);
  }
}
