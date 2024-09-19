import { db } from "@/db";
import data from "@/db/seeds/data/bestiaryMoves.json";
import { bestiaryMoves } from "../schema";
import { SelectBestiaryMoves } from "@/types/bestiary";

export default async function seed(db: db) {
  const formattedData: SelectBestiaryMoves[] = data.map((move, index) => ({
    id: index + 1,
    bestiaryId: move.bestiaryId,
    moveId: move.moveId,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(bestiaryMoves).values(formattedData);
}
