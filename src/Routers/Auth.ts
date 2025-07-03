import { Router } from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../Controllers/Auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

export default router;
