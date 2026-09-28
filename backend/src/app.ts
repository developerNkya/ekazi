import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { jobsRoutes } from "./modules/jobs/jobs.routes";
import { applicationsRoutes } from "./modules/applications/applications.routes";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";
import { publicRoutes } from "./modules/public/public.routes";

export const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/public", publicRoutes);
app.use("/auth", authRoutes);
app.use("/jobs", jobsRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/", applicationsRoutes);

app.use((_req, res) => res.status(404).json({ message: "Route not found" }));
app.use(errorHandler);