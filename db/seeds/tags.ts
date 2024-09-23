import { db } from "@/db";
import data from "@/db/seeds/data/tags.json";
import { tags } from "../schema";
import { SelectTags } from "@/types/tags";

export default async function seed(db: db) {
  const formattedData: SelectTags[] = data.map((item, index) => ({
    id: index + 1,
    name: item.name,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(tags).values(formattedData);
}
