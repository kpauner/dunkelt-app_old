import { characters } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Ratings = "Cool" | "Tough" | "Charm" | "Sharp" | "Weird";

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

export type Move = {
  name: string;
  description: string;
};

interface Improvement {
  description: string;
  applied: boolean;
}

export type SelectCharacter = InferSelectModel<typeof characters>;

export type CharacterSheetType = SelectCharacter & {
  characterMoves: Move[];
};
