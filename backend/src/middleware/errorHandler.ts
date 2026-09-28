import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
    });
  }
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") return res.status(409).json({ message: "Resource already exists" });
    if (err.code === "P2025") return res.status(404).json({ message: "Resource not found" });
  }
  console.error("[UnhandledError]", err);
  res.status(500).json({ message: "Internal server error" });
};