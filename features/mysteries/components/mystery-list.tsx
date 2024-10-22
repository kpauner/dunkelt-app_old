"use client";

import React from "react";

import { useGetMysteries } from "@/features/mysteries/queries/use-get-mysteries";
import MysteryCard from "@/features/mysteries/components/mystery-card";

const keeper = {
  name: "Keeper",
  image: "/images/avatars/default_512.jpg",
};

export default function MysteriesList() {
  const { data: mysteries, isLoading, error } = useGetMysteries();

  if (isLoading) return <div>Loading...</div>;
  if (!mysteries) return <div>No mysteries found</div>;
  if (error)
    return <div>Error: {error.message || "Failed to load mysteries"}</div>;

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
