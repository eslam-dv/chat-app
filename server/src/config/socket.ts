import { Server } from "socket.io";
import express from "express";
import http from "http";

import { APP_ORIGIN } from "../constants/env";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [APP_ORIGIN],
  },
});

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = Array.isArray(socket.handshake.query.userId)
    ? socket.handshake.query.userId[0]
    : socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user diconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };
