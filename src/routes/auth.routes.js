import { Router } from "express"
import { signin, signup } from "../controllers/auth.controller.js"
import { userSchema } from "../schemas/user.schema.js"
import { authSchema } from "../schemas/auth.schema.js"
import { validateSchema } from "../middlewares/validateSchema.js"

const authRouter = Router()

authRouter.post("/signup", validateSchema(userSchema), signup)
authRouter.post("/signin", validateSchema(authSchema), signin)

export default authRouter