import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import moves from "./moves";
import { relations } from "drizzle-orm";
import npcs from "./npcs";

const npcMoves = sqliteTable("npc_moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  npcId: integer("npc_id")
    .notNull()
    .references(() => npcs.id, { onDelete: "cascade" }),
  moveId: integer("move_id")
    .notNull()
    .references(() => moves.id),
});

export const npcMovesRelations = relations(npcMoves, ({ one }) => ({
  npc: one(npcs, {
    fields: [npcMoves.npcId],
    references: [npcs.id],
  }),
  move: one(moves, {
    fields: [npcMoves.moveId],
    references: [moves.id],
  }),
}));

export default npcMoves;
