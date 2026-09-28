import { Router } from "express";
import { publicController } from "./public.controller";

export const publicRoutes = Router();

publicRoutes.get("/jobs", publicController.list);            
publicRoutes.get("/stats", publicController.stats);
publicRoutes.get("/jobs/:id", publicController.getJob);
publicRoutes.post("/jobs/:id/applications", publicController.apply);