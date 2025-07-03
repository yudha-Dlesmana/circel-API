import { Router } from "express";
import { patchProfile, postProfile } from "../Controllers/profileControllers";
import { authentication } from "../Middlewares/Auth";
import { supabaseUpload } from "../Middlewares/UploadsProfileImage";

const router = Router();

router.post("/profile", authentication, supabaseUpload("image"), postProfile);

router.patch("/profile", authentication, supabaseUpload("image"), patchProfile);

export default router;
