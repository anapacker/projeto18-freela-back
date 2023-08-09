import { Router } from "express"
import { userSchemaValidation } from "../middlewares/validate.user.schema.js"
import { signin, signup } from "../controllers/user.controller.js"

const userRouter = Router()
userRouter.post("/signup", userSchemaValidation, signup)
userRouter.post("/signin", signin)

export default userRouter