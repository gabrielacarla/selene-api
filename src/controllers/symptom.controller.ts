import { Request, Response } from "express";
import { SymptomService } from "../services/symptom.service";

const symptomService = new SymptomService();

export class SymptomController {
  async create(req: Request, res: Response) {
    const {
      cycleId,
      name,
      intensity,
      notes,
    } = req.body;

    const symptom = await symptomService.createSymptom(
      cycleId,
      name,
      intensity,
      notes
    );

    return res.status(201).json(symptom);
  }

  async findAll(req: Request, res: Response) {
    const symptoms = await symptomService.getSymptoms();

    return res.json(symptoms);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const symptom = await symptomService.getSymptomById(Number(id));

    return res.json(symptom);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const {
      name,
      intensity,
      notes,
    } = req.body;

    const symptom = await symptomService.updateSymptom(
      Number(id),
      name,
      intensity,
      notes
    );

    return res.json(symptom);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await symptomService.deleteSymptom(Number(id));

    return res.status(204).send();
  }
}