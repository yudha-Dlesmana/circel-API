import Router from "express";
import { authentication } from "../Middlewares/Auth";
import { uploadReplies } from "../Middlewares/uploadRepliesImage";
import {
  comment,
  getComment,
  getRepliesComment,
  repliesComment,
} from "../Controllers/commentController";

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
