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

  async getCycles() {
    return await prisma.cycle.findMany();
  }

 async getCycleById(id: number) {
  const cycle = await prisma.cycle.findUnique({
    where: {
      id,
    },
  });

  if (!cycle) {
    throw new Error("Cycle not found");
  }

  return cycle;
}

  async updateCycle(
    id: number,
    startDate: Date,
    endDate?: Date,
    cycleLength?: number,
    notes?: string
  ) {
    return await prisma.cycle.update({
      where: {
        id,
      },
      data: {
        startDate,
        endDate,
        cycleLength,
        notes,
      },
    });
  }

  async deleteCycle(id: number) {
    return await prisma.cycle.delete({
      where: {
        id,
      },
    });
  }
}