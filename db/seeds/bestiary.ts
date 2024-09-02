import { db } from "@/db";
import data from "@/db/seeds/data/bestiary.json";
import bestiary from "../schema/bestiary";
import { BestiaryEntry } from "@/types/bestiary";

export default async function seed(db: db) {
  const formattedData: BestiaryEntry[] = data.map((beast) => ({
    name: beast.name,
    type: beast.type,
    motivation: beast.motivation,
    powers: beast.powers,
    weaknesses: beast.weaknesses,
    attacks: beast.attacks,
    armor: beast.armor,
    harmCapacity: beast.harmCapacity,
    customMoves: beast.customMoves,
    description: beast.description,
    habitat: beast.habitat,
    signs: beast.signs,
    history: beast.history,
    countermeasures: beast.countermeasures,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(bestiary).values(formattedData);
}
