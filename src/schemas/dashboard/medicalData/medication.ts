import { z } from "zod";

export const MedicationSchema = z
  .object({
    name: z.string().min(1, { message: "Este dato es requerido" }),
    dosage: z.string().min(1, { message: "Este dato es requerido" }),
    frequency: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.endDate >= data.startDate,
    {
      path: ["endDate"],
      message: "La fecha de fin no puede ser anterior a la fecha de inicio",
    }
  );
