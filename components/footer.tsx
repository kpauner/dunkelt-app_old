import Link from "next/link";
import React from "react";
import Icons from "./icons";
import { socialLinks } from "@/constants/navigation";

export default function Footer() {
  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/",
    },
    {
      name: "Privacy",
      href: "/",
    },
    {
      name: "Devlog",
      href: "/",
    },
  ];

  return (
    <footer className="flex flex-col gap-4 text-xs md:flex-row md:justify-between w-full">
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex gap-4">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={link.label}
            >
              <link.icon className="size-5 fill-muted-foreground hover:fill-primary transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
