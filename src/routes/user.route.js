import { Router } from "express";
import { getMiaudelos, getMiaudelosById, postMiaudelos, putMiaudelo } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { miaudelosSchema } from "../schemas/miaudelos.schema.js";
import { validateAuth } from "../middlewares/validate.auth.js";
import { updateMiaudelosSchema } from "../schemas/update.miaudelo.schema.js";

const userRouter = Router()
userRouter.post("/miaudelos", validateAuth, validateSchema(miaudelosSchema), postMiaudelos)
userRouter.get("/miaudelos", getMiaudelos)
userRouter.get("/miaudelos/:id", getMiaudelosById)
userRouter.put("/miaudelos/:id", validateAuth, validateSchema(updateMiaudelosSchema), putMiaudelo)

export default userRouter