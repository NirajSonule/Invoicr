import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoice,
  getInvoice,
  updateInvoice,
} from "../controllers/invoiceController.js";

const invoiceRouter = express.Router();

invoiceRouter.get("/invoice/:id", isAuthenticated, getInvoice);
invoiceRouter.get("/invoices", isAuthenticated, getAllInvoice);
invoiceRouter.post("/invoice", isAuthenticated, createInvoice);
invoiceRouter.put("/invoice/:id", isAuthenticated, updateInvoice);
invoiceRouter.delete("/invoice/:id", isAuthenticated, deleteInvoice);

export default invoiceRouter;
