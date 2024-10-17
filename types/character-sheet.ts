import { z } from "zod";
import { SelectMovesSchema } from "./moves";
import { CharacterItemSchema } from "./items";
import {
  SelectcharacterImprovementsSchema,
  SelectCharacterSchema,
} from "./characters";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";

export const SelectCharacterSheetSchema = SelectCharacterSchema.extend({
  characterImprovements: z.array(SelectcharacterImprovementsSchema).optional(),
  characterItems: z.array(CharacterItemSchema).optional(),
  characterMoves: z.array(SelectMovesSchema).optional(),
});

export type SelectCharacterSheet = z.infer<typeof SelectCharacterSheetSchema>;

// API RESPONSE TYPES
export type GetCharacterSheetResponseType = InferResponseType<
  (typeof client.api.characters)[":id"]["$get"],
  200
>["data"];
