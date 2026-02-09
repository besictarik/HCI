import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Min 2 chars"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Min 8 chars"),
  terms: z.boolean().refine((value) => value, {
    message: "Accept terms",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
