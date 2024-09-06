import { db } from "@/db";
import data from "@/db/seeds/data/bestiary.json";
import bestiary from "../schema/bestiary";
import { BestiaryEntry, SelectBestiary } from "@/types/bestiary";

export default async function seed(db: db) {
  const formattedData: SelectBestiary[] = data.map((beast, index) => ({
    id: index + 1,
    name: beast.name,
    type: beast.type,
    description: beast.description,
    image: beast.image || null,
    userId: beast.userId,
    powers: beast.powers,
    weaknesses: beast.weaknesses,
    attacks: beast.attacks,
    armor: beast.armor,
    harmCapacity: beast.harmCapacity,
    customMoves: beast.customMoves,
    origins: beast.origins,
    signs: beast.signs,
    countermeasures: beast.countermeasures,
    isPublic: true,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(bestiary).values(formattedData);
}
