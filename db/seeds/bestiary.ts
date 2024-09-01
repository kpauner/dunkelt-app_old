import { db } from "@/db";
import data from "@/db/seeds/data/bestiary.json";
import bestiary from "../schema/bestiary";
import { BestiaryEntry } from "@/types/bestiary";

export default async function seed(db: db) {
  const bestiaryData: BestiaryEntry[] = data;
  // if (!bestiaryData) {
  //   console.error("No bestiary data found");
  //   return;
  // }
  // console.log(bestiaryData.map((entry) => entry.harm_capacity));
  await db.insert(bestiary).values(bestiaryData);
}
