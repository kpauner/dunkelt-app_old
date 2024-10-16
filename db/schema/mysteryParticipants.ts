import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users, mysteries, characters } from "@/db/schema";

const mysteryParticipants = sqliteTable("mystery_participants", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mysteryId: text("mystery_id").references(() => mysteries.id),
  userId: text("user_id").references(() => users.id),
  characterId: integer("character_id").references(() => characters.id),
  joinedAt: integer("joined_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  invitedEmail: text("invited_email"), // Add this field
  inviteStatus: text("invite_status").default("pending"),
});

export const mysteryParticipantsRelations = relations(
  mysteryParticipants,
  ({ one }) => ({
    // Relation to the mystery
    mystery: one(mysteries, {
      fields: [mysteryParticipants.mysteryId],
      references: [mysteries.id],
    }),
    // Relation to the user
    user: one(users, {
      fields: [mysteryParticipants.userId],
      references: [users.id],
    }),
    // Relation to the character
    character: one(characters, {
      fields: [mysteryParticipants.characterId],
      references: [characters.id],
    }),
  })
);

export default mysteryParticipants;
