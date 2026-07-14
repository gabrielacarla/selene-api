import { prisma } from "../lib/prisma";

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
      orderBy: {
        startDate: "desc",
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
      throw new Error("Cycle not found");
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
      throw new Error("Cycle not found");
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
      throw new Error("Cycle not found");
    }

    return await prisma.cycle.delete({
      where: {
        id,
      },
    });
  }
}