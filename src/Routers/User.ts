import { Router } from "express";
import { authentication } from "../Middlewares/Auth";
import {
  getFollower,
  getFollowing,
  getSearchUser,
  getSuggestionUser,
  getUser,
  getUserProfile,
} from "../Controllers/Users";

const router = Router();

router.get("/user", authentication, getUserProfile);
router.get("/user/:username", authentication, getUser);
router.get("/search-user", authentication, getSearchUser);
router.get("/suggestion", authentication, getSuggestionUser);
router.get("/followers", authentication, getFollower); //test
router.get("/following", authentication, getFollowing); //test

export default router;
