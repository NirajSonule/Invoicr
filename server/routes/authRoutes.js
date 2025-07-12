import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/user", isAuthenticated, getUser);
authRouter.post("/logout", logout);

export default authRouter;
