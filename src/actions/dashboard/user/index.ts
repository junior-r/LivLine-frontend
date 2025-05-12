import { apiWithCredentials } from "@/actions/api";
import type { UserCreateSchema } from "@/schemas/dashboard/user";
import axios from "axios";
import type { z } from "zod";

export const getAll = async (params?: { page: number; search: string }) => {
  const url = new URL(
    apiWithCredentials.defaults.baseURL?.toString() + "/users" || ""
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  try {
    const res = await apiWithCredentials.get(url.toString());
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_CANCELED") {
        console.warn("Request canceled");
      }
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const createUser = async (data: z.infer<typeof UserCreateSchema>) => {
  try {
    const res = await apiWithCredentials.post(`/dashboard/users`, data, {});
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getUser = async (userPk: string) => {
  try {
    const res = await apiWithCredentials.get(`/dashboard/users/${userPk}`, {});
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};
