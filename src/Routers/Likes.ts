import Router from "express";
import { authentication } from "../Middlewares/Auth";
import {
  checkCommentLiked,
  checkTweetLiked,
  likeComment,
  likeTweet,
  removeCommentLike,
  removeTweetLike,
} from "../Controllers/Likes";

const router = Router();

router.post("/like-tweet/:tweetId", authentication, likeTweet);
router.delete("/remove-like-tweet/:tweetId", authentication, removeTweetLike);
router.get("/isliked-tweet/:tweetId", authentication, checkTweetLiked);

router.post("/like-comment/:commentId", authentication, likeComment);
router.delete(
  "/remove-like-comment/:commentId",
  authentication,
  removeCommentLike
);
router.get("/isliked-comment/:commentId", authentication, checkCommentLiked);

export default router;
