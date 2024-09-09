import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import characters from "./characters";
import moves from "./moves";

const characterMoves = sqliteTable("character_moves", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id),
  moveId: integer("move_id")
    .notNull()
    .references(() => moves.id),
});

export default characterMoves;
