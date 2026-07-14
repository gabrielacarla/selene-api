import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export class SymptomService {
  async createSymptom(
    cycleId: number,
    name: string,
    intensity?: number,
    notes?: string
  ) {
    try {
      return await prisma.symptom.create({
        data: {
          cycleId,
          name,
          intensity,
          notes,
        },
      });
    } catch (error) {
      console.error("CREATE SYMPTOM ERROR:", error);
      throw error;
    }
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
      throw new AppError("Symptom not found", 404);
    }

    return symptom;
  }

  async updateSymptom(
    id: number,
    userId: number,
    name: string,
    intensity?: number,
    notes?: string
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
      throw new AppError("Symptom not found", 404);
    }

    return await prisma.symptom.update({
      where: {
        id,
      },
      data: {
        name,
        intensity,
        notes,
      },
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
      throw new AppError("Symptom not found", 404);
    }

    return await prisma.symptom.delete({
      where: {
        id,
      },
    });
  }
}