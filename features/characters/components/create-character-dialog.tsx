"use client";

import React from "react";
import { useCreateCharacter } from "@/features/characters/queries/use-create-character";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useAddCharacterDialog } from "@/features/characters/hooks/use-add-character-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CharacterForm, { CharacterFormValues } from "./character-form";

export default function CreateCharacterDialog() {
  const { isOpen, onOpen, onClose } = useAddCharacterDialog();
  const mutation = useCreateCharacter();

  function onSubmit(values: CharacterFormValues) {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Character</DialogTitle>
          <DialogDescription>
            Get started creating your character, if you are unsure about
            something you can always leave it blank and edit it later.
          </DialogDescription>
        </DialogHeader>
        <CharacterForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          id={undefined}
          defaultValues={{
            name: "",
            pronouns: "",
            look: "",
            playbook: "",
            userId: "",
            dateOfBirth: "",
            dateOfDeath: "",
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
