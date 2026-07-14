import { prisma } from "../lib/prisma";

export class SymptomService {
  async createSymptom(
    cycleId: number,
    userId: number,
    name: string,
    intensity?: number,
    notes?: string
  ) {
    const cycle = await prisma.cycle.findFirst({
      where: {
        id: cycleId,
        userId,
      },
    });

    if (!cycle) {
      throw new Error("Cycle not found");
    }

    return await prisma.symptom.create({
      data: {
        cycleId,
        name,
        intensity,
        notes,
      },
    });
  }

  async getSymptoms(userId: number) {
    return await prisma.symptom.findMany({
      where: {
        cycle: {
          userId,
        },
      },
    });
  }

  async getSymptomById(id: number, userId: number) {
    const symptom = await prisma.symptom.findFirst({
      where: {
        id,
        cycle: {
          userId,
        },
      },
    });

    if (!symptom) {
      throw new Error("Symptom not found");
    }

    return symptom;
  }

  async updateSymptom(
    id: number,
    userId: number,
    data: {
      name?: string;
      intensity?: number;
      notes?: string;
    }
  ) {
    const symptom = await prisma.symptom.findFirst({
      where: {
        id,
        cycle: {
          userId,
        },
      },
    });

    if (!symptom) {
      throw new Error("Symptom not found");
    }

    return await prisma.symptom.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteSymptom(id: number, userId: number) {
    const symptom = await prisma.symptom.findFirst({
      where: {
        id,
        cycle: {
          userId,
        },
      },
    });

    if (!symptom) {
      throw new Error("Symptom not found");
    }

    return await prisma.symptom.delete({
      where: {
        id,
      },
    });
  }
}