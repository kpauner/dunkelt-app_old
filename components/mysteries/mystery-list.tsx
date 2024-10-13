"use client";

import React from "react";
import MysteryCard from "../mystery-card";
import { useGetMysteries } from "@/features/mysteries/queries/use-get-mysteries";

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
  const { data: mysteries, isLoading } = useGetMysteries();

  if (isLoading) return <div>Loading...</div>;
  if (!mysteries) return <div>No mysteries found</div>;

  return (
    <>
      {mysteries.map((mystery, index) => (
        <MysteryCard
          key={index}
          mystery={mystery}
          hunters={mystery.mysteryParticipants}
          keeper={keeper}
        />
      ))}
    </>
  );
}
