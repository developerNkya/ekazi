import { api } from "./client";
import type { Job, JobStatus, EmploymentType } from "../types";

export const jobsApi = {
  list: async (params?: { status?: JobStatus; search?: string }) => {
    const res = await api.get<Job[]>("/jobs", { params });
    return res.data;
  },
  get: async (id: number) => {
    const res = await api.get<Job>(`/jobs/${id}`);
    return res.data;
  },
  create: async (data: {
    title: string;
    description: string;
    location: string;
    employmentType: EmploymentType;
    status?: JobStatus;
  }) => {
    const res = await api.post<Job>("/jobs", data);
    return res.data;
  },
  update: async (id: number, data: Partial<Job>) => {
    const res = await api.patch<Job>(`/jobs/${id}`, data);
    return res.data;
  },
  changeStatus: async (id: number, status: JobStatus) => {
    const res = await api.patch<Job>(`/jobs/${id}/status`, { status });
    return res.data;
  },
  remove: async (id: number) => {
    await api.delete(`/jobs/${id}`);
  },
};