import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import npcs from "./npcs";
import powers from "./powers";

const npcPowers = sqliteTable("npc_powers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  npcId: integer("npc_id")
    .notNull()
    .references(() => npcs.id, { onDelete: "cascade" }),
  powerId: integer("power_id")
    .notNull()
    .references(() => powers.id),
});

export const npcPowersRelations = relations(npcPowers, ({ one }) => ({
  npc: one(npcs, {
    fields: [npcPowers.npcId],
    references: [npcs.id],
  }),
  power: one(powers, {
    fields: [npcPowers.powerId],
    references: [powers.id],
  }),
}));

export default npcPowers;
