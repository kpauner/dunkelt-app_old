import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users, mysteries, characters } from "@/db/schema";

export const mysteryParticipants = sqliteTable('mystery_participants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mysteryId: integer('mystery_id').references(() => mysteries.id),
  userId: integer('user_id').references(() => users.id),
  characterId: integer('character_id').references(() => characters.id),
  joinedAt: integer("joined_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  },
);

export const mysteryParticipantsRelations = relations(
  mysteryParticipants,
  ({ one }) => ({
