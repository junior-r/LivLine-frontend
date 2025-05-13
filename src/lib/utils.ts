import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const togglePasswordVisibility = ({
  checked,
  inputIds,
}: {
  checked: string | boolean;
  inputIds: string[];
}) => {
  inputIds.forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.setAttribute("type", checked ? "text" : "password");
    }
  });
};

export const getLocalDateTime = (
  datetime: string,
  locales: string[],
  onlyDate: boolean = false
) => {
  const date = new Date(datetime);
  const dateFormatPptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const localDate = date.toLocaleDateString(locales, dateFormatPptions);
  const localTime = date.toLocaleTimeString(locales, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (onlyDate) return localDate;
  return localDate + " " + localTime;
};

export const truncateText = (text: string | undefined, num: number) => {
  if (!text) return "";
  if (text.length > num) return text.slice(0, num) + "...";
  return text;
};

export const capitalizeWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getEnumValue = <T extends Record<string, string>>(
  enumObj: T,
  key: keyof T | string
): string | undefined => {
  return enumObj[key as keyof T];
};

export const zEnumFromObject = <T extends Record<string, string>>(obj: T) => {
  return z.enum(
    Object.keys(obj) as [keyof T & string, ...(keyof T & string)[]]
  );
};
