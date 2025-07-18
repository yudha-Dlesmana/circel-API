import { Router } from "express";
import { authentication } from "../Middlewares/Auth";
import { checkFollow, follow, unfollow } from "../Controllers/Follows";

const router = Router();

router.post("/follow/:targetId", authentication, follow);
router.delete("/unfollow/:targetId", authentication, unfollow);
router.get("/isfollowed/:targetId", authentication, checkFollow);

export default router;
