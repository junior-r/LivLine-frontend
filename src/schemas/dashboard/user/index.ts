import { z } from "zod";

export const UserRole = {
  admin: "Admin",
  doctor: "Doctor",
  patient: "Paciente",
} as const;

export const UserIdType = {
  IdenityCard: "Tarjeta de identidad",
  DNI: "Cédula de ciudadanía",
} as const;

function zEnumFromObject<T extends Record<string, string>>(obj: T) {
  return z.enum(
    Object.keys(obj) as [keyof T & string, ...(keyof T & string)[]]
  );
}

export const UserCreateSchema = z.object({
  name: z.string().min(3, { message: "Este dato es requerido" }),
  lastName: z.string().min(3, { message: "Este dato es requerido" }),
  email: z.string().email(),
  role: zEnumFromObject(UserRole),
  idDocType: zEnumFromObject(UserIdType),
  idNumber: z.string().min(3, { message: "Este dato es requerido" }),
});
