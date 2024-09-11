import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import characterMoves from "./characterMoves";
import { relations } from "drizzle-orm";

/* Create the monster: name, description, type & motivation,
then define its powers, weaknesses, attacks, armour, harm
capacity, optionally custom moves.
*/

const characters = sqliteTable("characters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").default("my character").notNull(),
  playbook: text("playbook").default("The Chosen").notNull(),
  pronouns: text("pronouns"),
  avatar: text("avatar"),
  look: text("look"),
  luck: integer("luck").notNull().default(0),
  harm: integer("harm").notNull().default(0),
  experience: integer("experience").notNull().default(0),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export const charactersRelations = relations(characters, ({ many }) => ({
  characterMoves: many(characterMoves),
}));

export default characters;
