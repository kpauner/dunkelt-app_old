import { items } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const SelectItemsSchema = createSelectSchema(items, {
  tags: z.array(z.string()),
});
export const CharacterItemSchema = SelectItemsSchema.extend({
  quantity: z.number(),
});

export type SelectItems = z.infer<typeof CharacterItemSchema>;

// export const insertItemsSchema = createInsertSchema(items);
const TypeEnum = z.enum(["Weapon", "Armor", "Consumable", "Artifact", "Other"]);
export const insertItemsSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  type: TypeEnum,
  tags: z.array(z.string()),
});
