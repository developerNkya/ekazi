import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { env } from "../../config/env";
import { ApiError } from "../../utils/ApiError";

export const authService = {
  async register(data: { name: string; email: string; password: string }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ApiError(409, "Email already registered");
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { name: data.name, email: data.email, password: hashed },
    });
    const token = signToken(user.id, user.email);
    return { token, user: sanitize(user) };
  },

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new ApiError(401, "Invalid credentials");
    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) throw new ApiError(401, "Invalid credentials");
    const token = signToken(user.id, user.email);
    return { token, user: sanitize(user) };
  },

  async me(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(404, "User not found");
    return sanitize(user);
  },
};

function signToken(userId: number, email: string) {
  return jwt.sign({ userId, email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });
}

function sanitize<T extends { password: string }>(user: T) {
  const { password, ...rest } = user;
  return rest;
}