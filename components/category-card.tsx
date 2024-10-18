import React from "react";
import { Card, CardDescription, CardHeader } from "./ui/card";
import Heading from "./layout/heading";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconType = React.ElementType;

type CategoryCardProps = {
  icon?: IconType;
  title: string;
  description: string;
  image: string;
  href: string;
  className?: string;
};

// ... existing imports ...

// ... existing type definitions ...

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  href,
  className,
}: CategoryCardProps) => {
  return (
    <Link href={href}>
      <Card
        className={cn(
          "col-span-1 row-span-1 relative overflow-hidden flex flex-col group cursor-pointer",
          className
        )}
      >
        {/* Image container */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={200}
            height={600}
            className="w-full h-full object-cover opacity-20 transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Spacer to push content to the bottom */}
        <div className="flex-grow" />

        {/* Card content moved to the bottom */}
        <CardHeader className="relative z-10 flex flex-col items-center text-center p-6">
          <div className="flex flex-col items-center justify-end mb-4">
            {Icon && <Icon className="size-8 mb-2" />}
            <Heading
              as="h6"
              size="sm"
              className="text-accent-foreground uppercase tracking-wider"
            >
              {title}
            </Heading>
          </div>
          <Separator className="w-1/2 mb-4" />
          <CardDescription className="dark:text-stone-300">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CategoryCard;
