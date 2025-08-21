import { Router } from "express";

import protect from "../middleware/authMiddleware";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/messageController";

const messageRouter = Router();

messageRouter.get("/users", protect, getUsersForSidebar);
messageRouter.get("/:id", protect, getMessages);

messageRouter.post("/send/:id", protect, sendMessage);

export default messageRouter;
