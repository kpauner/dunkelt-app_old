import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import locationMoves from "./locationMoves";

const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").default("unknown").notNull(),
  origins: text("origins").default("").notNull(),
  history: text("history").default("").notNull(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  locationMoves: many(locationMoves),
}));

export default locations;
