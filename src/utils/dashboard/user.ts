import {
  UserUpdateSchema,
  type UserUpdateFormValues,
} from "@/schemas/dashboard/user/index";
import type { UserUpdateType } from "@/types/dashboard/user";

export function validateUserUpdateData(
  data: UserUpdateType
): UserUpdateFormValues {
  return UserUpdateSchema.parse({
    ...data,
    idDocType: data.idDocType ?? undefined,
    idNumber: data.idNumber ?? undefined,
  });
}
