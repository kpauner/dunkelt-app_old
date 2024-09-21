import { create } from "zustand";
import { CharacterResponseType } from "@/types/characters";

type CharacterStore = {
  character: CharacterResponseType | null;
  hasUnsavedChanges: boolean;
  setCharacter: (character: CharacterResponseType | null) => void;
  updateCharacter: (updates: Partial<CharacterResponseType>) => void;
  setHasUnsavedChanges: (value: boolean) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;
};

const useCharacterStore = create<CharacterStore>((set, get) => ({
  character: null,
  loading: false,
  hasUnsavedChanges: false,
  setCharacter: (character) => set({ character, hasUnsavedChanges: false }),
  updateCharacter: (updates) => {
    set((state) => ({
      character: state.character ? { ...state.character, ...updates } : null,
      hasUnsavedChanges: true,
    }));
  },
  setHasUnsavedChanges: (value) => set({ hasUnsavedChanges: value }),

  setLoading: (value) => set({ loading: value }),
}));

export default useCharacterStore;
