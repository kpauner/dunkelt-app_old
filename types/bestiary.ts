export type Powers = {
  name: string;
  description: string;
};

export type Attack = {
  name: string;
  harm: number;
  tags: string[];
};

export type BestiaryEntry = {
  name: string;
  type: string;
  description: string;
  motivation: string;
  powers: Powers[];
  weaknesses: string[];
  attacks: Attack[];
  armor: number;
  harmCapacity: number;
  history: string;
  habitat: string;
  signs: string[];
  customMoves: Powers[];
  countermeasures: string[];
};
