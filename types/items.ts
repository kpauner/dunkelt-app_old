import { characterItems, items } from "@/db/schema";
import { client } from "@/lib/hono";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { InferResponseType } from "hono";
import { z } from "zod";

const TypeEnum = z.enum(["weapon", "armor", "consumable", "artifact", "other"]);

export const InsertItemsSchema = createInsertSchema(items, {
  origins: z.array(z.string()),
  tags: z.array(z.string()),
  type: TypeEnum,
});
export const SelectItemsSchema = createSelectSchema(items, {
  origins: z.array(z.string()),
  tags: z.array(z.string()),
  type: TypeEnum,
});
export const CharacterItemSchema = SelectItemsSchema.extend({
  quantity: z.number(),
});
export const SelectCharacterItemsSchema = createSelectSchema(characterItems);

export type SelectItems = z.infer<typeof CharacterItemSchema>;
export type SelectCharacterItems = z.infer<typeof SelectCharacterItemsSchema>;
export type InsertItems = z.infer<typeof InsertItemsSchema>;
export type ItemType = z.infer<typeof TypeEnum>;

// API RESPONSE TYPES
export type SelectItemsResponseType = InferResponseType<
  (typeof client.api.items)["$get"],
  200
>["data"];
export type SelectItemResponseType = InferResponseType<
  (typeof client.api.items)[":id"]["$get"],
  200
>["data"];
