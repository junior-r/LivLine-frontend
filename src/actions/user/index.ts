import axios from "axios";
import { apiWithOutCredentials } from "../api";

export const getUserByEmailOrPk = async (query: string) => {
  try {
    const res = await apiWithOutCredentials.get(
      `/users/get-user-by-email-or-pk/${query}`,
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
