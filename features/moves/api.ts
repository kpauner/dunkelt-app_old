import { client } from "@/lib/hono";

export async function GetMoves() {
  const response = await client.api.moves.$get();
  if (response.status !== 200) {
    throw new Error("Failed to fetch moves");
  }
  const { data } = await response.json();
  return data;
}

export async function GetMoveById(id: string) {
  const response = await client.api.moves[":id"].$get({
    param: { id },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch character");
  }
  const { data } = await response.json();
  return data;
}
