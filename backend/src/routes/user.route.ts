import { Router } from "express";
import { registerUser, loginUser, getUser } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/me", authenticate, getUser)

export default userRouter