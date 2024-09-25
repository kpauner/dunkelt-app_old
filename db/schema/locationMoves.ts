import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import moves from "./moves";
import { relations } from "drizzle-orm";
import locations from "./locations";

const locationMoves = sqliteTable("location_moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id, { onDelete: "cascade" }),
  moveId: integer("move_id")
    .notNull()
    .references(() => moves.id),
});

export const locationMovesRelations = relations(locationMoves, ({ one }) => ({
  location: one(locations, {
    fields: [locationMoves.locationId],
    references: [locations.id],
  }),
  move: one(moves, {
    fields: [locationMoves.moveId],
    references: [moves.id],
  }),
}));

export default locationMoves;
