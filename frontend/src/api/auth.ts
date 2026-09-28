import { api, tokenStore } from "./client";
import type { User } from "../types";

export interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  async register(data: { name: string; email: string; password: string }) {
    const res = await api.post<AuthResponse>("/auth/register", data);
    tokenStore.set(res.data.token);
    return res.data;
  },
  async login(data: { email: string; password: string }) {
    const res = await api.post<AuthResponse>("/auth/login", data);
    tokenStore.set(res.data.token);
    return res.data;
  },
  async me() {
    const res = await api.get<User>("/auth/me");
    return res.data;
  },
  logout() {
    tokenStore.clear();
  },
};