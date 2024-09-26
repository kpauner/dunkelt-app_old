import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import locationMoves from "./locationMoves";

const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type", { mode: "json" }).$type<string[]>(),
  origins: text("origins").notNull().default(""),
  history: text("history"),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  locationMoves: many(locationMoves),
}));

export default locations;
