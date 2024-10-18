"use client";

import { AVATARS, IMAGES } from "@/constants/constants";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { cn, truncateParagraphs, truncateText } from "@/lib/utils";
import AvatarDisplay from "@/components/avatar-display";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TagCloud from "@/components/tag-cloud";
import { formatDate } from "@/lib/utils/time";

type PostCardProps = {
  title: string;
  image: string;
  url: string;
  year: string;
  excerpt: string;
  author: {
    name: string;
    image: string;
  };
  updatedAt: string;
  categories: string[];
};

export default function PostCard({
  title,
  image,
  url,
  year,
  excerpt,
  author,
  updatedAt,
  categories,
}: PostCardProps) {
  // const locale = useLocale();
  return (
    <Card className="overflow-hidden max-w-xs">
      <Avatar
        src={image || IMAGES.POSTS}
        size="full"
        className="h-56 rounded-t-xl rounded-b-none"
      />

      <CardHeader className="relative">
        <Avatar
          src={author.image || IMAGES.BESTIARY}
          size="md"
          variant="rounded"
          className="absolute -top-7 right-4"
        />
        <span className="text-xs text-muted-foreground leading-none tracking-tight flex gap-2">
          <span className="font-bold uppercase">{formatDate(updatedAt)}</span>
        </span>
        <CardTitle className="hover:underline">
          <Link prefetch={false} href={url}>
            {title}
          </Link>
        </CardTitle>
        <CardDescription>{truncateText(excerpt, 100)}</CardDescription>
      </CardHeader>
      <CardFooter>
        <TagCloud data={categories} />
      </CardFooter>
    </Card>
  );
}
