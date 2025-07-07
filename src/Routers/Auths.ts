import { Router } from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../Controllers/Auths";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.patch("/reset/:token", resetPassword);

export default router;
