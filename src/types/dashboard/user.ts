import type {
  UserCreateSchema,
  UserUpdateSchema,
} from "@/schemas/dashboard/user";
import { z } from "zod";

export type UserCreateType = z.infer<typeof UserCreateSchema>;

export interface UserData extends UserCreateType {
  pk: string;
  createdAt: string;
  updatedAt: string;
}

export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
