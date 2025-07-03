import { NextFunction, Request, Response } from "express";
import { registerUserProfile } from "../Services/user/registerUserProfile";
import { editProfileSchema, profileSchema } from "../Schme/ProfileSchema";
import { updateUserProfile } from "../Services/user/updateUserProfile";
import { supabase } from "../Utils/SupabaseClient";
import { createReponse, Status } from "../Utils/Response";

export async function createProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const input = req.body;
  const profileUrl = (req as any).profileUrl;
  const profilePath = (req as any).profilePath;
  const payload = { ...input, image: profileUrl };
  try {
    profileSchema.parse(payload);

    const profile = await registerUserProfile(userId, payload);
    res.statusCode = 201;
    res.statusMessage = "Created";
    res.json(
      createReponse(Status.success, 201, "Profile created successfully", {
        userId: profile.userId,
        bio: profile.bio,
        image: profile.image,
      })
    );
  } catch (error) {
    await supabase.storage.from("profile").remove([profilePath]);
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
    editProfileSchema.parse(payload);

    const profile = await updateUserProfile(userId, payload);

    res.status(200).json(profile);
  } catch (error) {
    await supabase.storage.from("profile").remove(filePath);
    next(error);
  }
}
