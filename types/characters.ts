export type Ratings = "Cool" | "Tough" | "Charm" | "Sharp" | "Weird";

type PlaybookType =
  | "The Chosen"
  | "The Crooked"
  | "The Divine"
  | "The Expert"
  | "The Flake"
  | "The Initiate"
  | "The Monstrous"
  | "The Mundane"
  | "The Professional"
  | "The Spell-Slinger"
  | "The Wronged"
  | "Unknown";

export type Move = {
  name: string;
  description: string;
};

interface Improvement {
  description: string;
  applied: boolean;
}

export type MotWCharacter = {
  // Basic Info
  name: string;
  playbook: PlaybookType;
  look: string;

  // Ratings
  ratings: Record<Ratings, number>;

  // Derived Stats
  luck: number;
  harm: number;
  experience: number;

  // Moves
  moves: Move[];

  // Gear
  gear: string[];

  // History
  history: Record<string, number>;

  // Improvements
  improvements: Improvement[];

  // Playbook-specific fields
  playbookSpecial?: any; // This could be further defined based on each playbook's unique features

  // Optional fields that might be useful
  notes?: string;
  backstory?: string;
};
