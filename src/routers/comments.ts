import Router from "express";
import { authentication } from "../middlewares/auth";
import { uploadReplies } from "../middlewares/uploadRepliesImage";
import {
  comment,
  getComment,
  getRepliesComment,
  repliesComment,
} from "../controllers/commentController";

const router = Router();

router.post(
  "/comment/:tweetId",
  authentication,
  uploadReplies("image"),
  comment
);
router.post("/replies/:tweetId/:parentId", authentication, repliesComment);

router.get("/comment/:tweetId", authentication, getComment);
router.get("/replies/:parentId", authentication, getRepliesComment);

export default router;
