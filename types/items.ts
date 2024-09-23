import { characterItems, items } from "@/db/schema";
import { client } from "@/lib/hono";
import { createSelectSchema } from "drizzle-zod";
import { InferResponseType } from "hono";
import { z } from "zod";

export const SelectItemsSchema = createSelectSchema(items, {
  tags: z.array(z.string()),
});
export const CharacterItemSchema = SelectItemsSchema.extend({
  quantity: z.number(),
});
export const SelectCharacterItemsSchema = createSelectSchema(characterItems);

export type SelectItems = z.infer<typeof CharacterItemSchema>;
export type SelectCharacterItems = z.infer<typeof SelectCharacterItemsSchema>;
// export const insertItemsSchema = createInsertSchema(items);
const TypeEnum = z.enum(["Weapon", "Armor", "Consumable", "Artifact", "Other"]);
export const insertItemsSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  type: TypeEnum,
  tags: z.array(z.string()),
});

// API RESPONSE TYPES
export type GetItemsResponseType = InferResponseType<
  (typeof client.api.items)["$get"],
  200
>["data"];
