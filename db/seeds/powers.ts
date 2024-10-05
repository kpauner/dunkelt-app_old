import { db } from "@/db";
import data from "@/db/seeds/data/powers.json";
import { powers } from "../schema";
import { SelectPowers } from "@/types/powers";

export default async function seed(db: db) {
  const formattedData: SelectPowers[] = data.map((power, index) => ({
    id: power.id,
    name: power.name,
    description: power.description,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(powers).values(formattedData);
}
