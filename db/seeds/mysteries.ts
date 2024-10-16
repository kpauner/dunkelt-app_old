import { db } from "@/db";
import data from "@/db/seeds/data/mysteries.json";
import { mysteries } from "@/db/schema";
import { InsertMysteries, SelectMysteries } from "@/types/mysteries";
import { generatePublicId } from "@/lib/utils";

export default async function seed(db: db) {
  const formattedData: InsertMysteries[] = data.map((mystery) => ({
    id: generatePublicId(),
    name: mystery.name,
    description: mystery.description,
    imageUrl: mystery.imageUrl,
    year: mystery.year,
    era: mystery.era,
    userId: mystery.userId,
  }));

  await db.insert(mysteries).values(formattedData);
}
