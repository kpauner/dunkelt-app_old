"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddCharacterDialog } from "../hooks/use-add-character-dialog";
import CharacterForm from "./character-form";
import { useCreateCharacter } from "../hooks/use-create-character";

export default function AddCharacterDialog() {
  const { isOpen, onOpen, onClose } = useAddCharacterDialog();
  const mutation = useCreateCharacter();

  function onSubmit() {
    mutation.mutate(
      { name: "New Character" },
      {
        onSuccess: () => onClose(),
      }
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Character</DialogTitle>
          <DialogDescription>
            Get started creating your character, if you are unsure about
            something you can always change it later.
          </DialogDescription>
        </DialogHeader>
        <CharacterForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            pronouns: "",
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
