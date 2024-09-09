import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import characters from "./characters";

const characterRatings = sqliteTable(
  "character_ratings",
  {
    characterId: integer("character_id")
      .notNull()
      .references(() => characters.id),
    ratingType: text("rating_type").notNull(), // 'Cool', 'Tough', 'Charm', 'Sharp', 'Weird'
    value: integer("value").notNull(),
  },
  (table) => ({
    unq: primaryKey({ columns: [table.characterId, table.ratingType] }),
  })
);

export default characterRatings;
