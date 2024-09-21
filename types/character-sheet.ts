import { z } from "zod";
import { SelectMovesSchema } from "./moves";
import { SelectItemsSchema } from "./items";
import {
  SelectCharacterAttributesSchema,
  SelectCharacterSchema,
} from "./characters";

export const SelectCharacterSheetSchema = SelectCharacterSchema.extend({
  characterAttributes: z.array(SelectCharacterAttributesSchema).optional(),
  characterItems: z.array(SelectItemsSchema).optional(),
  characterMoves: z.array(SelectMovesSchema).optional(),
});

export type SelectCharacterSheet = z.infer<typeof SelectCharacterSheetSchema>;
