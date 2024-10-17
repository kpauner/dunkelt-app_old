import { db } from "@/db";
import data from "@/db/seeds/data/characterImprovements.json";
import { SelectcharacterImprovements } from "@/types/characters";
import { characterImprovements } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectcharacterImprovements[] = data.map(
    (attribute, index) => ({
      id: attribute.id,
      name: attribute.name,
      characterId: attribute.characterId,
      type: attribute.type as any,
      value: attribute.value,
    })
  );
  if (!formattedData) {
    return;
  }
  await db.insert(characterImprovements).values(formattedData);
}
