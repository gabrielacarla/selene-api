import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export class CycleService {
  async createCycle(
    userId: number,
    startDate: Date,
    endDate?: Date,
    cycleLength?: number,
    notes?: string
  ) {
    return await prisma.cycle.create({
      data: {
        userId,
        startDate,
        endDate,
        cycleLength,
        notes,
      },
    });
  }

  async getCycles(userId: number) {
    return await prisma.cycle.findMany({
      where: {
        userId,
      },
    });
  }

  async getCycleById(id: number, userId: number) {
    const cycle = await prisma.cycle.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!cycle) {
      throw new AppError("Cycle not found", 404);
    }

    return cycle;
  }

  async updateCycle(
    id: number,
    userId: number,
    data: {
      startDate?: Date;
      endDate?: Date;
      cycleLength?: number;
      notes?: string;
    }
  ) {
    const cycle = await prisma.cycle.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!cycle) {
      throw new AppError("Cycle not found", 404);
    }

    return await prisma.cycle.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteCycle(id: number, userId: number) {
    const cycle = await prisma.cycle.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!cycle) {
      throw new AppError("Cycle not found", 404);
    }

    return await prisma.cycle.delete({
      where: {
        id,
      },
    });
  }
}