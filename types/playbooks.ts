// Define types for our playbooks
type Playbooks = "The Chosen" | "The Crooked" | "The Spooky"; // Add other playbooks as needed

// Define a base type for all playbooks
type BasePlaybook = {
  name: Playbooks;
  customFields: Record<string, unknown>;
};

// Define specific types for each playbook
export type TheChosenPlaybook = BasePlaybook & {
  customFields: {
    howYouFoundOut: string;
    heroic: string[];
    doom: string[];
  };
};

type TheCrookedPlaybook = BasePlaybook & {
  name: "The Crooked";
  customFields: {
    underworld: string;
    heroic: string[];
    doom: string[];
  };
};
