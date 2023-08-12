import { Router } from "express";
import { getMiaudelos, getMiaudelosById, postMiaudelos, putMiaudelo } from "../controllers/user.controller.js";
import { validateAuth } from "../middlewares/validate.auth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { miaudelosSchema } from "../schemas/miaudelos.schema.js";

const userRouter = Router()
userRouter.post("/miaudelos", validateSchema(miaudelosSchema), postMiaudelos)
userRouter.get("/miaudelos", getMiaudelos)
userRouter.get("/miaudelos/:id", getMiaudelosById)
userRouter.put("/miaudelos/:id", putMiaudelo)

export default userRouter