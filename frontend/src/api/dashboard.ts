import { api } from "./client";
import type { DashboardStats } from "../types";

export const dashboardApi = {
  stats: async () => {
    const res = await api.get<DashboardStats>("/dashboard/stats");
    return res.data;
  },
};