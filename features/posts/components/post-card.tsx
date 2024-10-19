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
import { Author } from "@/types/posts";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type PostCardProps = {
  title: string;
  image: string;
  url: string;
  year: string;
  excerpt: string;
  author: Author;
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
        className="h-56 rounded-t-xl rounded-b-none cursor-default"
      />

      <CardHeader className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar
              src={author.avatarUrl || IMAGES.BESTIARY}
              size="md"
              variant="rounded"
              className="absolute -top-7 right-4 cursor-default"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{author.username}</p>
          </TooltipContent>
        </Tooltip>

        <span className="text-xs text-muted-foreground leading-none tracking-tight flex gap-2">
          <span className="font-bold uppercase">{formatDate(updatedAt)}</span>
        </span>
        <CardTitle className="hover:underline">
          <Link prefetch={false} href={url}>
            {title}
          </Link>
        </CardTitle>
        <CardDescription>{truncateText(excerpt, 80)}</CardDescription>
      </CardHeader>
      <CardFooter>
        <TagCloud data={categories} />
      </CardFooter>
    </Card>
  );
}
