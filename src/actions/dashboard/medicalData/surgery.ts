import { apiWithCredentials } from "@/actions/api";
import type { SurgerySchema } from "@/schemas/dashboard/medicalData/surgery";
import axios from "axios";
import type { z } from "zod";

export const createSurgery = async (
  patientDataPk: string,
  data: z.infer<typeof SurgerySchema>
) => {
  try {
    const res = await apiWithCredentials.post(
      `/dashboard/surgeries/${patientDataPk}`,
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

export const destroy = async (pk: string) => {
  try {
    const res = await apiWithCredentials.delete(
      `/dashboard/surgeries/${pk}`,
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
