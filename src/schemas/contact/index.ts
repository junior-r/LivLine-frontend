import { z } from "zod";

export const ContactSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Nombre completo es requerido" })
    .max(180),
  message: z.string().max(800).min(10, { message: "Mensaje es requerido" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  subject: z.string().min(5, { message: "Asunto es requerido" }).max(120),
});
