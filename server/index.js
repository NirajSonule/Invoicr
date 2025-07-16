import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api", clientRouter);
app.use("/api", invoiceRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
