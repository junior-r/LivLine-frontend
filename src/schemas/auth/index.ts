import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres de largo",
    }),
});

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2, { message: "Nombre es requerido" }).max(20),
  lastName: z.string().min(2, { message: "Apellido es requerido" }).max(20),
  passwordConfirm: z
    .string()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres de largo",
    }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Las contraseñas no coinciden",
  path: ["passwordConfirm"],
});

export const ResetPasswordSendEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres de largo",
      }),
    newPasswordConfirm: z
      .string()
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres de largo",
      }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["newPasswordConfirm"],
  });
