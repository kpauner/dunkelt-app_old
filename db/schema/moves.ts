import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import characterMoves from "./characterMoves";

const moves = sqliteTable("moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  playbook: text("playbook"),
});

export const movesRelations = relations(moves, ({ many }) => ({
  characterMoves: many(characterMoves),
}));

export default moves;
