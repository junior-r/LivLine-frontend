import type { UserCreateSchema } from "@/schemas/dashboard/user";
import { z } from "zod";

type BaseUserData = z.infer<typeof UserCreateSchema>;

export interface UserData extends BaseUserData {
  pk: string;
  createdAt: string;
  updatedAt: string;
}
