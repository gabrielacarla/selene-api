import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AuthService } from "../services/auth.service";
import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = registerSchema.parse(req.body);

      const user = await authService.register(
        name,
        email,
        password
      );

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map(issue => issue.message),
        });
      }

      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const token = await authService.login(
        email,
        password
      );

      return res.json(token);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map(issue => issue.message),
        });
      }

      next(error);
    }
  }
}