import Link from "next/link";
import React from "react";
import Icons from "./icons";

export default function Footer() {
  const links = [
    {
      name: "Home",
      href: "/",
    },
  ];

  return (
    <footer className="flex flex-col gap-4 md:flex-row md:justify-between w-full">
      <div>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-muted-foreground uppercase tracking-wide"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-muted-foreground uppercase tracking-wide"
          >
            <Icons.linkedin className="size-4 fill-primary" />
          </Link>
        ))}
      </div>
    </footer>
  );
}
