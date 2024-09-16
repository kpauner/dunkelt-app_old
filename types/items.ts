import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export type SelectItems = InferSelectModel<typeof items>;

export const insertItemsSchema = createInsertSchema(items);
