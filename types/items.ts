import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type SelectItems = InferSelectModel<typeof items>;

// export const insertItemsSchema = createInsertSchema(items);
const TypeEnum = z.enum(["Weapon", "Armor", "Consumable", "Artifact", "Other"]);
export const insertItemsSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  type: TypeEnum,
  tags: z.array(z.string()),
});
