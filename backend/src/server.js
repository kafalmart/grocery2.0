import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";

import http from "http";
import { Server } from "socket.io";

import { setIO } from "./socket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

setIO(io);

io.on("connection", (socket) => {
  console.log("🟢 Partner Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Partner Disconnected:", socket.id);
  });
});

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
