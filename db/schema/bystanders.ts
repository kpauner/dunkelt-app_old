import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";

/* Create the monster: name, description, type & motivation,
then define its powers, weakness, attacks, armour, harm
capacity, optionally custom moves.
*/

const bystanders = sqliteTable("bystanders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").default("new bystander").notNull(),
  avatar: text("avatar"),
  type: text("type").default("busybody").notNull(),
  description: text("description"),
  look: text("look"),
  harmCapacity: integer("harm_capacity").notNull().default(7),
  dateOfBirth: text("dob").default("unknown"),
  dateOfDeath: text("dod").default("unknown"),
  origins: text("origins"),
  homebrew: integer("homebrew", { mode: "boolean" }).default(true).notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isPublic: integer("is_public", { mode: "boolean" }).default(false).notNull(),
});

export default bystanders;
