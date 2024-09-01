import { generatePublicId } from "@/lib/utils";
import { Powers } from "@/types/bestiary";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";

/* Create the monster: name, description, type & motivation,
then define its powers, weaknesses, attacks, armour, harm
capacity, optionally custom moves.
*/

const bestiary = sqliteTable("bestiary", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  motivation: text("motivation").notNull(),
  powers: text("powers", { mode: "json" }).$type<Powers>().notNull(),
  weaknesses: text("weaknesses").notNull(), // Store as JSON string
  attacks: text("attacks").notNull(), // Store as JSON string
  armor: integer("armor").notNull(),
  harmCapacity: integer("harm_capacity").notNull(),
  customMoves: text("custom_moves").notNull(), // Store as JSON string
  habitat: text("habitat"),
  signs: text("signs").notNull(), // Store as JSON string
  history: text("history"),
  countermeasures: text("countermeasures").notNull(), // Store as JSON string
});

export default bestiary;
