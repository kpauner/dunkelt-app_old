import { db } from "@/db";
import data from "@/db/seeds/data/moves.json";
import { MoveResults, SelectMoves } from "@/types/moves";
import { moves } from "../schema";

export default async function seed(db: db) {
  const formattedData: SelectMoves[] = data.map((move, index) => ({
    id: move.id,
    name: move.name,
    description: move.description,
    playbook: move.playbook,
    harm: move.harm || 0,
    tags: move.tags || [],
    results: null,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(moves).values(formattedData);
}
