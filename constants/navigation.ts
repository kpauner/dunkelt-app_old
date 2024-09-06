export type MenuItem = {
  href: string;
  label: string;
};

export const settingsMenuItems: MenuItem[] = [
  { href: "/settings", label: "General" },
  { href: "/settings/security", label: "Security" },
  { href: "/settings/safety", label: "Safety" },
  { href: "/settings/danger-zone", label: "Danger Zone" },
];
