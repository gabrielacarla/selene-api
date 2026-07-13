import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { SymptomService } from "../services/symptom.service";
import { symptomSchema } from "../validations/symptom.validation";

const symptomService = new SymptomService();

export class SymptomController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { cycleId, name, intensity, notes } =
        symptomSchema.parse(req.body);

      const symptom = await symptomService.createSymptom(
        cycleId,
        name,
        intensity,
        notes
      );

      return res.status(201).json(symptom);
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

      const symptoms = await symptomService.getSymptoms(userId);

      return res.json(symptoms);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const symptom = await symptomService.getSymptomById(
        Number(id),
        userId
      );

      return res.json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const { cycleId, name, intensity, notes } =
        symptomSchema.parse(req.body);

      const symptom = await symptomService.updateSymptom(
        Number(id),
        userId,
        name,
        intensity,
        notes
      );

      return res.json(symptom);
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

      await symptomService.deleteSymptom(
        Number(id),
        userId
      );

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}