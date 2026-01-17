import express from 'express';
import { login,logOut,signUp } from '../controllers/auth.controllers.js';

let authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

export default authRouter;
