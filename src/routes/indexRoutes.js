import { Router } from "express";
import userRouter from "./userRoute.js";

const router = Router()
router.use(userRouter)

export default router