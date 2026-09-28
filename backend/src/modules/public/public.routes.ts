import { Router } from "express";
import { publicController } from "./public.controller";

export const publicRoutes = Router();
publicRoutes.get("/jobs/:id", publicController.getJob);
publicRoutes.post("/jobs/:id/applications", publicController.apply);
publicRoutes.get("/stats", publicController.stats);