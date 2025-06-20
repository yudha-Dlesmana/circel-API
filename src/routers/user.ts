import { Router } from "express";
import { authentication } from "../middlewares/auth";
import {
  getFollowed,
  getFollower,
  getSuggestedUser,
  getUserProfile,
} from "../controllers/userControllers";

const router = Router();

router.get("/user", authentication, getUserProfile);

router.get("/suggestedforyou", authentication, getSuggestedUser);

router.get("/followers", authentication, getFollower);

router.get("/followered", authentication, getFollowed);

export default router;
