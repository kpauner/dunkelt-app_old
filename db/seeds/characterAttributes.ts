import { db } from "@/db";
import data from "@/db/seeds/data/characterAttributes.json";
import { SelectCharacterAttributes } from "@/types/characters";
import { characterAttributes } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectCharacterAttributes[] = data.map(
    (rating, index) => ({
      id: index + 1,
      characterId: rating.characterId,
      attributeType: rating.attributeType,
      value: rating.value,
      isInitial: rating.isInitial,
      level: rating.level,
      description: rating.description,
      isSelected: rating.isSelected,
    })
  );
  if (!formattedData) {
    return;
  }
  await db.insert(characterAttributes).values(formattedData);
}
