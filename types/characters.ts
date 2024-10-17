import {
  characterImprovements,
  characterItems,
  characterMoves,
  characters,
} from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export type ImprovementType =
  | "charm"
  | "cool"
  | "sharp"
  | "tough"
  | "weird"
  | "move"
  | "improvement"
  | "advanced_improvement";
// SELECT SCHEMAS
export const SelectCharacterSchema = createSelectSchema(characters);
export const SelectcharacterImprovementsSchema = createSelectSchema(
  characterImprovements
);
// INSERT SCHEMAS
export const InsertCharacterSchema = createInsertSchema(characters);

export type SelectCharacter = InferSelectModel<typeof characters>;
export type SelectcharacterImprovements = InferSelectModel<
  typeof characterImprovements
>;

export type CharacterResponseType = InferResponseType<
  typeof client.api.characters.$get,
  200
>["data"][0];
