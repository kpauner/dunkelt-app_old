import { db } from "@/db";
import data from "@/db/seeds/data/characterAttributes.json";
import { SelectCharacterAttributes } from "@/types/characters";
import { characterAttributes } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectCharacterAttributes[] = data.map(
    (rating, index) => ({
      id: rating.id,
      characterId: rating.characterId,
      type: rating.type as any,
      value: rating.value,
      level: rating.level,
      description: rating.description,
    })
  );
  if (!formattedData) {
    return;
  }
  await db.insert(characterAttributes).values(formattedData);
}
