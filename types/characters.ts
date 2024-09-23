import {
  characterAttributes,
  characterItems,
  characterMoves,
  characters,
} from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// SELECT SCHEMAS
export const SelectCharacterSchema = createSelectSchema(characters);
export const SelectCharacterAttributesSchema =
  createSelectSchema(characterAttributes);

// INSERT SCHEMAS
export const InsertCharacterSchema = createInsertSchema(characters);

export type SelectCharacter = InferSelectModel<typeof characters>;
export type SelectCharacterAttributes = InferSelectModel<
  typeof characterAttributes
>;

export type CharacterResponseType = InferResponseType<
  typeof client.api.characters.$get,
  200
>["data"][0];
