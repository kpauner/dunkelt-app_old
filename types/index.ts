import { IMAGES } from "@/constants/constants";
import { z } from "zod";

export type EntityType =
  | "bestiary"
  | "bystander"
  | "minion"
  | "character"
  | "location"
  | "item";

export const SignUpSchema = z
  .object({
    username: z.string().min(2).max(50),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  username: z.string().min(2).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

// CODEX

export type Category = {
  key: string;
  label: string;
  description: string;
  href: string;
  image: keyof typeof IMAGES;
};
