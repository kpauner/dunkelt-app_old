import { db } from "@/db";
import data from "@/db/seeds/data/characterMoves.json";
import { SelectCharacterMoves } from "@/types/moves";
import { characterMoves } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectCharacterMoves[] = data.map((move, index) => ({
    id: index + 1,
    characterId: move.characterId,
    moveId: move.moveId,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(characterMoves).values(formattedData);
}
