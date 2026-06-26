import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";


import routes from "./routes/index.js";

const app = express();


/* =========================
   CORS (FIXED)
========================= */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));


app.use(helmet());/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Restaurant API Running 🚀",
  });
});

/* =========================
   ROUTES
========================= */
app.use("/api", routes);

export default app;