import { db } from "@/db";
import data from "@/db/seeds/data/characters.json";
import { SelectCharacter } from "@/types/characters";
import { characters } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectCharacter[] = data.map((character, index) => ({
    id: index + 1,
    name: character.name,
    pronouns: character.pronouns,
    avatar: character.avatar,
    userId: character.userId,
    playbook: character.playbook,
    charm: character.charm || 0,
    cool: character.cool || 0,
    sharp: character.sharp || 0,
    tough: character.tough || 0,
    weird: character.weird || 0,
    look: character.look,
    luck: character.luck,
    harm: character.harm,
    dateOfBirth: character.dateOfBirth,
    dateOfDeath: character.dateOfDeath || "unknown",
    experience: character.experience,
    isPublic: false,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(characters).values(formattedData);
}
