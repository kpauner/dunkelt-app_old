"use client";

import React, { useCallback, useEffect } from "react";

import { toast } from "sonner";
import { useTranslations } from "next-intl";

import CharacterInventory from "@/features/characters/components/character-inventory";
import { CharacterPlaybookBlocks } from "@/features/characters/components/character-playbook-blocks";
import Harm from "@/features/characters/components/harm";
import CharacterMoves from "@/features/characters/components/moves";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import Luck from "@/features/characters/components/luck";
import { useGetCharacterById } from "@/features/characters/queries";
import CharacterRatings from "@/features/characters/components/character-ratings";
import Experience from "@/features/characters/components/experience";
import CharacterAvatar from "./character-avatar";
import {
  CharacterSheetBlock,
  CharacterSheetColumn,
  CharacterSheetContent,
  CharacterSheetHeader,
  SheetBlock,
} from "@/components/ui/character-sheet";
import { useApplyCharacterChanges } from "@/features/characters/hooks/use-apply-character-changes";
import { SelectCharacterSheet } from "@/types/character-sheet";

type UserCharacterSheetProps = {
  characterId: string;
};
export default function UserCharacterSheet({
  characterId,
}: UserCharacterSheetProps) {
  const { character, setCharacter, hasUnsavedChanges, setHasUnsavedChanges } =
    useCharacterStore();

  const t = useTranslations();
  const {
    data: characterQuery,
    isLoading,
    error,
  } = useGetCharacterById(characterId);
  const mutation = useApplyCharacterChanges();

  useEffect(() => {
    if (characterQuery) {
      setCharacter(characterQuery);
    }
  }, [characterQuery, setCharacter]);

  const handleSave = useCallback(async () => {
    try {
      if (character) {
        await mutation.mutateAsync(character);
        setHasUnsavedChanges(false);
        toast.success(t("common.changes-saved"));
      } else {
        // Handle the case where character is null
        toast.error(t("common.error-saving-changes"));
      }
      toast.success(t("common.changes-saved"));
    } catch (error) {
      toast.error(t("common.save-failed"));
    }
  }, [mutation, t, character, setHasUnsavedChanges]);

  // Show toast for unsaved changes
  useEffect(() => {
    if (hasUnsavedChanges) {
      toast.info(t("common.unsaved-changes"), {
        duration: Infinity,
        id: "unsaved-changes",
        action: {
          label: t("common.save"),
          onClick: handleSave,
        },
      });
    } else {
      toast.dismiss("common.unsaved-changes");
    }
  }, [hasUnsavedChanges, handleSave, t]);

  if (isLoading || !character) {
    return (
      <div className="flex-1 flex items-center justify-center text-primary-foreground font-bold text-xl text-center">
        {t("common.loading")}
      </div>
    );
  }

  if (error) {
    return <div>{t("sheet.character-error")}</div>;
  }

  return (
    <>
      <CharacterSheetHeader className="flex flex-col sm:flex-row justify-between gap-4">
        <CharacterAvatar size="xl" variant="square" />
        <div className="grid grid-cols-6 gap-2 ">
          <CharacterRatings />
        </div>
      </CharacterSheetHeader>

      <CharacterSheetContent>
        <CharacterSheetColumn>
          <Luck />
          <Harm />
          <Experience />
        </CharacterSheetColumn>

        <CharacterSheetColumn>
          <CharacterPlaybookBlocks />
          <pre>{JSON.stringify(character, null, 2)}</pre>
        </CharacterSheetColumn>

        <CharacterSheetColumn>
          <CharacterMoves />
          <CharacterInventory />
        </CharacterSheetColumn>
      </CharacterSheetContent>
    </>
  );
}
