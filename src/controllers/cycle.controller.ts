import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { CycleService } from "../services/cycle.service";
import {
  cycleSchema,
  updateCycleSchema,
} from "../validations/cycle.validation";

const cycleService = new CycleService();

export class CycleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, cycleLength, notes } =
        cycleSchema.parse(req.body);

      const userId = req.user!.userId;

      const cycle = await cycleService.createCycle(
        userId,
        startDate,
        endDate,
        cycleLength,
        notes
      );

      return res.status(201).json(cycle);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map((issue) => issue.message),
        });
      }

      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;

      const cycles = await cycleService.getCycles(userId);

      return res.json(cycles);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const cycle = await cycleService.getCycleById(
        Number(id),
        userId
      );

      return res.json(cycle);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const { startDate, endDate, cycleLength, notes } =
        updateCycleSchema.parse(req.body);

      const cycle = await cycleService.updateCycle(
        Number(id),
        userId,
        {
          startDate,
          endDate,
          cycleLength,
          notes,
        }
      );

      return res.json(cycle);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map((issue) => issue.message),
        });
      }

      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      await cycleService.deleteCycle(
        Number(id),
        userId
      );

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}