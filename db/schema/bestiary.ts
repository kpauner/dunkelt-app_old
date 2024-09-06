import { generatePublicId } from "@/lib/utils";
import { Attack, Powers } from "@/types/bestiary";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";

/* Create the monster: name, description, type & motivation,
then define its powers, weaknesses, attacks, armour, harm
capacity, optionally custom moves.
*/

const bestiary = sqliteTable("bestiary", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  image: text("image"),
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
  countermeasures: text("countermeasures", { mode: "json" })
    .$type<string[]>()
    .notNull(),
  userId: text("user_id").references(() => users.id),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export default bestiary;
