import { create } from "zustand";

type EditInventorySheet = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useEditInventorySheet = create<EditInventorySheet>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
