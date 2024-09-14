import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import characters from "./characters";
import { relations } from "drizzle-orm";

const characterRatings = sqliteTable(
  "character_ratings",
  {
    characterId: integer("character_id")
      .notNull()
      .references(() => characters.id, { onDelete: "cascade" }),
    ratingType: text("rating_type").notNull(),
    value: integer("value").notNull(),
  },
  (table) => ({
    unq: primaryKey({ columns: [table.characterId, table.ratingType] }),
  })
);

export const characterRatingsRelations = relations(
  characterRatings,
  ({ one }) => ({
    character: one(characters, {
      fields: [characterRatings.characterId],
      references: [characters.id],
    }),
  })
);

export default characterRatings;
