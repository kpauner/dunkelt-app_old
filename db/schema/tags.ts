import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import taggable from "./taggable";
import { relations } from "drizzle-orm";

const tags = sqliteTable("tags", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  taggable: many(taggable),
}));

export default tags;
