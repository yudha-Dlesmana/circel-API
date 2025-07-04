import { Router } from "express";
import { authentication } from "../Middlewares/Auth";
import {
  getAlltweets,
  getTweet,
  getUserTweets,
  postTweets,
} from "../Controllers/Tweets";
import { uploadField } from "../Middlewares/UploadField";

const router = Router();

router.post("/tweets", authentication, uploadField(["tweet"]), postTweets);
router.get("/tweets/:username", authentication, getUserTweets);
router.get("/tweets", authentication, getAlltweets);
router.get("/tweet/:id", authentication, getTweet);

export default router;
