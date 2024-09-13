import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  value: integer("value"),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
  weight: integer("weight").default(1),
  rarity: text("rarity").default("common"),
  notes: text("notes"),
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
