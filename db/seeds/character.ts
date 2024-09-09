import { db } from "@/db";
import data from "@/db/seeds/data/characters.json";
import { SelectCharacter } from "@/types/characters";
import { characters } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectCharacter[] = data.map((character, index) => ({
    id: index + 1,
    name: character.name,
    userId: character.userId,
    playbook: character.playbook,
    look: character.look,
    luck: character.luck,
    harm: character.harm,
    experience: character.experience,
    isPublic: true,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(characters).values(formattedData);
}
