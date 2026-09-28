import axios from "axios";
import type {
  PublicJob,
  ApplicationSubmission,
  SubmittedApplication,
} from "../types";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

export interface PublicStats {
  totalJobs: number;
  totalApplications: number;
  totalEmployers: number;
}

export const publicJobsApi = {
  listJobs: async (): Promise<PublicJob[]> => {
    const res = await publicApi.get<PublicJob[]>("/public/jobs");
    return res.data;
  },
  getJob: async (id: number): Promise<PublicJob> => {
    const res = await publicApi.get<PublicJob>(`/public/jobs/${id}`);
    return res.data;
  },
  apply: async (id: number, data: ApplicationSubmission): Promise<SubmittedApplication> => {
    const res = await publicApi.post<SubmittedApplication>(`/public/jobs/${id}/applications`, data);
    return res.data;
  },
  getStats: async (): Promise<PublicStats> => {
    const res = await publicApi.get<PublicStats>("/public/stats");
    return res.data;
  },
};

