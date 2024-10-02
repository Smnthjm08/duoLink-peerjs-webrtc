// backend/src/index.ts
import { Server } from "socket.io";
import { createServer } from "http";
const express = require("express");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.emit("message", `Hello User ${socket.id}`);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
