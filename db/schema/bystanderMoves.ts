import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import moves from "./moves";
import { relations } from "drizzle-orm";
import bystanders from "./bystanders";

const bystanderMoves = sqliteTable("bystander_moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  bystanderId: integer("bystander_id")
    .notNull()
    .references(() => bystanders.id, { onDelete: "cascade" }),
  moveId: integer("move_id")
    .notNull()
    .references(() => moves.id),
});

export const bystanderMovesRelations = relations(bystanderMoves, ({ one }) => ({
  bystander: one(bystanders, {
    fields: [bystanderMoves.bystanderId],
    references: [bystanders.id],
  }),
  move: one(moves, {
    fields: [bystanderMoves.moveId],
    references: [moves.id],
  }),
}));

export default bystanderMoves;
