import express from "express";
import {
  generateOtp,
  getUser,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/user", isAuthenticated, getUser);
authRouter.post("/logout", logout);
authRouter.post("/send-otp", generateOtp);
authRouter.post("/reset", resetPassword);

export default authRouter;
