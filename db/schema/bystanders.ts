import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import bystanderMoves from "./bystanderMoves";

/* Create the monster: name, description, type & motivation,
then define its powers, weakness, attacks, armour, harm
capacity, optionally custom moves.
*/

const bystanders = sqliteTable("bystanders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  avatar: text("avatar"),
  description: text("description").notNull(),
  type: text("type").default("busybody").notNull(),
  look: text("look").notNull(),
  harmCapacity: integer("harm_capacity").notNull().default(7),
  armor: integer("armor").notNull().default(0),
  dateOfBirth: text("dateOfBirth").default("unknown"),
  dateOfDeath: text("dateOfDeath").default("unknown"),
  origins: text("origins", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default(["unknown"]),
  history: text("history"),
  homebrew: integer("homebrew", { mode: "boolean" }).default(true).notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export const bystandersRelations = relations(bystanders, ({ many }) => ({
  bystanderMoves: many(bystanderMoves),
}));

export default bystanders;
