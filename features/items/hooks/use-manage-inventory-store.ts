import { create } from "zustand";

type ManageInventory = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useManageInventory = create<ManageInventory>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
