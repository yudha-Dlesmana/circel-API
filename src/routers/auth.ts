import { Router } from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controllers/authControllers";
import { authentication, authorization } from "../middlewares/auth";
import { limiter } from "../middlewares/rateLimit";
import { stripTypeScriptTypes } from "module";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

export default router;
