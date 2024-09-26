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
        { label: "Queen", value: "queen" },
        { label: "Breeder", value: "breeder" },
      ],
    },
    {
      column: "origins",
      title: "Origins",
      options: [
        { label: "Romania", value: "Romania" },
        { label: "Denmark", value: "Denmark" },
        { label: "Bulgaria", value: "Bulgaria" },
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
  locations: [
    {
      column: "type",
      title: "Type",
      options: [
        { label: "Fortress", value: "Fortress" },
        { label: "Hellgate", value: "Hellgate" },
        { label: "Cave", value: "Cave" },
      ],
    },
    {
      column: "origins",
      title: "Origins",
      options: [
        { label: "Romania", value: "Romania" },
        { label: "Denmark", value: "Denmark" },
        { label: "Bulgaria", value: "Bulgaria" },
      ],
    },
    // Add more filters as needed
  ],
};
