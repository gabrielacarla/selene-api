import { Request, Response } from "express";
import { SymptomService } from "../services/symptom.service";

const symptomService = new SymptomService();

export class SymptomController {
  async create(req: Request, res: Response) {
    const { cycleId, name, intensity, notes } = req.body;

    const symptom = await symptomService.createSymptom(
      cycleId,
      name,
      intensity,
      notes
    );

    return res.status(201).json(symptom);
  }

  async findAll(req: Request, res: Response) {
    const userId = req.user!.userId;

    const symptoms = await symptomService.getSymptoms(userId);

    return res.json(symptoms);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.userId;

    const symptom = await symptomService.getSymptomById(
      Number(id),
      userId
    );

    return res.json(symptom);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.userId;

    const { name, intensity, notes } = req.body;

    const symptom = await symptomService.updateSymptom(
      Number(id),
      userId,
      name,
      intensity,
      notes
    );

    return res.json(symptom);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.userId;

    await symptomService.deleteSymptom(
      Number(id),
      userId
    );

    return res.status(204).send();
  }
}