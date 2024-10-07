import { db } from "@/db";
import data from "@/db/seeds/data/locations.json";
import { locations } from "@/db/schema";
import { SelectLocations } from "@/types/locations";

export default async function seed(db: db) {
  const formattedData: SelectLocations[] = data.map((location) => ({
    id: location.id,
    name: location.name,
    avatar: "",
    description: location.description,
    type: location.type || "unknown",
    origins: Array.isArray(location.origins)
      ? location.origins
      : [location.origins],
    history: location.history || "",
    homebrew: false,
    userId: "35e5d1bf-75a3-4b0f-aef1-f47d875d0b4e",
    isPublic: true,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(locations).values(formattedData);
}
