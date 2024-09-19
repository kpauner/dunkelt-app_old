import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import bestiary from "./bestiary";
import moves from "./moves";
import { relations } from "drizzle-orm";

const bestiaryMoves = sqliteTable("bestiary_moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  bestiaryId: integer("bestiary_id")
    .notNull()
    .references(() => bestiary.id),
  moveId: integer("move_id")
    .notNull()
    .references(() => moves.id),
});

export const bestiaryMovesRelations = relations(bestiaryMoves, ({ one }) => ({
  bestiary: one(bestiary, {
    fields: [bestiaryMoves.bestiaryId],
    references: [bestiary.id],
  }),
  move: one(moves, {
    fields: [bestiaryMoves.moveId],
    references: [moves.id],
  }),
}));

export default bestiaryMoves;
