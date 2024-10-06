import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import npcMoves from "./npcMoves";
import npcPowers from "./npcPowers";
import { EntityType } from "@/types";
import { Weakness } from "@/types/npcs";

/* Create the monster: name, description, type & motivation,
then define its powers, weakness, attacks, armour, harm
capacity, optionally custom moves.
*/

const npcs = sqliteTable("npcs", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  avatar: text("avatar").default(""),
  look: text("look").notNull(),
  type: text("type").$type<EntityType>().notNull(),
  motivation: text("motivation").notNull(),
  description: text("description").notNull(),
  weakness: text("weakness", { mode: "json" }).$type<Weakness[]>(),
  armor: integer("armor").notNull().default(0),
  harmCapacity: integer("harm_capacity").notNull().default(7),
  history: text("history"),
  origins: text("origins", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default(["unknown"]),
  homebrew: integer("homebrew", { mode: "boolean" }).default(true).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export const npcsRelations = relations(npcs, ({ many }) => ({
  npcMoves: many(npcMoves),
  npcPowers: many(npcPowers),
}));

export default npcs;
