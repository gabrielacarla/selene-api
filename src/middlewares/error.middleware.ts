import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      return res.status(400).json({
        message: "Invalid relation data.",
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Record not found.",
      });
    }
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal server error.",
  });
}