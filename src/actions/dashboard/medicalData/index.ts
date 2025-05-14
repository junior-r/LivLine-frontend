import { apiWithCredentials } from "@/actions/api";
import type {
  MedicalDataSchema,
  MedicalDataUpdateSchema,
} from "@/schemas/dashboard/medicalData";
import axios from "axios";
import type { z } from "zod";

export const createMedicalData = async (
  userPk: string,
  data: z.infer<typeof MedicalDataSchema>
) => {
  try {
    const res = await apiWithCredentials.post(
      `/dashboard/users/${userPk}`,
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

export const updateMedicalData = async (
  dataPk: string,
  data: z.infer<typeof MedicalDataUpdateSchema>
) => {
  try {
    const res = await apiWithCredentials.put(
      `/dashboard/users/${dataPk}`,
      data
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};
