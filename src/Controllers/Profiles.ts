import { NextFunction, Request, Response } from "express";
import { registerUserProfile } from "../Services/Profile/RegisterUserProfile";
import { editProfileSchema, profileSchema } from "../Schemas/ProfileSchema";
import { updateUserProfile } from "../Services/Profile/UpdateUserProfile";
import { supabase } from "../Utils/SupabaseClient";
import { createResponse, Status } from "../Utils/Response";

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
      createResponse(Status.success, 201, "Profile created successfully.", {
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
  const profileUrl = (req as any).profileUrl;
  const profilePath = (req as any).profilePath;
  const backgroundUrl = (req as any).backgroundUrl;
  const backgroundPath = (req as any).backgroundPath;
  const deleteImage = input.deleteImage === "true";
  const deleteBackground = input.deleteBackground === "true";

  const payload = {
    ...input,
    image: profileUrl,
    background: backgroundUrl,
    deleteImage,
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
        bio: updateProfile.profile?.bio,
        image: updateProfile.profile?.image,
        background: updateProfile.profile?.background,
      })
    );
  } catch (error) {
    await supabase.storage.from("profile").remove(profilePath);
    await supabase.storage.from("background").remove(backgroundPath);
    next(error);
  }
}
