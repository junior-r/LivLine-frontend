import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres de largo",
  }),
});

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2, { message: "Nombre es requerido" }).max(20),
  lastName: z.string().min(2, { message: "Apellido es requerido" }).max(20),
  passwordConfirm: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres de largo",
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Las contraseñas no coinciden",
  path: ["passwordConfirm"],
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
});

export const ResetPasswordValidateSchema = z.object({
  code: z
    .string()
    .min(12, { message: "El código de seguridad es requerido" })
    .max(12),
});

export const ResetPasswordConfirmSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres de largo",
    }),
    newPasswordConfirm: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres de largo",
    }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["newPasswordConfirm"],
  });
