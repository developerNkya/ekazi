import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { asyncHandler } from "../../utils/asyncHandler";

export const dashboardController = {
  stats: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const [totalJobs, publishedJobs, totalApplications] = await Promise.all([
      prisma.job.count({ where: { userId } }),
      prisma.job.count({ where: { userId, status: "PUBLISHED" } }),
      prisma.application.count({ where: { job: { userId } } }),
    ]);
    res.json({ totalJobs, publishedJobs, totalApplications });
  }),
};