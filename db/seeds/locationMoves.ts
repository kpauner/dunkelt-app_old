import { db } from "@/db";
import data from "@/db/seeds/data/locationMoves.json";
import { SelectCharacterMoves } from "@/types/moves";
import { locationMoves } from "../schema";
import { SelectLocationMoves } from "@/types/locations";

export default async function seed(db: db) {
  const formattedData: Omit<SelectLocationMoves, "id">[] = data.map(
    (locationMove, index) => ({
      id: index + 1,
      locationId: locationMove.locationId,
      moveId: locationMove.moveId,
    })
  );
  if (!formattedData) {
    return;
  }
  await db.insert(locationMoves).values(formattedData);
}
