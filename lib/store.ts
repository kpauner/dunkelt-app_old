import { create } from "zustand";
import { CharacterSheetType } from "@/types/characters";

type CharacterStore = {
  character: CharacterSheetType;
  setCharacter: (character: CharacterSheetType) => void;
  updateLuck: (luck: number) => void;
  updateHarm: (harm: number) => void;
  updateExperience: (experience: number) => void;
  // Add more actions as needed
};

const useCharacterStore = create<CharacterStore>((set) => ({
  character: {} as CharacterSheetType,
  setCharacter: (character) => set({ character }),
  updateLuck: (luck) =>
    set((state) => ({ character: { ...state.character, luck } })),
  updateHarm: (harm) =>
    set((state) => ({ character: { ...state.character, harm } })),
  updateExperience: (experience) =>
    set((state) => ({ character: { ...state.character, experience } })),
  // Implement other actions
}));

export default useCharacterStore;
