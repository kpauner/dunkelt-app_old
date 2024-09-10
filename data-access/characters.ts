import { db } from "@/db";
import { characters, moves } from "@/db/schema";
import { auth } from "@/lib/auth";
import { CharacterSheetType } from "@/types/characters";
import { SelectMoves } from "@/types/moves";
import { eq } from "drizzle-orm";

export async function getCharacter(characterId: number) {
  const character = await db.query.characters.findFirst({
    where: eq(characters.id, characterId),
  });
  // const character = await db
  //   .select()
  //   .from(characters)
  //   .where(eq(characters.id, characterId));
  return character;
}

type CharacterSheetResult =
  | { success: true; data: CharacterSheetType }
  | { success: false; message: string };

export async function getCharacterSheet(
  characterId: number
): Promise<CharacterSheetResult> {
  const session = await auth();
  if (!characterId) {
    throw new Error("Character ID is required");
  }
  const characterSheet = await db.query.characters.findFirst({
    where: eq(characters.id, characterId),
    with: {
      characterMoves: {
        with: {
          move: true,
        },
        columns: {
          // Exclude all columns from characterMoves
        },
      },
    },
  });

  if (!characterSheet) {
    return {
      success: false,
      message: `Character with id ${characterId} not found`,
    };
  }

  if (characterSheet.userId !== session?.user?.id && !characterSheet.isPublic) {
    return {
      success: false,
      message: "Unauthorized access to private character sheet",
    };
  }

  return {
    success: true,
    data: {
      ...characterSheet,
      characterMoves:
        characterSheet.characterMoves?.map((move) => move.move) || [],
    },
  };
}
