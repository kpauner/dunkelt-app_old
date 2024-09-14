import { characterMoves, characterRatings, characters } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { SelectMoves } from "./moves";

type PlaybookType =
  | "The Chosen"
  | "The Crooked"
  | "The Divine"
  | "The Expert"
  | "The Flake"
  | "The Initiate"
  | "The Monstrous"
  | "The Mundane"
  | "The Professional"
  | "The Spell-Slinger"
  | "The Wronged"
  | "Unknown";

interface Improvement {
  description: string;
  applied: boolean;
}

export type SelectCharacter = InferSelectModel<typeof characters>;
export type SelectCharacterRatings = InferSelectModel<typeof characterRatings>;
export type SelectCharacterMoves = InferSelectModel<typeof characterMoves>;

export type CharacterSheetType = SelectCharacter & {
  characterMoves: SelectMoves[];
  characterRatings: SelectCharacterRatings[];
};
