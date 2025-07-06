import { Router } from "express";
import { patchProfile } from "../Controllers/Profiles";
import { authentication } from "../Middlewares/Auth";
import { uploadField } from "../Middlewares/UploadField";

const router = Router();

router.patch(
  "/profile",
  authentication,
  uploadField(["profile", "background"]),
  patchProfile
);

export default router;
