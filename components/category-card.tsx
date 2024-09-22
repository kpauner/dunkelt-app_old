import React from "react";
import { Card, CardDescription, CardHeader } from "./ui/card";
import Heading from "./layout/heading";
import Image from "next/image";
import { Separator } from "./ui/separator";

type CategoryCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function CategoryCard({
  title,
  description,
  image,
}: CategoryCardProps) {
  return (
    <Card className="col-span-1 row-span-1 relative overflow-hidden min-h-[600px] flex flex-col">
      <Image
        src={image}
        alt={title}
        width={200}
        height={600}
        className="w-full h-full absolute top-0 left-0 object-cover opacity-20"
      />
      <div className="flex-grow" />
      <CardHeader className="relative z-10 flex flex-col items-center text-center pb-8 h-2/3 ">
        <div className="flex items-end h-full">
          <Heading
            as="h6"
            size="sm"
            className="text-accent-foreground uppercase tracking-widest"
          >
            {title}
          </Heading>
        </div>
        <Separator className="w-1/2 mb-2" />
        <CardDescription className="dark:text-stone-300 overflow-y-auto h-full">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
