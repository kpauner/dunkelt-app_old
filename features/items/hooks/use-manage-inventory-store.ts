import { create } from "zustand";

type ManageInventory = {
  characterId: number | null;
  isOpen: boolean;
  onOpen: (characterId: number) => void;
  onClose: () => void;
};

export const useManageInventory = create<ManageInventory>((set) => ({
  characterId: null,
  isOpen: false,
  onOpen: (characterId: number) => set({ isOpen: true, characterId }),
  onClose: () => set({ isOpen: false, characterId: null }),
}));
