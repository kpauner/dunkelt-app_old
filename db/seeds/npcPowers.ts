import { db } from "@/db";
import data from "@/db/seeds/data/npcPowers.json";
import { npcPowers } from "../schema";

export default async function seed(db: db) {
  const formattedData: any[] = data.map((power, index) => ({
    id: power.id,
    npcId: power.npcId,
    powerId: power.powerId,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(npcPowers).values(formattedData);
}
