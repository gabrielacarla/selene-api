import { z } from "zod";

export const cycleSchema = z.object({
  startDate: z.coerce.date({
    error: "Start date is required",
  }),

  endDate: z.coerce.date().optional(),

  cycleLength: z
    .number()
    .int("Cycle length must be an integer")
    .positive("Cycle length must be greater than 0")
    .optional(),

  notes: z.string().optional(),
});

export const updateCycleSchema = cycleSchema.partial();