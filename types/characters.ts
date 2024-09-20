import {
  characterAttributes,
  characterItems,
  characterMoves,
  characters,
} from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { SelectMoves } from "./moves";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const InsertCharacterSchema = createInsertSchema(characters, {
  id: z.number().int().positive(),
  name: z.string().min(1),
  userId: z.string(),
});
export const InsertCharacterAttributesSchema =
  createInsertSchema(characterAttributes);
export const InsertCharacterItemsSchema = createInsertSchema(characterItems);
export const InsertCharacterMovesSchema = createInsertSchema(characterMoves);

export const CharacterSchema = InsertCharacterSchema.extend({
  // Add any additional fields not in the database schema
});

// Define the full character response schema
export const InsertCharacterSheetSchema = InsertCharacterSchema.extend({
  characterAttributes: z.array(InsertCharacterAttributesSchema).optional(),
  characterItems: z.array(InsertCharacterItemsSchema).optional(),
  characterMoves: z.array(InsertCharacterMovesSchema).optional(),
});

export type SelectCharacter = InferSelectModel<typeof characters>;
export type SelectCharacterAttributes = InferSelectModel<
  typeof characterAttributes
>;
export type SelectCharacterMoves = InferSelectModel<typeof characterMoves>;
export type SelectCharacterItems = InferSelectModel<typeof characterItems>;

export type CharacterSheetType = SelectCharacter & {
  characterMoves: SelectMoves[];
  characterItems: SelectCharacterItems[];
  characterAttributes: SelectCharacterAttributes[];
};

export type CharacterResponseType = InferResponseType<
  typeof client.api.characters.$get,
  200
>["data"][0];
