import Router from "express";
import { authentication } from "../Middlewares/Auth";
import {
  commentTweet,
  getComment,
  getRepliesComment,
} from "../Controllers/Comments";
import { uploadField } from "../Middlewares/UploadField";

const router = Router();

router.post(
  "/comment/:tweetId",
  authentication,
  uploadField(["comment"]),
  commentTweet
);
router.post("/reply/:tweetId/:parentId", authentication, commentTweet);

router.get("/comments/:tweetId", authentication, getComment);
router.get("/replies/:parentId", authentication, getRepliesComment);

export default router;
