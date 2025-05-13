import { apiWithCredentials } from "@/actions/api";
import { AppointmentSchema } from "@/schemas/dashboard/medicalData/appointment";
import axios from "axios";
import type { z } from "zod";

export const createAppointment = async (
  patientDataPk: string,
  data: z.infer<typeof AppointmentSchema>
) => {
  try {
    const res = await apiWithCredentials.post(
      `/dashboard/appointments/${patientDataPk}`,
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
      `/dashboard/appointments/${pk}`,
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
