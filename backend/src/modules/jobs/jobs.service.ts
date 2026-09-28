import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { EmploymentType, JobStatus } from "@prisma/client";

export const jobsService = {
  async list(userId: number, filters: { status?: JobStatus; search?: string }) {
    return prisma.job.findMany({
      where: {
        userId,
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.search ? { title: { contains: filters.search } } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { applications: true } } },
    });
  },

  async getById(userId: number, id: number) {
    const job = await prisma.job.findFirst({
      where: { id, userId },
      include: { _count: { select: { applications: true } } },
    });
    if (!job) throw new ApiError(404, "Job not found");
    return job;
  },

  async create(userId: number, data: {
    title: string; description: string; location: string;
    employmentType: EmploymentType; status?: JobStatus;
  }) {
    return prisma.job.create({ data: { ...data, userId } });
  },

  async update(userId: number, id: number, data: Partial<{
    title: string; description: string; location: string;
    employmentType: EmploymentType; status: JobStatus;
  }>) {
    await this.getById(userId, id);
    return prisma.job.update({ where: { id }, data });
  },

  async remove(userId: number, id: number) {
    await this.getById(userId, id);
    await prisma.job.delete({ where: { id } });
  },

  async changeStatus(userId: number, id: number, status: JobStatus) {
    await this.getById(userId, id);
    return prisma.job.update({ where: { id }, data: { status } });
  },
};