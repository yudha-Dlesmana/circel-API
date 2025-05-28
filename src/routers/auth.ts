import { Router } from "express";
import { forgotPassword, loginUser, registerUser, resetPassword } from "../controllers/auth";
import { authentication, authorization } from "../middlewares/auth";
import { upload } from "../utils/multer";
import { limiter } from "../middlewares/rateLimit";
import { stripTypeScriptTypes } from "module";

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser);
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password', resetPassword)

export default router