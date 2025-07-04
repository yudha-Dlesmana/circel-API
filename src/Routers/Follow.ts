import { Router } from "express";
import { authentication } from "../Middlewares/Auth";
import { checkFollow, follow, unfollow } from "../Controllers/Follow";

const router = Router();

router.post("/follow/:targetId", authentication, follow);
router.delete("/unfollow/:targetId", authentication, unfollow);
router.get("/isFollowed/:targetId", authentication, checkFollow);

export default router;
