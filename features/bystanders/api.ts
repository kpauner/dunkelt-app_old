import { client } from "@/lib/hono";

export async function GetBystanders() {
  const response = await client.api.bystanders.$get();
  if (response.status !== 200) {
    throw new Error("Failed to fetch bystanders");
  }
  const { data } = await response.json();
  return data;
}

export async function GetBystanderById(id: string) {
  const response = await client.api.bystanders[":id"].$get({
    param: { id },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch bystander");
  }
  const { data } = await response.json();
  return data;
}
