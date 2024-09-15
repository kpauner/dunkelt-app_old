import { db } from "@/db";
import data from "@/db/seeds/data/items.json";
import { SelectItems } from "@/types/items";
import { items } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectItems[] = data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    description: item.description,
    type: item.type,
    harm: item.harm,
    armor: item.armor,
    value: item.value,
    tags: item.tags,
    homebrew: item.homebrew,
    userId: item.userId,
    isPublic: item.isPublic,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(items).values(formattedData);
}
