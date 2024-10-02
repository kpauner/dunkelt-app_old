import { db } from "@/db";
import data from "@/db/seeds/data/bestiary.json";
import bestiary from "@/db/schema/bestiary";
import { Attack, Powers, SelectBestiary } from "@/types/bestiary";

type BestiaryEntry = {
  id?: number;
  name: string;
  type: string;
  description: string;
  harmCapacity: number;
  armor: number;
  powers: Powers[]; // Ensure powers is of type Powers[]
  weakness: string[]; // Ensure weakness is of type string[]
  signs: string[]; // Ensure signs is of type string[]
  origins: string[]; // Ensure origins is of type string[]
  image?: string | null;
  userId?: string | null;
  isPublic?: boolean;
};

export default async function seed(db: db) {
  const formattedData: BestiaryEntry[] = data.map((beast, index) => ({
    id: index + 1,
    name: beast.name,
    avatar: beast.avatar || null,
    type: beast.type,
    description: beast.description,
    harmCapacity: beast.harmCapacity,
    armor: beast.armor,
    powers: beast.powers as Powers[], // Ensure powers is of type Powers[]
    weakness: beast.weakness as string[], // Ensure weakness is of type string[]
    signs: beast.signs as string[], // Ensure signs is of type string[]
    origins: beast.origins as string[], // Ensure origins is of type string[]
    userId: "35e5d1bf-75a3-4b0f-aef1-f47d875d0b4e",
    isPublic: true,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(bestiary).values(formattedData);
}
