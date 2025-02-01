import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(4, "Name is required"),
  email: z.string().email("Invalid email type"),
  universityId: z.coerce.number(),
  password: z.string().min(8, "Password must be at least of 8 charactors long"),
  universityCard: z.string().nonempty("University card is required"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email type"),
  password: z.string().min(8, "Password must be at least of 8 charactors long"),
});
