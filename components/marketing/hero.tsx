import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Heading from "@/components/layout/heading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function Hero() {
  const t = useTranslations("home");
  return (
    <section className="grid w-full gap-6 grid-cols-3 grid-rows-2 min-h-[50vh]">
      <HeroCard
        title="Keeper quickstart"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        image="/images/hero-papers_0.png"
      />
      <Card className="col-span-1 row-span-1 relative  overflow-hidden">
        <CardHeader className="relative z-10">
          <Heading as="h6" size="sm" className=" text-accent-foreground ">
            Keeper quickstart
          </Heading>
          <CardDescription className=" dark:text-primary-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </CardDescription>
        </CardHeader>
        <Image
          src="/images/hero-papers_0.png"
          alt="keeper"
          width={200}
          height={200}
          className="w-full h-full absolute top-0 left-0 object-cover opacity-20"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
        />
      </Card>
      <Card className="col-span-1 row-span-1 relative overflow-hidden">
        <CardHeader className="relative z-10">
          <Heading as="h6" size="sm" className=" text-accent-foreground ">
            Keeper quickstart
          </Heading>
          <CardDescription className=" dark:text-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </CardDescription>
        </CardHeader>
        <Image
          src="/images/hero-papers_0.png"
          alt="keeper"
          width={200}
          height={200}
          className="w-full h-full absolute top-0 left-0 object-cover opacity-20"
        />
      </Card>
    </section>
  );
}

function HeroCard({
  title,
  description,
  image,
  className,
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "col-span-2 row-span-2 relative overflow-hidden flex flex-col group ",
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
        <div className="flex flex-col items-center justify-end pb-8">
          <Heading
            as="h6"
            size="md"
            className="text-accent-foreground uppercase tracking-wider pb-1"
          >
            {title}
          </Heading>
          <CardDescription className="">{description}</CardDescription>
        </div>
        <Button
          variant="secondary"
          size="lg"
          className="dark:bg-accent dark:text-accent-dark text-xl"
        >
          Read more
        </Button>
      </CardHeader>
    </Card>
  );
}
