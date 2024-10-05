import { db } from "@/db";
import data from "@/db/seeds/data/npcMoves.json";
import { npcMoves } from "../schema";

export default async function seed(db: db) {
  const formattedData: any[] = data.map((move, index) => ({
    id: index + 1,
    npcId: move.npcId,
    moveId: move.moveId,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(npcMoves).values(formattedData);
}
