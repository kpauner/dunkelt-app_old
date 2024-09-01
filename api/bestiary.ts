import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { tagsToEntities, tags } from "../db/schema/tags";

export async function getTagsForBestiary(bestiaryId: string) {
  return db
    .select({
      tagName: tags.name,
    })
    .from(tagsToEntities)
    .innerJoin(tags, eq(tags.id, tagsToEntities.tagId))
    .where(
      and(
        eq(tagsToEntities.entityId, bestiaryId),
        eq(tagsToEntities.entityType, "bestiary")
      )
    );
}
