import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import helmet from "helmet";
import cors from "cors";

import { createRoles, createAdmin } from "./models";
import ordersRoutes from "./routes/orders.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();
createRoles();
createAdmin();

// Settings
const PORT = process.env.PORT;
app.set("pkg", pkg);
app.set("port", PORT || 8080);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// welcome routes
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a la API de Tripool",
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version
  });
});

// Routes
app.use("/api/orders", ordersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
