import { client } from "@/lib/hono";

export async function GetMysteries() {
  const response = await client.api.mysteries.$get();
  if (response.status !== 200) {
    throw new Error("Failed to fetch mysteries");
  }
  const { data } = await response.json();
  return data;
}

export async function GetMysteryByIdWithParticipants(id: string) {
  const response = await client.api.mysteries[":id"].$get({
    param: { id },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch mystery");
  }
  const { data } = await response.json();
  return data;
}
