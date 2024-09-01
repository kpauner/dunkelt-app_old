import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import tags from "./tags";

const tagToEntity = sqliteTable(
  "tag_to_entity",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
    entityId: integer("entity_id").notNull(),
    entityType: text("entity_type").notNull(),
  },
  (table) => ({
    uniqueTagEntity: primaryKey({
      columns: [table.tagId, table.entityId, table.entityType],
    }),
  })
);

export default tagToEntity;
