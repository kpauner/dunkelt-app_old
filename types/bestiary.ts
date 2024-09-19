import { bestiary, bestiaryMoves } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Powers = {
  name: string;
  description: string;
};

export type Attack = {
  name: string;
  harm: number;
  tags: string[];
};

export type SelectBestiary = InferSelectModel<typeof bestiary>;
export type SelectBestiaryMoves = InferSelectModel<typeof bestiaryMoves>;

export type BestiaryEntry = {
  name: string;
  type: string;
  description: string;
  motivation: string;
  powers: Powers[];
  weaknesses: string[];
  attacks: Attack[];
  armor: number;
  harmCapacity: number;
  history: string;
  habitat: string;
  signs: string[];
  customMoves: Powers[];
  countermeasures: string[];
};
