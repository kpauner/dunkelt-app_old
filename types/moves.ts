import { characterMoves, moves } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type SelectMoves = InferSelectModel<typeof moves>;
export type SelectCharacterMoves = InferSelectModel<typeof characterMoves>;
