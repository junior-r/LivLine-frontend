import { apiWithCredentials } from "@/actions/api";
import type { AllergySchema } from "@/schemas/dashboard/medicalData/allergy";
import axios from "axios";
import type { z } from "zod";

export const createAllergy = async (
  patientDataPk: string,
  data: z.infer<typeof AllergySchema>
) => {
  try {
    const res = await apiWithCredentials.post(
      `/dashboard/allergies/${patientDataPk}`,
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
