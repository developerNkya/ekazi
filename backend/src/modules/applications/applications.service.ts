import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { ApplicationStatus } from "@prisma/client";

export const applicationsService = {
  async listByJob(ownerId: number, jobId: number, status?: ApplicationStatus) {
    const job = await prisma.job.findFirst({ where: { id: jobId, userId: ownerId } });
    if (!job) throw new ApiError(404, "Job not found");
    return prisma.application.findMany({
      where: { jobId, ...(status ? { status } : {}) },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(ownerId: number, id: number) {
    const app = await prisma.application.findUnique({ where: { id }, include: { job: true } });
    if (!app) throw new ApiError(404, "Application not found");
    if (app.job.userId !== ownerId) throw new ApiError(403, "Forbidden");
    return app;
  },

  async updateStatus(ownerId: number, id: number, status: ApplicationStatus) {
    await this.getById(ownerId, id);
    return prisma.application.update({ where: { id }, data: { status } });
  },
};