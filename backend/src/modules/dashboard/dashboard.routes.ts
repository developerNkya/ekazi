import { Router } from "express";
import { dashboardController } from "./dashboard.controller";
import { authenticate } from "../../middleware/auth";

export const dashboardRoutes = Router();
dashboardRoutes.get("/stats", authenticate, dashboardController.stats);