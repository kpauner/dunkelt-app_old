import { db } from "@/db";
import data from "@/db/seeds/data/bystanders.json";
import { SelectBystander } from "@/types/bystanders";
import { bystanders } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectBystander[] = data.map((character, index) => ({
    id: index + 1,
    name: character.name,
    avatar: character.avatar,
    type: character.type,
    description: character.description,
    look: character.look,
    harmCapacity: character.harmCapacity,
    dob: character.dob,
    height: character.height,
    weight: character.weight,
    eyes: character.eyes,
    hair: character.hair,
    homebrew: false,
    userId: "35e5d1bf-75a3-4b0f-aef1-f47d875d0b4e",
    isPublic: true,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(bystanders).values(formattedData);
}
