import { characterMoves, moves } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const SelectMovesSchema = createSelectSchema(moves);
export type SelectMoves = InferSelectModel<typeof moves>;
export type SelectCharacterMoves = InferSelectModel<typeof characterMoves>;

type MoveOutcome = {
  description: string;
  effects?: string[];
};

export type MoveResults = {
  success: MoveOutcome;
  partialSuccess: MoveOutcome;
  miss: MoveOutcome;
};
