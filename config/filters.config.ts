export type filterConfig = {
  column: string;
  title: string;
  options: { label: string; value: string }[];
};

export const filters: filterConfig[] = [
  {
    column: "type",
    title: "Type",
    options: [
      { label: "Beast", value: "beast" },
      { label: "Queen", value: "queen" },
      // ... add more options as needed
    ],
  },
  {
    column: "bystander",
    title: "bystander",
    options: [
      { label: "Bystander", value: "bystander" },
      { label: "Not Bystander", value: "not_bystander" },
      // ... add more options as needed
    ],
  },
  // ... add more filter configurations as needed
];
