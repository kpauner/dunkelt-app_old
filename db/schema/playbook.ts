import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import characters from "./characters";
import { relations } from "drizzle-orm";

const playbookSections = sqliteTable("playbook_sections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id),
  sectionName: text("section_name").notNull(),
  content: text("content", { mode: "json" }).notNull(), // Stores JSON content
});

export const playbookRelations = relations(playbookSections, ({ one }) => ({
  character: one(characters, {
    fields: [playbookSections.characterId],
    references: [characters.id],
  }),
}));

export default playbookSections;
