import { z } from "zod";

export const AppointmentSchema = z.object({
  reason: z.string().optional(),
  diagnosis: z.string().optional(),
  doctorName: z.string().optional(),
  appointmentDate: z.coerce.date(),
  notes: z.string().optional(),
});
