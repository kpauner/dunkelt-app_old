import { create } from "zustand";
import { GetCharacterSheetResponseType } from "@/types/character-sheet";

type CharacterStore = {
  character: GetCharacterSheetResponseType | null;
  hasUnsavedChanges: boolean;
  setCharacter: (character: GetCharacterSheetResponseType | null) => void;
  updateCharacter: (updates: Partial<GetCharacterSheetResponseType>) => void;
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
