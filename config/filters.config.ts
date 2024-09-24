// Define the FilterOption type
type FilterOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

// Define the FilterConfig type
export type FilterConfig = {
  column: string;
  title: string;
  options: FilterOption[];
};

// Create a single filters configuration object
export const filtersConfig: { [key: string]: FilterConfig[] } = {
  bestiary: [
    {
      column: "type",
      title: "Type",
      options: [
        { label: "Queen", value: "Queen" },
        { label: "Breeder", value: "Breeder" },
      ],
    },
    // Add more filters as needed
  ],
  items: [
    {
      column: "type",
      title: "Type",
      options: [
        { label: "Weapon", value: "Weapon" },
        { label: "Consumable", value: "Consumable" },
      ],
    },
    // Add more filters as needed
  ],
};
