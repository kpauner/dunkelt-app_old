import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Icons from "../icons";
import { Avatar } from "../ui/avatar";
import { AVATARS } from "@/constants/constants";
import { useLocale } from "next-intl";
import AvatarDisplay from "../avatar-display";
import MysteryCard from "../mystery-card";

const mysteries = [
  {
    name: "Mystery 1",
    image: "/images/locations.jpg",
    year: 1920,
    description:
      "We suspect a high ranking cult member, behind the disappearance of a local family has escaped to Denmark. We are looking for a hunter familiar with the country to assist in the search.",
  },
  {
    name: "Mystery 2",
    image: "/images/locations.jpg",
    year: 1999,
    description: "This is a mystery",
  },
  {
    name: "Mystery 2",
    image: "/images/locations.jpg",
    year: 1999,
    description: "This is a mystery",
  },
  {
    name: "Mystery 2",
    image: "/images/locations.jpg",
    year: 1999,
    description: "This is a mystery",
  },
];
const hunters = [
  {
    name: "Avatar 1",
    image: "/images/avatars/default_512.jpg",
  },
  {
    name: "Avatar 1",
    image: "/images/avatars/default_512.jpg",
  },
  {
    name: "Avatar 1",
    image: "/images/avatars/default_512.jpg",
  },
];

const keeper = {
  name: "Keeper",
  image: "/images/avatars/default_512.jpg",
};

export default function MysteriesList() {
  return (
    <>
      {mysteries.map((mystery, index) => (
        <MysteryCard
          key={index}
          mystery={mystery}
          hunters={hunters}
          keeper={keeper}
        />
      ))}
    </>
  );
}
