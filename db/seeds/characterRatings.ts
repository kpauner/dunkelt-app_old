import { db } from "@/db";
import data from "@/db/seeds/data/characterRatings.json";
import { characterRatings } from "../schema";
import { SelectCharacterRatings } from "@/types/characters";

export default async function seed(db: db) {
  const formattedData: SelectCharacterRatings[] = data.map((rating, index) => ({
    id: index + 1,
    characterId: rating.characterId,
    ratingType: rating.ratingType,
    value: rating.value,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(characterRatings).values(formattedData);
}
