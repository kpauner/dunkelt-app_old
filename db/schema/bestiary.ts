import { generatePublicId } from "@/lib/utils";
import { Attack, Powers } from "@/types/bestiary";
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
  type: text("type").notNull(),
  description: text("description").notNull(),
  powers: text("powers", { mode: "json" }).$type<Powers[]>().notNull(),
  weaknesses: text("weaknesses", { mode: "json" }).$type<string[]>().notNull(),
  attacks: text("attacks", { mode: "json" }).$type<Attack[]>().notNull(),
  armor: integer("armor").notNull(),
  harmCapacity: integer("harm_capacity").notNull(),
  customMoves: text("custom_moves", { mode: "json" })
    .$type<Powers[]>()
    .notNull(),
  origins: text("origins", { mode: "json" }).$type<string[]>().notNull(),
  signs: text("signs", { mode: "json" }).$type<string[]>().notNull(),
  history: text("history"),
  countermeasures: text("countermeasures", { mode: "json" })
    .$type<string[]>()
    .notNull(),
});

export default bestiary;
