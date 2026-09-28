import { Router } from "express";
import { jobsController } from "./jobs.controller";
import { authenticate } from "../../middleware/auth";
import { applicationsController } from "../applications/applications.controller";

export const jobsRoutes = Router();
jobsRoutes.use(authenticate);

jobsRoutes.get("/", jobsController.list);
jobsRoutes.post("/", jobsController.create);
jobsRoutes.get("/:id", jobsController.get);
jobsRoutes.patch("/:id", jobsController.update);
jobsRoutes.patch("/:id/status", jobsController.changeStatus);
jobsRoutes.delete("/:id", jobsController.remove);
jobsRoutes.get("/:id/applications", applicationsController.listByJob);