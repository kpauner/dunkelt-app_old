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
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// SELECT SCHEMAS
export const SelectCharacterSchema = createSelectSchema(characters);
export const SelectCharacterAttributesSchema =
  createSelectSchema(characterAttributes);

// INSERT SCHEMAS

export const InsertCharacterSchema = createInsertSchema(characters);
export const InsertCharacterAttributesSchema =
  createInsertSchema(characterAttributes);
export const InsertCharacterItemsSchema = createInsertSchema(characterItems);
export const InsertCharacterMovesSchema = createInsertSchema(characterMoves);

export type SelectCharacter = InferSelectModel<typeof characters>;
export type SelectCharacterAttributes = InferSelectModel<
  typeof characterAttributes
>;
export type SelectCharacterMoves = InferSelectModel<typeof characterMoves>;
export type SelectCharacterItems = InferSelectModel<typeof characterItems>;

export type CharacterResponseType = InferResponseType<
  typeof client.api.characters.$get,
  200
>["data"][0];
