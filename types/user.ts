import { users } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export type SelectUser = InferSelectModel<typeof users>;
export const insertUserSchema = createInsertSchema(users, {
  name: z.string().min(1, "Name is required"),
  email: z.string().email().min(1, "Email is required"),
});

export type UserFormValues = {
  [K in keyof z.infer<typeof insertUserSchema>]:
    | z.infer<typeof insertUserSchema>[K]
    | string;
};
