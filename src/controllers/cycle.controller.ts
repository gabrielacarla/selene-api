import { Request, Response } from "express";
import { CycleService } from "../services/cycle.service";

const cycleService = new CycleService();

export class CycleController {
  async create(req: Request, res: Response) {
    const { startDate, endDate, cycleLength, notes } = req.body;

    const userId = req.user!.userId;

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
    const userId = req.user!.userId;

    const cycles = await cycleService.getCycles(userId);

    return res.json(cycles);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.userId;

    const cycle = await cycleService.getCycleById(
      Number(id),
      userId
    );

    return res.json(cycle);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.userId;

    const { startDate, endDate, cycleLength, notes } = req.body;

    const cycle = await cycleService.updateCycle(
      Number(id),
      userId,
      new Date(startDate),
      endDate ? new Date(endDate) : undefined,
      cycleLength,
      notes
    );

    return res.json(cycle);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.userId;

    await cycleService.deleteCycle(
      Number(id),
      userId
    );

    return res.status(204).send();
  }
}