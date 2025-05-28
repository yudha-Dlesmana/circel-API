import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { getUserController } from "../controllers/user";

const router = Router()

router.get('/test', authentication, (req, res) => {
  res.send({message:"", user:(req as any).user})
})
router.get("/user", authentication, getUserController)


export default router