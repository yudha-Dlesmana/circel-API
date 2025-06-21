import { Router } from "express";
import { authentication } from "../middlewares/auth";
import {
  checkFollow,
  follow,
  unfollow,
} from "../controllers/followControllers";

const router = Router();

router.post("/follow/:targetUsername", authentication, follow);
router.delete("/unfollow/:targetUsername", authentication, unfollow);

export default router;
