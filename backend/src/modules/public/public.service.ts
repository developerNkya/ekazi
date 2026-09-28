import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { ApplicationStatus } from "@prisma/client";

export const publicService = {
  async listPublishedJobs() {
    return prisma.job.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        employmentType: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getPublishedJob(jobId: number) {
    const job = await prisma.job.findFirst({
      where: { id: jobId, status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        employmentType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!job) throw new ApiError(404, "This position is not available");
    return job;
  },

  async submitApplication(
    jobId: number,
    data: {
      candidateName: string;
      email: string;
      phone: string;
      coverLetter?: string;
      resumeUrl: string;
    }
  ) {
    const job = await prisma.job.findFirst({
      where: { id: jobId, status: "PUBLISHED" },
    });
    if (!job) throw new ApiError(404, "This position is not available");

    const existing = await prisma.application.findUnique({
      where: { jobId_email: { jobId, email: data.email } },
    });
    if (existing) {
      throw new ApiError(409, "You have already applied to this position");
    }

    return prisma.application.create({
      data: { jobId, ...data, status: ApplicationStatus.APPLIED },
      select: {
        id: true,
        candidateName: true,
        email: true,
        status: true,
        createdAt: true,
      },
    });
  },

  async getPublicStats() {
    const [totalJobs, totalApplications, totalEmployers] = await Promise.all([
      prisma.job.count({ where: { status: "PUBLISHED" } }),
      prisma.application.count(),
      prisma.user.count(),
    ]);
    return { totalJobs, totalApplications, totalEmployers };
  },
};