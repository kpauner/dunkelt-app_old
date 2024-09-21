import { create } from "zustand";

type EditMovesSheet = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useEditMovesSheet = create<EditMovesSheet>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
