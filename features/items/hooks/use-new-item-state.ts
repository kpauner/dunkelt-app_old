import { create } from "zustand";

type NewItem = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewItem = create<NewItem>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
