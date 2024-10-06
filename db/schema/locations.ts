import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import locationMoves from "./locationMoves";
import { users } from "./users";

const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  avatar: text("avatar").default(""),
  description: text("description").notNull(),
  type: text("type").default("unknown").notNull(),
  history: text("history").default(""),
  origins: text("origins", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default(["unknown"]),
  homebrew: integer("homebrew", { mode: "boolean" }).default(true).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  locationMoves: many(locationMoves),
}));

export default locations;
