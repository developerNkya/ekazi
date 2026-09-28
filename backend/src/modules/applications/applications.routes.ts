import { Router } from "express";
import { applicationsController } from "./applications.controller";
import { authenticate } from "../../middleware/auth";

export const applicationsRoutes = Router();
applicationsRoutes.get("/applications/:id", authenticate, applicationsController.get);
applicationsRoutes.patch("/applications/:id/status", authenticate, applicationsController.updateStatus);