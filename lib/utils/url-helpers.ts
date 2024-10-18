import { env } from "../env";

// Helper function to construct image URL
export function getImageUrl(
  collectionId: string,
  recordId: string,
  fileName: string
): string {
  return `${env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}`;
}
