import { Router } from "express";
import {
  getUserProfile,
  patchProfile,
  postProfile,
} from "../controllers/userControllers";
import { authentication } from "../middlewares/auth";
import { supabaseUpload } from "../middlewares/supabaseUploads";

const router = Router();

router.get("/user", authentication, getUserProfile);

router.post("/profile", authentication, supabaseUpload("image"), postProfile);

router.patch("/profile", authentication, supabaseUpload("image"), patchProfile);

export default router;
