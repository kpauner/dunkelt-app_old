import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import characterMoves from "./characterMoves";
import { relations } from "drizzle-orm";
import characterItems from "./characterItems";
import characterImprovements from "./characterImprovements";

/* Create the monster: name, description, type & motivation,
then define its powers, weakness, attacks, armour, harm
capacity, optionally custom moves.
*/

const characters = sqliteTable("characters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").default("my character").notNull(),
  avatar: text("avatar").default(""),
  playbook: text("playbook").default("The Chosen").notNull(),
  pronouns: text("pronouns").default("").notNull(),
  look: text("look").default(""),
  luck: integer("luck").notNull().default(0),
  harm: integer("harm").notNull().default(0),
  experience: integer("experience").notNull().default(0),
  charm: integer("charm").notNull().default(0),
  cool: integer("cool").notNull().default(0),
  sharp: integer("sharp").notNull().default(0),
  tough: integer("tough").notNull().default(0),
  weird: integer("weird").notNull().default(0),
  dateOfBirth: text("date_of_birth").default("unknown"),
  dateOfDeath: text("date_of_death").default("unknown"),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export const charactersRelations = relations(characters, ({ many }) => ({
  characterMoves: many(characterMoves),
  characterImprovements: many(characterImprovements),
  characterItems: many(characterItems),
}));

export default characters;
