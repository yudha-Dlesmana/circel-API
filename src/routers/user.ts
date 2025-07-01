import { Router } from "express";
import { authentication } from "../middlewares/auth";
import {
  getFollower,
  getFollowing,
  getSearchUser,
  getSuggestionUser,
  getUser,
  getUserProfile,
} from "../controllers/userControllers";

const router = Router();

router.get("/user", authentication, getUserProfile);
router.get("/user/:username", authentication, getUser);
router.get("/search-user", authentication, getSearchUser);
router.get("/suggestion", authentication, getSuggestionUser);
router.get("/followers", authentication, getFollower);
router.get("/following", authentication, getFollowing);

export default router;
