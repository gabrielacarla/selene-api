import { z } from "zod";

export const symptomSchema = z.object({
  cycleId: z
    .number()
    .int("Cycle ID must be an integer")
    .positive("Cycle ID must be greater than 0"),

  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  intensity: z
    .number()
    .int("Intensity must be an integer")
    .min(1, "Intensity must be between 1 and 10")
    .max(10, "Intensity must be between 1 and 10")
    .optional(),

  notes: z.string().optional(),
});


export const updateSymptomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .optional(),

  intensity: z
    .number()
    .int("Intensity must be an integer")
    .min(1, "Intensity must be between 1 and 10")
    .max(10, "Intensity must be between 1 and 10")
    .optional(),

  notes: z.string().optional(),
});