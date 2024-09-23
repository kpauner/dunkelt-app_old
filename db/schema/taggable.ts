import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import tags from "./tags";
import { relations } from "drizzle-orm";

// Polymorphic join table to link tags to various entities and columns
const taggable = sqliteTable("taggable", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  tagId: integer("tag_id")
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
  taggableId: integer("taggable_id").notNull(), // ID of the entity (e.g., bestiary, user)
  taggableType: text("taggable_type").notNull(), // Type of the entity (e.g., "bestiary", "user")
  taggableColumn: text("taggable_column").notNull(), // Column name (e.g., "origins", "types")
});

export const taggableRelations = relations(taggable, ({ many }) => ({
  tags: many(tags),
}));

export default taggable;
