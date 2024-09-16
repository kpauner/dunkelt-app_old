import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import characterItems from "./characterItems";
import { relations } from "drizzle-orm";

const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  harm: integer("harm").default(0),
  armor: integer("armor").default(0),
  value: integer("value"),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
  homebrew: integer("homebrew", { mode: "boolean" }).default(true).notNull(),
  userId: text("userId").references(() => users.id),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export const itemsRelations = relations(items, ({ many }) => ({
  characterItems: many(characterItems),
}));

export default items;
