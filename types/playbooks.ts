// Define types for our playbooks
export const PLAYBOOK_IDS = [
  "thechosen",
  "thecrooked",
  "thedivine",
  "theexpert",
  "thefallen",
  "theinitiate",
  "themonstrous",
  "themundane",
  "theprofessional",
  "thespellslinger",
  "thespooky",
  "thewronged",
] as const;

export type PlaybookName = (typeof PLAYBOOK_IDS)[number];

// Define a base type for all playbooks
type BasePlaybook = {
  name: PlaybookName;
  customFields: Record<string, unknown>;
};

// Define specific types for each playbook
export type TheChosenPlaybook = BasePlaybook & {
  name: "thechosen";
  customFields: {
    howYouFoundOut: string;
    heroic: string[];
    doom: string[];
  };
};

export type TheCrookedPlaybook = BasePlaybook & {
  name: "thecrooked";
  customFields: {
    underworld: string;
    heroic: string[];
    doom: string[];
  };
};
