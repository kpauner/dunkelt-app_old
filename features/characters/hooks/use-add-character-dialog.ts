import { create } from "zustand";

type AddCharacterDialog = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddCharacterDialog = create<AddCharacterDialog>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
