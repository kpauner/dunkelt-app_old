"use client";

import React from "react";
import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, truncateParagraphs, truncateText } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Icons from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";
import { AVATARS } from "@/constants/constants";
import { useLocale } from "next-intl";
import AvatarDisplay from "@/components/avatar-display";
import { useGetMysteries } from "@/features/mysteries/queries/use-get-mysteries";

type MysteryCardProps = {
  mystery: any;
  hunters: any;
  keeper: any;
};

export default function MysteryCard({ mystery }: MysteryCardProps) {
  const locale = useLocale();

  return (
    <Card className="overflow-hidden max-w-xs">
      <Avatar
        src={mystery.avatar || AVATARS.DEFAULT}
        size="full"
        className="h-56 rounded-t-xl"
      />

      <CardHeader className="relative">
        <Avatar
          src={mystery.avatar || AVATARS.DEFAULT}
          size="md"
          variant="rounded"
          className="absolute -top-7 right-4"
        />
        <span className="text-sm text-muted-foreground leading-none tracking-tight flex gap-2">
          <span className="font-bold text-foreground">Year</span>
          <span className="font-bold uppercase">{mystery.year}</span>
        </span>
        <CardTitle className="hover:underline">
          <Link prefetch={false} href={`/${locale}/mysteries/${mystery.id}`}>
            {mystery.name}
          </Link>
        </CardTitle>
        <CardDescription>
          {truncateParagraphs(mystery.description, 20)
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between items-center">
        <AvatarDisplay variant="circle" avatars={mystery.mysteryParticipants} />
        <Link
          prefetch={false}
          href={`/${locale}/mysteries/${mystery.id}`}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <Icons.ellipsis />
        </Link>
      </CardFooter>
    </Card>
  );
}
