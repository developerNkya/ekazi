import { Request, Response } from "express";
import { z } from "zod";
import { authService } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data);
    res.status(201).json(result);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    res.json(result);
  }),

  me: asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.me(req.user!.userId);
    res.json(user);
  }),
};