import { Request, Response } from "express";
import { CycleService } from "../services/cycle.service";

const cycleService = new CycleService();

export class CycleController {
  async create(req: Request, res: Response) {
    const {
      userId,
      startDate,
      endDate,
      cycleLength,
      notes,
    } = req.body;

    const cycle = await cycleService.createCycle(
      userId,
      new Date(startDate),
      endDate ? new Date(endDate) : undefined,
      cycleLength,
      notes
    );

    return res.status(201).json(cycle);
  }

  async findAll(req: Request, res: Response) {
    const cycles = await cycleService.getCycles();

    return res.json(cycles);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const cycle = await cycleService.getCycleById(Number(id));

    return res.json(cycle);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const {
      startDate,
      endDate,
      cycleLength,
      notes,
    } = req.body;

    const cycle = await cycleService.updateCycle(
      Number(id),
      new Date(startDate),
      endDate ? new Date(endDate) : undefined,
      cycleLength,
      notes
    );

    return res.json(cycle);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await cycleService.deleteCycle(Number(id));

    return res.status(204).send();
  }
}