import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { getUserProfile } from "../controllers/userControllers";

const router = Router();

router.get("/user", authentication, getUserProfile);

export default router;
