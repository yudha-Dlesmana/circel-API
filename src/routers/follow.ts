import { Router } from "express";
import { authentication } from "../middlewares/auth";
import {
  checkFollow,
  follow,
  unfollow,
} from "../controllers/followControllers";

const router = Router();

router.post("/follow", authentication, follow);
router.post("/unfollow", authentication, unfollow);
router.get("/checkfollows", authentication, checkFollow);

export default router;
