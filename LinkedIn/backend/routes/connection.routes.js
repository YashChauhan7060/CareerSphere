import express from "express"
import { acceptConnection, getConnectionCount, getConnectionRequests, getConnectionStatus, getUserConnections, rejectConnection, removeConnection, sendConnection } from "../controllers/connection.controllers.js"
import isAuth from "../middlewares/isAuth.js"
import { connectionRateLimiter, generalRateLimiter } from "../middlewares/rateLimiter.js"
let connectionRouter=express.Router()

connectionRouter.post("/send/:id", isAuth, connectionRateLimiter, sendConnection)

connectionRouter.put("/accept/:connectionId", isAuth, generalRateLimiter, acceptConnection)
connectionRouter.put("/reject/:connectionId", isAuth, generalRateLimiter, rejectConnection)
connectionRouter.get("/getstatus/:userId", isAuth, generalRateLimiter, getConnectionStatus)
connectionRouter.delete("/remove/:userId", isAuth, generalRateLimiter, removeConnection)
connectionRouter.get("/requests", isAuth, generalRateLimiter, getConnectionRequests)
connectionRouter.get("/", isAuth, generalRateLimiter, getUserConnections)
connectionRouter.get('/count', isAuth, generalRateLimiter, getConnectionCount)


export default connectionRouter