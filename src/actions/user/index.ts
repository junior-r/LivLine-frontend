import axios from "axios";
import { apiWithCredentials, apiWithOutCredentials } from "../api";
import { z } from "zod";
import { ChangePasswordSchema, ProfileSchema } from "@/schemas/user";

export const updateUser = async (
  pk: string,
  data: z.infer<typeof ProfileSchema>
) => {
  try {
    const res = await apiWithCredentials.patch(`/users/${pk}`, data);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getUserByEmailOrPk = async (query: string) => {
  try {
    const res = await apiWithOutCredentials.post(
      `/users/get-user-by-email-or-pk/`,
      { query }
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const verifyUserId = async (pk: string, idNumber: string) => {
  try {
    const res = await apiWithOutCredentials.post(
      `/users/verify-user-id/${pk}`,
      { idNumber }
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const changePassword = async (
  pk: string,
  data: z.infer<typeof ChangePasswordSchema>
) => {
  try {
    const res = await apiWithCredentials.patch(
      `/users/change-password/${pk}`,
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
