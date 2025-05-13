import { apiWithCredentials } from "@/actions/api";
import type { VaccineSchema } from "@/schemas/dashboard/medicalData/vaccine";
import axios from "axios";
import type { z } from "zod";

export const createVaccine = async (
  patientDataPk: string,
  data: z.infer<typeof VaccineSchema>
) => {
  try {
    const res = await apiWithCredentials.post(
      `/dashboard/vaccines/${patientDataPk}`,
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
      `/dashboard/vaccines/${pk}`,
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
