import { client } from "@/lib/hono";

export async function GetLocations() {
  const response = await client.api.locations.$get();
  if (response.status !== 200) {
    throw new Error("Failed to fetch locations");
  }
  const { data } = await response.json();
  return data;
}

export async function GetLocationById(id: string) {
  const response = await client.api.locations[":id"].$get({
    param: { id },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch location");
  }
  const { data } = await response.json();
  return data;
}
