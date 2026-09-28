import { api } from "./client";
import type { Application, ApplicationStatus } from "../types";

export const applicationsApi = {
  listByJob: async (jobId: number, status?: ApplicationStatus) => {
    const res = await api.get<Application[]>(`/jobs/${jobId}/applications`, {
      params: status ? { status } : {},
    });
    return res.data;
  },
  get: async (id: number) => {
    const res = await api.get<Application>(`/applications/${id}`);
    return res.data;
  },
  updateStatus: async (id: number, status: ApplicationStatus) => {
    const res = await api.patch<Application>(`/applications/${id}/status`, { status });
    return res.data;
  },
};