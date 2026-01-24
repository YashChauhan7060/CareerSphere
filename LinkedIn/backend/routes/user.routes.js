import express from "express"
import { getCurrentUser, getprofile, getSuggestedUser, search, updateProfile } from "../controllers/user.controllers.js"
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"
import { feedRateLimiter, generalRateLimiter } from "../middlewares/rateLimiter.js"

let userRouter = express.Router()

userRouter.get("/currentuser", isAuth, generalRateLimiter, getCurrentUser)
userRouter.put("/updateprofile", isAuth, generalRateLimiter, upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
]), updateProfile)
userRouter.get("/profile/:userName", isAuth, feedRateLimiter, getprofile)
userRouter.get("/search", isAuth, feedRateLimiter, search)
userRouter.get("/suggestedusers", isAuth, feedRateLimiter, getSuggestedUser)


export default userRouter