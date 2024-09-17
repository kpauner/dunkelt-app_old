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
