import Router from "express";
import { authentication } from "../middlewares/auth";
import { isLiked, like, unlike } from "../controllers/likeController";

const router = Router();

router.post("/like", authentication, like);
router.delete("/unlike", authentication, unlike);
router.get("/isliked", authentication, isLiked);

export default router;
