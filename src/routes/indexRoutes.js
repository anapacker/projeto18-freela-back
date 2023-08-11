import { Router } from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.routes.js";

const router = Router()
router.use(userRouter)
router.use(authRouter)
export default router