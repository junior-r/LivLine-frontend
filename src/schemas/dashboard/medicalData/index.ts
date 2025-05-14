import {
  UserBloodTypeOptions,
  UserSexOptions,
} from "@/types/dashboard/medicalData";
import { z } from "zod";

// Helper to create enum schemas (define once)
const createEnumSchema = <T extends Record<string, string>>(obj: T) => {
  const keys = Object.keys(obj);
  return z.enum(keys as [string, ...string[]]);
};

// ===== Core Schemas =====
export const SexSchema = createEnumSchema(UserSexOptions);
export const BloodTypeSchema = createEnumSchema(UserBloodTypeOptions);

// ===== Main Schema =====
export const MedicalDataSchema = z.object({
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .date(),
  sex: SexSchema,
  bloodType: BloodTypeSchema,
  country: z.string().min(3, "Este dato es requerido"),
  city: z.string().min(3, "Este dato es requerido"),
  phone: z.string().min(3, "Este dato es requerido"),
  address: z.string().min(3, "Este dato es requerido"),
  emergencyContactName: z.string().min(3, "Este dato es requerido"),
  emergencyContactPhone: z.string().min(3, "Este dato es requerido"),
});

export const MedicalDataUpdateSchema = MedicalDataSchema.partial();

export type MedicalDataFormValues = z.infer<typeof MedicalDataSchema>;
