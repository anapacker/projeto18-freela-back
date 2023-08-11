import { Router } from "express";
import { getUsers, getUsersById } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get("/users/:id", getUsersById)
userRouter.get("/users", getUsers)

export default userRouter