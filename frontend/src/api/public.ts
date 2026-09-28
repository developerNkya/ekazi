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

export const publicJobsApi = {
  getJob: async (id: number): Promise<PublicJob> => {
    const res = await publicApi.get<PublicJob>(`/public/jobs/${id}`);
    return res.data;
  },
  apply: async (id: number, data: ApplicationSubmission): Promise<SubmittedApplication> => {
    const res = await publicApi.post<SubmittedApplication>(`/public/jobs/${id}/applications`, data);
    return res.data;
  },
};