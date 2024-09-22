import CategoryCard from "@/components/category-card";
import { AVATARS } from "@/constants/constants";
import React from "react";

export default async function CodexPage() {
  const categories = [
    {
      title: "Bestiary",
      description:
        "These are primarly concerned with fetching data and can not use hooks. Due to this, next-intl provides a set of awaitable versions of the functions that you usually call as hooks from within components.",
      image: AVATARS.BESTIARY,
    },
    {
      title: "Bystanders",
      description:
        "These are primarly concerned with fetching data and can not use hooks. Due to this, next-intl provides a set of awaitable versions of the functions that you usually call as hooks from within components.",
      image: AVATARS.BYSTANDERS,
    },
    {
      title: "Bestiary",
      description:
        "These are primarly concerned with fetching data and can not use hooks. Due to this, next-intl provides a set of awaitable versions of the functions that you usually call as hooks from within components.",
      image: AVATARS.BESTIARY,
    },
    {
      title: "Bestiary",
      description:
        "These are primarly concerned with fetching data and can not use hooks. Due to this, next-intl provides a set of awaitable versions of the functions that you usually call as hooks from within components.",
      image: AVATARS.BESTIARY,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          title={category.title}
          description={category.description}
          image={category.image}
        />
      ))}
    </div>
  );
}
