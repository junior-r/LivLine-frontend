import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(2, { message: "Nombre es requerido" }).max(20),
  lastName: z.string().min(2, { message: "Apellido es requerido" }).max(20),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, {
        message: "La contrseña debe tener al menos 6 caracteres de largo",
      }),
    password: z
      .string()
      .min(6, {
        message: "La contrseña debe tener al menos 6 caracteres de largo",
      }),
    passwordConfirm: z
      .string()
      .min(6, {
        message: "La contrseña debe tener al menos 6 caracteres de largo",
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  })
  .refine((data) => data.currentPassword !== data.password, {
    message: "La nueva contraseña no puede ser igual que la anterior",
    path: ["password"],
  });
