import { apiWithCredentials } from "@/actions/api";
import { ChronicConditionSchema } from "@/schemas/dashboard/medicalData/chronicCondition";
import axios from "axios";
import type { z } from "zod";

export const createChronicCondition = async (
  patientDataPk: string,
  data: z.infer<typeof ChronicConditionSchema>
) => {
  try {
    const res = await apiWithCredentials.post(
      `/dashboard/chronicConditions/${patientDataPk}`,
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
