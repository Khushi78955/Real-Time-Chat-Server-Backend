import { z } from "zod";



export const registerSchema = z.object({
  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),

  displayName: z
    .string()
    .trim()
    .min(3, "Display name must be at least 3 characters")
    .max(50),
});



export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});