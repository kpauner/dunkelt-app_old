import { db } from "@/db";
import data from "@/db/seeds/data/mysteries.json";
import { mysteries } from "@/db/schema";
// import { SelectMysteries } from "@/types/mysteries";

export default async function seed(db: db) {
  const formattedData: any[] = data.map((mystery, index) => ({
    name: mystery.name,
    description: mystery.description,
    year: mystery.year,
    yearEra: mystery.yearEra,
    userId: mystery.userId,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(mysteries).values(formattedData);
}
