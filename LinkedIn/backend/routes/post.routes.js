import express from "express"
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"
import { comment, createPost, getPost, like } from "../controllers/post.controllers.js"
import { feedRateLimiter, generalRateLimiter } from "../middlewares/rateLimiter.js"

const postRouter=express.Router()

postRouter.post("/create", isAuth, generalRateLimiter, upload.single("image"), createPost)
postRouter.get("/getpost", isAuth, feedRateLimiter, getPost)
postRouter.get("/like/:id", isAuth, generalRateLimiter, like)
postRouter.post("/comment/:id", isAuth, generalRateLimiter, comment)

export default postRouter