import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import routes from "./routes";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", routes);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
