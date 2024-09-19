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
import characterAttributes from "./characterAttributes";

/* Create the monster: name, description, type & motivation,
then define its powers, weaknesses, attacks, armour, harm
capacity, optionally custom moves.
*/

const characters = sqliteTable("characters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").default("my character").notNull(),
  playbook: text("playbook").default("The Chosen").notNull(),
  pronouns: text("pronouns").default("").notNull(),
  avatar: text("avatar"),
  look: text("look"),
  luck: integer("luck").notNull().default(0),
  harm: integer("harm").notNull().default(0),
  experience: integer("experience").notNull().default(0),
  dob: text("dob").default("unknown"),
  height: integer("height").default(0),
  weight: integer("weight").default(0),
  eyes: text("eyes").default("unknown"),
  hair: text("hair").default("unknown"),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export const charactersRelations = relations(characters, ({ many }) => ({
  characterMoves: many(characterMoves),
  characterAttributes: many(characterAttributes),
  characterItems: many(characterItems),
}));

export default characters;
