import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import characters from "./characters";
import { relations } from "drizzle-orm";

const characterImprovements = sqliteTable("character_improvements", {
  id: integer("id").primaryKey(),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  type: text("type", {
    enum: [
      "charm",
      "cool",
      "sharp",
      "tough",
      "weird",
      "move",
      "improvement",
      "advanced_improvement",
    ],
  }),
  name: text("name").notNull(),
  value: text("value").notNull(),
});

export const characterImprovementsRelations = relations(
  characterImprovements,
  ({ one }) => ({
    character: one(characters, {
      fields: [characterImprovements.characterId],
      references: [characters.id],
    }),
  })
);

export default characterImprovements;
