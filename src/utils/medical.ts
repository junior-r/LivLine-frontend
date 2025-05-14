import {
  MedicalDataSchema,
  type MedicalDataFormValues,
} from "@/schemas/dashboard/medicalData";
import type { MedicalData } from "@/types/dashboard/medicalData";

export const formatDateForInput = (isoString: string) => {
  const date = new Date(isoString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
};

export function validateMedicalData(data: MedicalData): MedicalDataFormValues {
  return MedicalDataSchema.parse({
    ...data,
    dateOfBirth: formatDateForInput(data.dateOfBirth),
  });
}
