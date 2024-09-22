import { bestiary, bestiaryMoves } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const SelectBestiarySchema = createSelectSchema(bestiary);
export const SelectBestiaryMovesSchema = createSelectSchema(bestiaryMoves);
export const InsertBestiarySchema = createInsertSchema(bestiary);
export const InsertBestiaryMovesSchema = createInsertSchema(bestiaryMoves);

export type Powers = {
  name: string;
  description: string;
};

export type Attack = {
  name: string;
  harm: number;
  tags: string[];
};

export type SelectBestiary = z.infer<typeof SelectBestiarySchema>;
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
