import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const tags = sqliteTable("tags", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export default tags;
