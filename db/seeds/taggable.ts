import { db } from "@/db";
import data from "@/db/seeds/data/taggable.json";
import { taggable } from "@/db/schema";
import { SelectTaggable } from "@/types/tags";

export default async function seed(db: db) {
  const formattedData: SelectTaggable[] = data.map((item, index) => ({
    id: index + 1,
    tagId: item.tagId,
    taggableId: item.taggableId,
    taggableType: item.taggableType,
    taggableColumn: item.taggableColumn,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(taggable).values(formattedData);
}
