import { Request, Response } from "express";
import { z } from "zod";
import { EmploymentType, JobStatus } from "@prisma/client";
import { jobsService } from "./jobs.service";
import { asyncHandler } from "../../utils/asyncHandler";

const createSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(10),
  location: z.string().min(2).max(150),
  employmentType: z.nativeEnum(EmploymentType),
  status: z.nativeEnum(JobStatus).optional(),
});

const updateSchema = createSchema.partial();
const statusSchema = z.object({ status: z.nativeEnum(JobStatus) });

export const jobsController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as JobStatus | undefined;
    const search = req.query.search as string | undefined;
    const jobs = await jobsService.list(req.user!.userId, { status, search });
    res.json(jobs);
  }),

  get: asyncHandler(async (req: Request, res: Response) => {
    const job = await jobsService.getById(req.user!.userId, Number(req.params.id));
    res.json(job);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = createSchema.parse(req.body);
    const job = await jobsService.create(req.user!.userId, data);
    res.status(201).json(job);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const data = updateSchema.parse(req.body);
    const job = await jobsService.update(req.user!.userId, Number(req.params.id), data);
    res.json(job);
  }),

  changeStatus: asyncHandler(async (req: Request, res: Response) => {
    const { status } = statusSchema.parse(req.body);
    const job = await jobsService.changeStatus(req.user!.userId, Number(req.params.id), status);
    res.json(job);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await jobsService.remove(req.user!.userId, Number(req.params.id));
    res.status(204).send();
  }),
};