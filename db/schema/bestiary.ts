import { generatePublicId } from "@/lib/utils";
import { Attack, Powers } from "@/types/bestiary";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import bestiaryMoves from "./bestiaryMoves";

/* Create the monster: name, description, type & motivation,
then define its powers, weakness, attacks, armour, harm
capacity, optionally custom moves.
*/

const bestiary = sqliteTable("bestiary", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  image: text("image"),
  type: text("type").notNull(),
  description: text("description").notNull(),
  powers: text("powers", { mode: "json" }).$type<Powers[]>().notNull(),
  weakness: text("weakness", { mode: "json" }).$type<string[]>().notNull(),
  armor: integer("armor").notNull().default(0),
  harmCapacity: integer("harm_capacity").notNull().default(1),
  origins: text("origins", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default(["unknown"]),
  signs: text("signs", { mode: "json" }).$type<string[]>().notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export const bestiaryRelations = relations(bestiary, ({ many }) => ({
  bestiaryMoves: many(bestiaryMoves),
}));

export default bestiary;
