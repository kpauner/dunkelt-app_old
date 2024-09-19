import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import characters from "./characters";
import { relations } from "drizzle-orm";
import items from "./items";

const characterItems = sqliteTable("character_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id),
});

export const characterItemsRelations = relations(characterItems, ({ one }) => ({
  character: one(characters, {
    fields: [characterItems.characterId],
    references: [characters.id],
  }),
  item: one(items, {
    fields: [characterItems.itemId],
    references: [items.id],
  }),
}));

export default characterItems;
