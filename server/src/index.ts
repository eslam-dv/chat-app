import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routes/authRoute";
import messageRouter from "./routes/messageRoute";

import { app, server } from "./config/socket";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

// Error Handler Middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`server running on port "${PORT}" in environment "${NODE_ENV}"`);
  connectDB();
});
