import { characterMoves, moves, npcPowers, powers } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export type SelectPowers = InferSelectModel<typeof powers>;
export type SelectNpcPowers = InferSelectModel<typeof npcPowers>;
