import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import characterMoves from "./characterMoves";
import { MoveResults } from "@/types/moves";

const moves = sqliteTable("moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  playbook: text("playbook"),
  harm: integer("harm").notNull().default(0),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
  results: text("results", { mode: "json" }).$type<MoveResults>(),
});

export const movesRelations = relations(moves, ({ many }) => ({
  characterMoves: many(characterMoves),
}));

export default moves;
