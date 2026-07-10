import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { setIO } from "./socket.js";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

setIO(io);

io.on("connection", (socket) => {
  console.log("🟢 Socket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Socket Disconnected:", socket.id);
  });
});

const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();
