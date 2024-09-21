import { z } from "zod";
import { SelectMovesSchema } from "./moves";
import { CharacterItemSchema } from "./items";
import {
  SelectCharacterAttributesSchema,
  SelectCharacterSchema,
} from "./characters";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";

export const SelectCharacterSheetSchema = SelectCharacterSchema.extend({
  characterAttributes: z.array(SelectCharacterAttributesSchema).optional(),
  characterItems: z.array(CharacterItemSchema).optional(),
  characterMoves: z.array(SelectMovesSchema).optional(),
});

export type SelectCharacterSheet = z.infer<typeof SelectCharacterSheetSchema>;

// API RESPONSE TYPES
export type GetCharacterSheetResponseType = InferResponseType<
  (typeof client.api.characters)[":id"]["$get"], 200
>["data"];