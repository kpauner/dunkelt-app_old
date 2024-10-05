import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import npcPowers from "./npcPowers";

const powers = sqliteTable("powers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const powersRelations = relations(powers, ({ many }) => ({
  npcPowers: many(npcPowers),
}));

export default powers;
