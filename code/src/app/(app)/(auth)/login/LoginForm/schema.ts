import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Min 8 chars"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
