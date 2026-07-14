import { Request, Response } from "express";

export class HealthController {
  index(req: Request, res: Response) {
    return res.json({
      status: "ok",
      message: "Selene API is running ⏾",
    });
  }
}