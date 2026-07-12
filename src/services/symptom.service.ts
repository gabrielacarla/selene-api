import { prisma } from "../lib/prisma";

export class SymptomService {
  async createSymptom(
    cycleId: number,
    name: string,
    intensity?: number,
    notes?: string
  ) {
    return await prisma.symptom.create({
      data: {
        cycleId,
        name,
        intensity,
        notes,
      },
    });
  }

  async getSymptoms() {
    return await prisma.symptom.findMany();
  }

 async getSymptomById(id: number) {
  const symptom = await prisma.symptom.findUnique({
    where: {
      id,
    },
  });

  if (!symptom) {
    throw new Error("Symptom not found");
  }

  return symptom;
}

  async updateSymptom(
    id: number,
    name: string,
    intensity?: number,
    notes?: string
  ) {
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

  async deleteSymptom(id: number) {
    return await prisma.symptom.delete({
      where: {
        id,
      },
    });
  }
}