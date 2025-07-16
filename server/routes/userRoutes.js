import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import { deleteUser, updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.put("/update-user", isAuthenticated, updateUser);
userRouter.delete("/delete-user", isAuthenticated, deleteUser);

export default userRouter;
