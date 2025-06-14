import { Router } from "express";
import { getUserProfile, postProfile } from "../controllers/userControllers";
import { authentication } from "../middlewares/auth";

const router = Router();

router.post("/profile", authentication, postProfile);
router.get("/profile", authentication, getUserProfile);
