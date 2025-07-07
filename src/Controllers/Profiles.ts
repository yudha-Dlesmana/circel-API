import { NextFunction, Request, Response } from "express";
import { editProfileSchema, profileSchema } from "../Schemas/Profiles";
import { updateUserProfile } from "../Services/Users/UpdateUserProfile";
import { supabase } from "../Utils/SupabaseClient";
import { createResponse, Status } from "../Utils/Response";

export async function patchProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id;
  const input = req.body;
  const profileUrl = (req as any).profileUrl;
  const profilePath = (req as any).profilePath;
  const backgroundUrl = (req as any).backgroundUrl;
  const backgroundPath = (req as any).backgroundPath;
  const deleteProfile = input.deleteProfile === "true";
  const deleteBackground = input.deleteBackground === "true";

  const payload = {
    ...input,
    profile: profileUrl,
    background: backgroundUrl,
    deleteProfile,
    deleteBackground,
  };
  try {
    editProfileSchema.parse(payload);

    const updateProfile = await updateUserProfile(userId, payload);

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.json(
      createResponse(Status.success, 200, "Profile updated successfully.", {
        username: updateProfile.username,
        name: updateProfile.name,
        bio: updateProfile.bio,
        image: updateProfile.image,
        background: updateProfile.background,
      })
    );
  } catch (error) {
    await supabase.storage.from("profile").remove(profilePath);
    await supabase.storage.from("background").remove(backgroundPath);
    next(error);
  }
}
