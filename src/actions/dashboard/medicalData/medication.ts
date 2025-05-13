import { apiWithCredentials } from "@/actions/api";
import { MedicationSchema } from "@/schemas/dashboard/medicalData/medication";
import axios from "axios";
import type { z } from "zod";

export const createMedication = async (
  patientDataPk: string,
  data: z.infer<typeof MedicationSchema>
) => {
  try {
    const res = await apiWithCredentials.post(
      `/dashboard/medications/${patientDataPk}`,
      data,
      {}
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};
