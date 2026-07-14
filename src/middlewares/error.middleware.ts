import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../utils/AppError";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      return res.status(400).json({
        message: "Related record not found",
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Record not found",
      });
    }
  }

  return res.status(500).json({
    message: "Internal server error",
  });
}