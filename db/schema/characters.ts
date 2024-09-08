import { generatePublicId } from "@/lib/utils";
import { Attack, Powers } from "@/types/bestiary";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { Move, Ratings } from "@/types/characters";

/* Create the monster: name, description, type & motivation,
then define its powers, weaknesses, attacks, armour, harm
capacity, optionally custom moves.
*/

const characters = sqliteTable("characters", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  playbook: text("playbook").notNull(),
  look: text("look").notNull(),
  appearance: text("appearance").notNull(),
  clothing: text("clothing").default("casual wear").notNull(),
  ratings: text("ratings", { mode: "json" }).$type<Ratings>().notNull(),
  moves: text("moves", { mode: "json" }).$type<Move[]>().notNull(),
  history: text("history", { mode: "json" }).$type<string[]>(),
  luck: integer("luck", { mode: "number" }).default(0).notNull(),
  harm: integer("harm", { mode: "number" }).default(0).notNull(),
  experience: integer("experience", { mode: "number" }).default(0).notNull(),
  improvements: text("improvements", { mode: "json" }),
  advancedImprovements: text("advanced_improvements", { mode: "json" }),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
  fate: text("fate"),
  heroic: text("heroic", { mode: "json" }).$type<[string, string]>(),
  doom: text("doom", { mode: "json" }).$type<[string, string]>(),
});

export default characters;
