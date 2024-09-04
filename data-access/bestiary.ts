import "server-only";

import { and, eq } from "drizzle-orm";
import { db } from "../db";

import { bestiary, tags, tagToEntities } from "@/db/schema";

export async function getBestiaryById(bestiaryId: number) {
  if (!bestiaryId) {
    throw new Error("No bestiary id provided");
  }
  return db.select().from(bestiary).where(eq(bestiary.id, bestiaryId));
}

export async function getBestiaries() {
  return db.select().from(bestiary);
}

export async function getTagsForBestiary(bestiaryId: number) {
  return db
    .select({
      tagName: tags.name,
    })
    .from(tagToEntities)
    .innerJoin(tags, eq(tags.id, tagToEntities.tagId))
    .where(
      and(
        eq(tagToEntities.entityId, bestiaryId),
        eq(tagToEntities.entityType, "bestiary")
      )
    );
}
