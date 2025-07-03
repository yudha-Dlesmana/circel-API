import { Router } from "express";
import { createProfile, patchProfile } from "../Controllers/Profile";
import { authentication } from "../Middlewares/Auth";
import { uploadField } from "../Middlewares/UploadField";

const router = Router();

router.post(
  "/profile",
  authentication,
  uploadField(["profile"]),
  createProfile
);

router.patch(
  "/profile",
  authentication,
  uploadField(["profile", "background"]),
  patchProfile
);

export default router;
