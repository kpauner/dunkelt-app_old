import Icons, { IconProps } from "@/components/icons";

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

type SocialLink = {
  href: string;
  label: string;
  icon: React.ComponentType<IconProps>;
};

// Update socialLinks to include icons
export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/kpauner",
    label: "GitHub",
    icon: Icons.github,
  },
  {
    href: "https://www.youtube.com/@kpauner",
    label: "YouTube",
    icon: Icons.youtube,
  },
  {
    href: "https://www.linkedin.com/in/kpauner/",
    label: "LinkedIn",
    icon: Icons.linkedin,
  },
];
