import express from "express";
import {
  getClient,
  getAllClient,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const clientRouter = express.Router();

clientRouter.get("/client/:id", isAuthenticated, getClient);
clientRouter.get("/clients", isAuthenticated, getAllClient);
clientRouter.post("/client", isAuthenticated, createClient);
clientRouter.put("/client/:id", isAuthenticated, updateClient);
clientRouter.delete("/client/:id", isAuthenticated, deleteClient);

export default clientRouter;
