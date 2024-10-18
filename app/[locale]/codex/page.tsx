import CategoryCard from "@/components/category-card";
import Icons from "@/components/icons";
import { IMAGES } from "@/constants/constants";
import { Category } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

export default function CodexPage() {
  const t = useTranslations("codex");
  const categories: Category[] = t.raw("categories") as Category[];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const IconComponent =
          Icons[category.key as keyof typeof Icons] || Icons.help;

        return (
          <CategoryCard
            icon={IconComponent}
            href={category.href}
            key={category.key}
            title={category.label}
            description={category.description}
            image={IMAGES[category.image]}
            className="h-[500px]"
          />
        );
      })}
    </div>
  );
}
