import { db } from "@/db";
import data from "@/db/seeds/data/items.json";
import { InsertItems, ItemType } from "@/types/items";
import { items } from "../schema";

export default async function seed(db: db) {
  const formattedData: InsertItems[] = data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    description: item.description,
    type: item.type as ItemType,
    harm: item.harm,
    armor: item.armor,
    value: item.value,
    tags: item.tags,
    history: item.history,
    origins: item.origins,
    homebrew: item.homebrew,
    userId: item.userId,
    isPublic: item.isPublic,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(items).values(formattedData);
}
