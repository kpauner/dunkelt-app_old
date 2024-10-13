import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "@/db/schema";
import { generatePublicId } from "@/lib/utils";
import { mysteryParticipants } from "./mysteryParticipants";

// Mysteries table
const mysteries = sqliteTable("mysteries", {
  id: text("id").primaryKey().default(generatePublicId()),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  year: integer("year"), // Can be positive (CE) or negative (BCE)
  yearEra: text("year_era").notNull().default("CE"), // 'CE' or 'BCE'
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});

export const mysteriesRelations = relations(mysteries, ({ one, many }) => ({
  user: one(users, {
    fields: [mysteries.userId],
    references: [users.id],
  }),
  mysteryParticipants: many(mysteryParticipants),
}));

export default mysteries;
