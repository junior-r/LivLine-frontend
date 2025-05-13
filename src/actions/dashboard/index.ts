import axios from "axios";
import { apiWithCredentials } from "../api";

export const getTotalUsers = async () => {
  try {
    const res = await apiWithCredentials.get(`/dashboard/stats/total-users/`);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getTotalActiveUsers = async () => {
  try {
    const res = await apiWithCredentials.get(
      `/dashboard/stats/total-active-users/`
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getUserGrowth = async () => {
  try {
    const res = await apiWithCredentials.get(`/dashboard/stats/user-growth/`);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getUserSexDist = async () => {
  try {
    const res = await apiWithCredentials.get(
      `/dashboard/stats/sex-distribution/`
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getTotalPatientsWithAllergies = async () => {
  try {
    const res = await apiWithCredentials.get(
      `/dashboard/stats/patients-with-allergies/`
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getBloodTypeDist = async () => {
  try {
    const res = await apiWithCredentials.get(
      `/dashboard/stats/blood-type-distribution/`
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getMostCommonChConditions = async () => {
  try {
    const res = await apiWithCredentials.get(
      `/dashboard/stats/most-common-chronic-conditions/`
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const getMostAdministeredVaccines = async () => {
  try {
    const res = await apiWithCredentials.get(
      `/dashboard/stats/most-administered-vaccines/`
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || { error: "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};
