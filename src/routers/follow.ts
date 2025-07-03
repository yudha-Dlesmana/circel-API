import { Router } from "express";
import { authentication } from "../middlewares/auth";
import {
  checkFollow,
  follow,
  unfollow,
} from "../Controllers/followControllers";

const router = Router();

router.post("/follow/:targetUsername", authentication, follow);
router.delete("/unfollow/:targetUsername", authentication, unfollow);
router.get("/isFollowed/:targetUsername", authentication, checkFollow);

export default router;
