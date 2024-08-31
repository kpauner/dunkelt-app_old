import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const bestiary = sqliteTable("bestiary", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  type: text("type").notNull(),
  motivation: text("motivation").notNull(),
  powers: text("powers").notNull(), // Store as JSON string
  weaknesses: text("weaknesses").notNull(), // Store as JSON string
  attacks: text("attacks").notNull(), // Store as JSON string
  armor: integer("armor").notNull(),
  harmCapacity: integer("harm_capacity").notNull(),
  customMoves: text("custom_moves").notNull(), // Store as JSON string
  description: text("description").notNull(),
  habitat: text("habitat"),
  signs: text("signs").notNull(), // Store as JSON string
  history: text("history"),
  countermeasures: text("countermeasures").notNull(), // Store as JSON string
});

export const bestiaryTags = sqliteTable(
  "bestiary_tags",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    bestiaryId: text("bestiary_id")
      .notNull()
      .references(() => bestiary.id, { onDelete: "cascade" }),
    tag: text("tag").notNull(),
  },
  (table) => ({
    uniqueTag: primaryKey({ columns: [table.bestiaryId, table.tag] }),
  })
);
