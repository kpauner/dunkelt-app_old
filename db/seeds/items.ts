import { db } from "@/db";
import data from "@/db/seeds/data/items.json";
import { SelectItems } from "@/types/items";
import { items } from "../schema/items";

export default async function seed(db: db) {
  const formattedData: SelectItems[] = data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    description: item.description,
    type: item.type,
    value: item.value,
    tags: item.tags,
    weight: item.weight,
    rarity: item.rarity,
    notes: item.notes,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(items).values(formattedData);
}
