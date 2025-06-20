import { Router } from "express";
import { authentication } from "../middlewares/auth";

const router = Router();

router.post("/follow", authentication);
router.post("/unfollow", authentication);
