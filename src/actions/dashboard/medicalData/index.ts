import { apiWithCredentials } from "@/actions/api";
import type { UserCreateMedicalDataSchema } from "@/schemas/dashboard/medicalData";
import axios from "axios";
import type { z } from "zod";

export const createUserMedicalData = async (
  userPk: string,
  data: z.infer<typeof UserCreateMedicalDataSchema>
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
