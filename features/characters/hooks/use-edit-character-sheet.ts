import { create } from "zustand";

type EditCharacterSheet = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useEditCharacterSheet = create<EditCharacterSheet>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
