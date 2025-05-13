import { z } from "zod";

export const ChronicConditionSchema = z.object({
  name: z.string().min(1, { message: "Este dato es requerido" }),
  diagnosisDate: z.coerce.date().optional(),
  notes: z.string().optional(),
});
