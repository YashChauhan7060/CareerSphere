import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { clearAllNotification, deleteNotification, getNotifications } from "../controllers/notification.controllers.js"
import { generalRateLimiter } from "../middlewares/rateLimiter.js"

let notificationRouter=express.Router()

notificationRouter.get("/get", isAuth, generalRateLimiter, getNotifications)
notificationRouter.delete("/deleteone/:id", isAuth, generalRateLimiter, deleteNotification)
notificationRouter.delete("/", isAuth, generalRateLimiter, clearAllNotification)
export default notificationRouter