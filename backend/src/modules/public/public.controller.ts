import { Request, Response } from "express";
import { z } from "zod";
import { publicService } from "./public.service";
import { asyncHandler } from "../../utils/asyncHandler";

const submitSchema = z.object({
  candidateName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number").max(20),
  coverLetter: z.string().max(3000).optional(),
  resumeUrl: z.string().url("Please enter a valid URL (e.g., https://...)"),
});

export const publicController = {
  // NEW — list all published jobs
  list: asyncHandler(async (_req: Request, res: Response) => {
    const jobs = await publicService.listPublishedJobs();
    res.json(jobs);
  }),

  getJob: asyncHandler(async (req: Request, res: Response) => {
    const job = await publicService.getPublishedJob(Number(req.params.id));
    res.json(job);
  }),

  apply: asyncHandler(async (req: Request, res: Response) => {
    const data = submitSchema.parse(req.body);
    const application = await publicService.submitApplication(
      Number(req.params.id),
      data
    );
    res.status(201).json(application);
  }),

  stats: asyncHandler(async (_req: Request, res: Response) => {
    const stats = await publicService.getPublicStats();
    res.json(stats);
  }),
};