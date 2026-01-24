import express from "express"
import { login, logOut, signUp } from "../controllers/auth.controllers.js"
import { authRateLimiter } from "../middlewares/rateLimiter.js"

let authRouter=express.Router()

authRouter.post("/signup",authRateLimiter,signUp)
authRouter.post("/login",authRateLimiter,login)
authRouter.get("/logout",authRateLimiter,logOut)

export default authRouter