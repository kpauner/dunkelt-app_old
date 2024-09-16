import { create } from "zustand";
import { CharacterSheetType } from "@/types/characters";

type CharacterStore = {
  character: CharacterSheetType | null;
  hasUnsavedChanges: boolean;
  setCharacter: (character: CharacterSheetType | null) => void;
  updateCharacter: (updates: Partial<CharacterSheetType>) => void;
  setHasUnsavedChanges: (value: boolean) => void;
  saveChanges: () => Promise<void>;
};

const useCharacterStore = create<CharacterStore>((set, get) => ({
  character: null,
  hasUnsavedChanges: false,
  setCharacter: (character) => set({ character, hasUnsavedChanges: false }),
  updateCharacter: (updates) => {
    set((state) => ({
      character: state.character ? { ...state.character, ...updates } : null,
      hasUnsavedChanges: true,
    }));
  },
  setHasUnsavedChanges: (value) => set({ hasUnsavedChanges: value }),
  saveChanges: async () => {
    // Implement your save logic here
    // For example:
    // await api.saveCharacter(get().character);
    set({ hasUnsavedChanges: false });
  },
}));

export default useCharacterStore;
