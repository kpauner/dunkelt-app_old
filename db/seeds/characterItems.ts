import { db } from "@/db";
import data from "@/db/seeds/data/characterItems.json";
import { characterItems } from "../schema";
import { SelectCharacterItems } from "@/types/characters";

export default async function seed(db: db) {
  const formattedData: SelectCharacterItems[] = data.map((item, index) => ({
    id: index + 1,
    characterId: item.characterId,
    itemId: item.itemId,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(characterItems).values(formattedData);
}
