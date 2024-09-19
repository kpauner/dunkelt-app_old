import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import characters from "./characters";
import moves from "./moves";
import { relations } from "drizzle-orm";

const characterMoves = sqliteTable("character_moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  moveId: integer("move_id")
    .notNull()
    .references(() => moves.id),
});

export const characterMovesRelations = relations(characterMoves, ({ one }) => ({
  character: one(characters, {
    fields: [characterMoves.characterId],
    references: [characters.id],
  }),
  move: one(moves, {
    fields: [characterMoves.moveId],
    references: [moves.id],
  }),
}));

export default characterMoves;
