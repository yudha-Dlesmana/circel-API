import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { uploadTweets } from "../middlewares/uploadsTweetImage";
import {
  deleteTweets,
  getAlltweets,
  getTweet,
  getUserTweets,
  patchTweets,
  postTweets,
} from "../Controllers/tweetControllers";

const router = Router();

router.post("/tweets", authentication, uploadTweets("image"), postTweets);
router.patch("/tweets", authentication, uploadTweets("image"), patchTweets);
router.delete("/tweets", authentication, deleteTweets);
router.get("/tweets/:username", authentication, getUserTweets);
router.get("/feeds", authentication, getAlltweets);
router.get("/tweet/:id", authentication, getTweet);

export default router;
