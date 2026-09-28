import { Request, Response } from "express";
import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";
import { applicationsService } from "./applications.service";
import { asyncHandler } from "../../utils/asyncHandler";

const statusSchema = z.object({ status: z.nativeEnum(ApplicationStatus) });

export const applicationsController = {
  listByJob: asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as ApplicationStatus | undefined;
    const apps = await applicationsService.listByJob(
      req.user!.userId, Number(req.params.id), status
    );
    res.json(apps);
  }),

  get: asyncHandler(async (req: Request, res: Response) => {
    const app = await applicationsService.getById(req.user!.userId, Number(req.params.id));
    res.json(app);
  }),

  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    const { status } = statusSchema.parse(req.body);
    const app = await applicationsService.updateStatus(
      req.user!.userId, Number(req.params.id), status
    );
    res.json(app);
  }),
};