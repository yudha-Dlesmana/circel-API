import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { uploadTweets } from "../middlewares/uploadsTweetImage";
import { postTweets } from "../controllers/tweetControllers";

const router = Router();

router.post("/tweets", authentication, uploadTweets("image"), postTweets);

export default router;
