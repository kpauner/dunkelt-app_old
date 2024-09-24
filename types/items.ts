import { characterItems, items } from "@/db/schema";
import { client } from "@/lib/hono";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { InferResponseType } from "hono";
import { z } from "zod";

const TypeEnum = z.enum(["Weapon", "Armor", "Consumable", "Artifact", "Other"]);

export const InsertItemsSchema = createInsertSchema(items, {
  tags: z.array(z.string()),
});
export const SelectItemsSchema = createSelectSchema(items, {
  tags: z.array(z.string()),
});
export const CharacterItemSchema = SelectItemsSchema.extend({
  quantity: z.number(),
});
export const SelectCharacterItemsSchema = createSelectSchema(characterItems);

export type SelectItems = z.infer<typeof CharacterItemSchema>;
export type SelectCharacterItems = z.infer<typeof SelectCharacterItemsSchema>;
export type InsertItems = z.infer<typeof InsertItemsSchema>;

// API RESPONSE TYPES
export type SelectItemsResponseType = InferResponseType<
  (typeof client.api.items)["$get"],
  200
>["data"];
export type SelectItemResponseType = InferResponseType<
  (typeof client.api.items)[":id"]["$get"],
  200
>["data"];
