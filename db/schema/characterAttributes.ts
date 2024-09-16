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
  attributeType: text("attribute_type").notNull(), // e.g., "charm", "tough", "new_move", etc.
  value: text("value").notNull(), // Store as text to accommodate both numeric and text values
  isInitial: integer("is_public", { mode: "boolean" }).default(false).notNull(),
  level: integer("level").notNull().default(0), // 0 for initial attributes, 1+ for improvements
  description: text("description"),
  isSelected: integer("is_public", { mode: "boolean" })
    .default(false)
    .notNull(), // New field for checkbox state
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
