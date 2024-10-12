import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import characters from "./characters";
import { relations } from "drizzle-orm";

const characterAttributes = sqliteTable("character_attributes", {
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
      "playbook_move",
      "ally",
      "luck",
      "hunter_type",
      "additional_hunter",
      "advanced_move",
      "retire",
    ],
  }),
  value: text("value").notNull(),
  level: integer("level").notNull().default(0),
  description: text("description").notNull().default(""),
});

export const characterAttributesRelations = relations(
  characterAttributes,
  ({ one }) => ({
    character: one(characters, {
      fields: [characterAttributes.characterId],
      references: [characters.id],
    }),
  })
);

export default characterAttributes;
