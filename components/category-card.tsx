import React from "react";
import { Card, CardDescription, CardHeader } from "./ui/card";
import Heading from "./layout/heading";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

type IconType = React.ElementType;

type CategoryCardProps = {
  icon?: IconType;
  title: string;
  description: string;
  image: string;
  href: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  href,
}: CategoryCardProps) => {
  return (
    <Link href={href}>
      <Card className="col-span-1 row-span-1 relative overflow-hidden min-h-[600px] flex flex-col group cursor-pointer py-10">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={200}
            height={600}
            className="w-full h-full object-cover opacity-20 transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="flex-grow" />
        <CardHeader className="space-y-4 relative z-10 flex flex-col items-center text-center h-2/3 ">
          <div className=" flex flex-col items-center justify-end">
            {Icon && <Icon className="size-8 mb-2" />}
            <Heading
              as="h6"
              size="sm"
              className="text-accent-foreground uppercase tracking-wider"
            >
              {title}
            </Heading>
          </div>
          <Separator className="w-1/2" />
          <CardDescription className="dark:text-stone-300 overflow-y-auto h-full">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
export default CategoryCard;
