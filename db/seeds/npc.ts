import { db } from "@/db";
import data from "@/db/seeds/data/npcs.json";
// import { SelectNpc } from "@/types/npcs";
import { npcs } from "../schema";

export default async function seed(db: db) {
  const formattedData: any[] = data.map((npc, index) => ({
    id: npc.id,
    name: npc.name,
    avatar: npc.avatar,
    look: npc.look,
    type: npc.type,
    motivation: npc.motivation,
    description: npc.description,
    weakness: npc.weakness,
    armor: npc.armor,
    harmCapacity: npc.harmCapacity,
    history: npc.history,
    origins: npc.origins,
    homebrew: false,
    userId: "35e5d1bf-75a3-4b0f-aef1-f47d875d0b4e",
    isPublic: true,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(npcs).values(formattedData);
}
