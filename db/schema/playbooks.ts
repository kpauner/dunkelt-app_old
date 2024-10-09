import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { characters } from "@/db/schema";

const playbooks = sqliteTable("playbooks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").default("The Chosen").notNull(),
  customFields: text("custom_fields", { mode: "json" }),
  homebrew: integer("homebrew", { mode: "boolean" }).default(true).notNull(),
  characterId: integer("character_id")
    .references(() => characters.id, { onDelete: "cascade" })
    .notNull(),
});

export const playbooksRelations = relations(playbooks, ({ many }) => ({
  characters: many(characters),
}));

export default playbooks;
